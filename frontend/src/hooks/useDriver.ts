import { useEffect, useRef, useState } from "react";
import { LatLngExpression } from "leaflet";
import useApiRequest from "./useApiRequest";
import { DeliveryType, PackageType } from "../helpers/types";

const useDriver = () => {
  const [
    getPackage,
    { data: packageData, error: errPackage, loading: loadingPackage },
  ] = useApiRequest<PackageType>();
  const [
    getDelivery,
    { data: deliveryData, error: errDelivery, loading: loadingDelivery },
  ] = useApiRequest<DeliveryType>();

  const [destination, setDestination] = useState<LatLngExpression>();

  const [source, setSource] = useState<LatLngExpression>();

  const [driver, setDriver] = useState<LatLngExpression>();

  const [status, setStatus] = useState<DeliveryType["status"]>();

  const ws = useRef<WebSocket | null>(null);
  const deliveryRef = useRef<string>();

  useEffect(() => {
    deliveryRef.current = deliveryData?._id;
  }, [deliveryData]);

  useEffect(() => {
    const locationUpdate = setInterval(() => {
      getLocation();
    }, 20000);

    ws.current = new WebSocket("ws://localhost:2002");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
      clearInterval(locationUpdate);
    };
  }, []);

  function getLocation() {
    if (!deliveryRef.current) {
      return;
    }

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          const inputMessage = {
            type: "UPDATE_DELIVERY",
            deliveryId: deliveryRef.current,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          };
          ws.current.send(JSON.stringify(inputMessage));
          setDriver([position.coords.latitude, position.coords.longitude]);
        }
      },
      (error) => {
        console.error("Unable to retrieve your location");
      }
    );
  }

  function updateStatus(status: DeliveryType["status"]) {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const inputMessage = {
        type: "UPDATE_DELIVERY",
        deliveryId: deliveryRef.current,
        status: status,
      };
      ws.current.send(JSON.stringify(inputMessage));
      setStatus(status);
    }
  }

  const getDriverAndPackage = async (deliveryId: string) => {
    const delivery = await getDelivery({
      method: "get",
      url: `/delivery/${deliveryId}`,
    });

    if (delivery?.package_id) {
      const packageData = await getPackage({
        method: "get",
        url: `/package/${delivery.package_id}`,
      });

      setStatus(delivery.status);

      if (packageData) {
        setDestination([
          packageData?.to_location?.lat,
          packageData?.to_location?.lng,
        ]);

        setSource([
          packageData?.from_location?.lat,
          packageData?.from_location?.lng,
        ]);
        setDriver([
          packageData?.from_location?.lat,
          packageData?.from_location?.lng,
        ]);
      }
    }
  };

  return {
    packageData,
    errPackage,
    loadingPackage,
    deliveryData,
    errDelivery,
    loadingDelivery,
    destination,
    source,
    driver,
    status,
    updateStatus,
    getDriverAndPackage,
  };
};

export default useDriver;
