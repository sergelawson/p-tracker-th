import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import useApiRequest from "./useApiRequest";
import { DeliveryType, PackageType } from "../helpers/types";

const useTracker = () => {
  const [getPackage, { data: packageData, error, loading }] =
    useApiRequest<PackageType>();

  const [destination, setDestination] = useState<LatLngExpression>();

  const [source, setSource] = useState<LatLngExpression>();

  const [driver, setDriver] = useState<LatLngExpression>();

  const [deliveryData, setDeliveryData] = useState<DeliveryType>();

  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:2002");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "DELIVERY_DATA") {
        setDeliveryData((state) => {
          if (!state) {
            return message.data;
          }
          return { ...state, ...message.data };
        });
        const location = message?.data?.location as DeliveryType["location"];
        if (location) {
          setDriver([location.lat, location.lng]);
        }
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleGetPackage = async (packageId: string) => {
    const pObj = await getPackage({
      method: "get",
      url: `/package/${packageId}`,
    });
    if (pObj?.to_location) {
      setDestination([pObj?.to_location?.lat, pObj?.to_location?.lng]);
    }
    if (pObj?.from_location) {
      setSource([pObj?.from_location?.lat, pObj?.from_location?.lng]);
      setDriver([pObj?.from_location?.lat, pObj?.from_location?.lng]);
    }
    if (pObj?.active_delivery_id) {
      getDelivery(pObj.active_delivery_id);
    }
  };

  function getDelivery(deliveryId: string) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const inputMessage = {
        type: "FETCH_DELIVERY",
        deliveryId: deliveryId,
      };
      ws.current.send(JSON.stringify(inputMessage));
    }
  }

  return {
    packageData,
    deliveryData,

    loading,
    error,
    handleGetPackage,
    destination,
    source,
    driver,
  };
};

export default useTracker;
