import { useEffect, useState } from "react";
import { DeliveryType, PackageType } from "../helpers/types";
import useApiRequest from "./useApiRequest";
import { PackageInputType } from "../schema/PackageSchema";
import { DelivertInputType } from "../schema/DeliverySchema";

const useAdmin = () => {
  const [getPackages, { error: errPackages, loading: loadingPackages }] =
    useApiRequest<PackageType[]>();

  const [getDelivery, { error: errDelivery, loading: loadingDelivery }] =
    useApiRequest<DeliveryType[]>();

  const [
    packageRequest,
    { error: errPackageRequest, loading: loadingPackageRequest },
  ] = useApiRequest<PackageType>();

  const [
    deliveryRequest,
    { error: errDeliveryRequest, loading: loadingDeliveryRequest },
  ] = useApiRequest<DeliveryType>();

  const [packageList, setPackegeList] = useState<PackageType[]>([]);
  const [deliveryList, setDeliveryList] = useState<DeliveryType[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const createPackage = async (input: PackageInputType) => {
    const newPackage = await packageRequest({
      method: "post",
      url: "/package",
      data: input,
    });

    if (newPackage) {
      setPackegeList((state) => [newPackage, ...state]);
    }
  };

  const createDelivery = async (input: DelivertInputType) => {
    const newDelivery = await deliveryRequest({
      method: "post",
      url: "/delivery",
      data: input,
    });

    if (newDelivery) {
      setDeliveryList((state) => [newDelivery, ...state]);
    }
  };

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
    createPackage,
    createDelivery,
    deliveryList,
    packageList,
    loadingDeliveryRequest,
    loadingDelivery,
    loadingPackages,
    loadingPackageRequest,
    errPackages,
    errDelivery,
    errPackageRequest,
    errDeliveryRequest,
  };
};

export default useAdmin;
