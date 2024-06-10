import WebSocket from "ws";
import http from "http";
import { getDelivery, updateDelivery } from "../service/delivery.service";
import DeliveryModel from "../models/delivery.model";
import log from "../utils/logger";
import { updateDeliveryWSSchema } from "../schema/delivery.schema";
import { pick } from "lodash";

interface CustomWebSocket extends WebSocket {
  isAlive: boolean;
}

export const WebSocketServer = (server: http.Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws: WebSocket) => {
    const socket = ws as CustomWebSocket;
    socket.isAlive = true;

    socket.on("pong", () => {
      socket.isAlive = true;
    });

    log.info("New client connected");

    socket.on("message", async (message: string) => {
      try {
        const parsedMessage = JSON.parse(message);
        switch (parsedMessage.type) {
          case "FETCH_DELIVERY":
            if (!parsedMessage.deliveryId) {
              throw new Error("Require delivery Id");
            }

            const delivery = await getDelivery(parsedMessage.deliveryId);

            if (delivery) {
              socket.send(
                JSON.stringify({
                  type: `DELIVERY_DATA_${parsedMessage.deliveryId}`,
                  data: delivery,
                })
              );
            } else {
              socket.send(
                JSON.stringify({ type: "error", message: "Delivery not found" })
              );
            }

            break;

          case "UPDATE_DELIVERY":
            updateDeliveryWSSchema.parse(parsedMessage);

            const id = parsedMessage.deliveryId;

            const deliveryExist = await getDelivery(id);

            if (!deliveryExist) {
              throw new Error("Delivery not found");
            }

            const delivery_update = await updateDelivery(
              { _id: id },
              pick(parsedMessage, ["location", "status"]),
              {
                new: true,
              }
            );

            socket.send(
              JSON.stringify({
                type: `DELIVERY_DATA_${parsedMessage.deliveryId}`,
                data: delivery_update,
              })
            );

            break;
          default:
            socket.send(
              JSON.stringify({ type: "error", message: "Unknown message type" })
            );
            break;
        }
      } catch (error: any) {
        socket.send(JSON.stringify({ type: "error", message: error.message }));
      }
    });

    DeliveryModel.watch().on("change", (data) => {
      if (data?.operationType === "update") {
        socket.send(
          JSON.stringify({
            type: `DELIVERY_DATA_${data?.documentKey?._id}`,
            data: data?.updateDescription?.updatedFields,
          })
        );
      }
    });

    socket.on("close", () => {
      log.info("Client disconnected");
    });

    socket.on("error", (error: Error) => {
      log.error("WebSocket error:", error);
    });
  });

  // Ping clients periodically to check if they're still alive
  setInterval(() => {
    wss.clients.forEach((ws: WebSocket) => {
      const socket = ws as CustomWebSocket;
      if (!socket.isAlive) {
        return socket.terminate();
      }
      socket.isAlive = false;
      socket.ping();
    });
  }, 30000);

  log.info("WebSocket server is running");
};
