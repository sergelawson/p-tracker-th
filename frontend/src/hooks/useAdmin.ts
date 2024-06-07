import { useEffect, useState } from "react";
import { DeliveryType, PackageType } from "../helpers/types";
import useApiRequest from "./useApiRequest";

const useAdmin = () => {
  const [getPackages, { error: errPackages, loading: loadingPackages }] =
    useApiRequest<PackageType[]>();

  const [getDelivery, { error: errDelivery, loading: loadingDelivery }] =
    useApiRequest<DeliveryType[]>();

  const [packageList, setPackegeList] = useState<PackageType[]>();
  const [deliveryList, setDeliveryList] = useState<DeliveryType[]>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const packageRequest = getPackages({
      method: "get",
      url: `/package`,
    });

    const deliveryRequest = getDelivery({
      method: "get",
      url: `/delivery`,
    });

    const [packageData, deliveryData] = await Promise.all([
      packageRequest,
      deliveryRequest,
    ]);

    if (packageData && !!packageData?.length) {
      setPackegeList(packageData);
    }

    if (deliveryData && !!deliveryData?.length) {
      setDeliveryList(deliveryData);
    }
  };

  return {
    deliveryList,
    packageList,
    loadingDelivery,
    loadingPackages,
    errPackages,
    errDelivery,
  };
};

export default useAdmin;
