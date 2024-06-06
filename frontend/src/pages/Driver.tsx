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
import { IoStorefrontSharp, IoHome } from "react-icons/io5";
import withRole from "../components/WithRole";
import { useState } from "react";
import useDriver from "../hooks/useDriver";
import MapPlace from "../components/MapPlace";
import { DeliveryType } from "../helpers/types";

{
  /* <Button colorScheme="cyan">Pick up</Button>
<Button colorScheme="orange">Transit</Button>
<Button colorScheme="green">Delivered</Button>
<Button colorScheme="red">Failed</Button> */
}

type ButtonType = {
  text: string;
  status: DeliveryType["status"];
  color: string;
};

const button_list: Array<ButtonType> = [
  {
    text: "Pick up",
    status: "picked-up",
    color: "cyan",
  },
  {
    text: "Transit",
    status: "in-transit",
    color: "orange",
  },
  {
    text: "Delivered",
    status: "delivered",
    color: "green",
  },
  {
    text: "Failed",
    status: "failed",
    color: "red",
  },
];

function Driver() {
  const {
    getDriverAndPackage,
    loadingDelivery,
    deliveryData,
    packageData,
    destination,
    driver,
    source,
    status,
    updateStatus,
    errDelivery,
    errPackage,
  } = useDriver();

  const [driverId, setDeliveryId] = useState<string>("");
  return (
    <Layout>
      <HStack spacing={2} maxW={500}>
        <Input
          bgColor={"white"}
          placeholder="Enter Driver Id"
          onChange={(e) => setDeliveryId(e.target.value)}
        />
        <Button
          isLoading={loadingDelivery}
          colorScheme="blue"
          onClick={() => getDriverAndPackage(driverId)}
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
              center={source}
              zoom={20}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {destination ? (
                <MarkerLayer>
                  <Marker position={destination}>
                    <MapPlace>
                      <IoHome color={"#3182CE"} size={15} />
                      <Text color={"#3182CE"} fontSize={6}>
                        Destination
                      </Text>
                    </MapPlace>
                  </Marker>
                </MarkerLayer>
              ) : null}

              {source ? (
                <MarkerLayer>
                  <Marker position={source}>
                    <MapPlace>
                      <IoStorefrontSharp color={"#3182CE"} size={15} />
                      <Text color={"#3182CE"} fontSize={6}>
                        Source
                      </Text>
                    </MapPlace>
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
                      position={"absolute"}
                    >
                      <FaTruckFast color="red" size={20} />
                    </Box>
                  </Marker>
                </MarkerLayer>
              ) : null}
            </MapContainer>
          ) : null}
        </Box>
        <Stack>
          {button_list.map((button) => (
            <Button
              key={button.status}
              isDisabled={button.status === status}
              colorScheme={button.color}
              onClick={() => updateStatus(button.status)}
            >
              {button.text}
            </Button>
          ))}
        </Stack>
      </HStack>
    </Layout>
  );
}

export default withRole(Driver, "driver");
