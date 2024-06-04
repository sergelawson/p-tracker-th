import {
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import Layout from "../layout";
import { MapContainer, TileLayer } from "react-leaflet";
//@ts-ignore
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { FaTruckFast } from "react-icons/fa6";

import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { IoStorefrontSharp, IoHome } from "react-icons/io5";
import withRole from "../components/WithRole";
import useApiRequest from "../hooks/useApiRequest";
import { DeliveryType, PackageType } from "../helpers/types";

function Tracker() {
  const [getPackage, { data: packageData, error, loading }] =
    useApiRequest<PackageType>();
  const [
    getDelivery,
    { data: deliveryData, error: errDelivery, loading: loadingDelivery },
  ] = useApiRequest<DeliveryType>();

  const [packageId, setPackageId] = useState<string>("");

  const [destination, setDestination] = useState<LatLngExpression>();

  const [source, setSource] = useState<LatLngExpression>();

  const [driver, setDriver] = useState<LatLngExpression>();

  const handleGetPackage = async () => {
    const pObj = await getPackage({
      method: "get",
      url: `/package/${packageId}`,
    });
    if (pObj?.to_location) {
      setDestination([pObj?.to_location?.lng, pObj?.to_location?.lat]);
    }
    if (pObj?.from_location) {
      setSource([pObj?.from_location?.lng, pObj?.from_location?.lat]);
      setDriver([pObj?.from_location?.lng, pObj?.from_location?.lat]);
    }
    if (pObj?.active_delivery_id) {
      const delData = await getDelivery({
        method: "get",
        url: `/delivery/${pObj.active_delivery_id}`,
      });
      if (delData?.location) {
        setDriver([delData?.location?.lng, delData?.location?.lat]);
        //  setDriver([pObj?.from_location?.lng, pObj?.from_location?.lat]);
      }
    }
  };

  return (
    <Layout>
      <HStack spacing={2} maxW={500}>
        <Input
          bgColor={"white"}
          placeholder="Package Id"
          onChange={(e) => setPackageId(e.target.value)}
        />
        <Button
          isLoading={loading}
          colorScheme="blue"
          onClick={handleGetPackage}
        >
          Submit
        </Button>
      </HStack>
      <HStack mt={10} alignItems={"flex-start"}>
        <Stack>
          <Heading as="h3" size="lg">
            Package Details
          </Heading>

          <Text fontSize="md">
            <strong>Package Id:</strong> {packageData?.package_id}
          </Text>
          <Text fontSize="md">
            <strong> Active delivery Id:</strong>{" "}
            {packageData?.active_delivery_id}
          </Text>
          <Text fontSize="md">
            <strong>Description: </strong>
            {packageData?.description}
          </Text>
          <Text fontSize="md">
            <strong>Width:</strong> {packageData?.weight}
          </Text>
          <Text fontSize="md">
            <strong>Height:</strong> {packageData?.height}
          </Text>
          <Text fontSize="md">
            <strong>Depth: </strong>
            {packageData?.depth}
          </Text>
          <Text fontSize="md">
            <strong>From Name:</strong> {packageData?.from_name}
          </Text>
          <Text fontSize="md">
            <strong>From address:</strong> {packageData?.from_address}
          </Text>
          <Text fontSize="md">
            <strong>To Name:</strong> {packageData?.to_name}
          </Text>
          <Text fontSize="md">
            <strong>To address:</strong> {packageData?.to_address}
          </Text>

          <Heading as="h3" size="lg">
            Delivery Details
          </Heading>

          <Text fontSize="md">
            <strong> Delivery Id:</strong> {deliveryData?.delivery_id}
          </Text>
          <Text fontSize="md">
            <strong>Package Id: </strong>
            {deliveryData?.package_id}
          </Text>
          <Text fontSize="md">
            <strong>Status: </strong>
            {deliveryData?.status}
          </Text>
          <Text fontSize="md">
            <strong>Pickup Time:</strong>{" "}
            {deliveryData?.pickup_time
              ? new Date(deliveryData?.pickup_time).toLocaleDateString()
              : null}
          </Text>
          <Text fontSize="md">
            <strong>Start Time:</strong>{" "}
            {deliveryData?.start_time
              ? new Date(deliveryData?.start_time).toLocaleDateString()
              : null}
          </Text>
          <Text fontSize="md">
            <strong>End Time:</strong>{" "}
            {deliveryData?.end_time
              ? new Date(deliveryData?.end_time).toLocaleDateString()
              : null}
          </Text>
        </Stack>
        <Box w={500} height={400} mx={4}>
          {destination ? (
            <MapContainer
              style={{ width: 500, height: 400 }}
              center={destination}
              zoom={10}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {destination ? (
                <MarkerLayer>
                  <Marker position={destination}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <IoHome size={25} />

                      <Text>Destination</Text>
                    </Box>
                  </Marker>
                </MarkerLayer>
              ) : null}
              {driver ? (
                <MarkerLayer>
                  <Marker position={driver}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <FaTruckFast color="red" size={20} />
                    </Box>
                  </Marker>
                </MarkerLayer>
              ) : null}

              {source ? (
                <MarkerLayer>
                  <Marker position={source}>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                    >
                      <IoStorefrontSharp size={25} />
                      <Text>Source</Text>
                    </Box>
                  </Marker>
                </MarkerLayer>
              ) : null}
            </MapContainer>
          ) : null}
        </Box>
      </HStack>
    </Layout>
  );
}

export default withRole(Tracker, "tracker");
