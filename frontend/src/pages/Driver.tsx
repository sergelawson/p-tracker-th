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
import { IoStorefrontSharp, IoHome } from "react-icons/io5";
import withRole from "../components/WithRole";
import { useState } from "react";
import useDriver from "../hooks/useDriver";
import MapPlace from "../components/MapPlace";
import { DeliveryType } from "../helpers/types";
import "leaflet/dist/leaflet.css";
import Package from "../components/Package";
import Delivery from "../components/Delivery";

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
          placeholder="Enter delivery Id"
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
        <HStack alignItems={"flex-start"}>
          {packageData ? <Package {...packageData} /> : null}

          {deliveryData ? <Delivery {...deliveryData} /> : null}
        </HStack>
        <Box w={500} height={400} mx={4}>
          {destination ? (
            <MapContainer
              style={{ width: 500, height: 400 }}
              center={source}
              zoom={20}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution="MapTiler OpenStreetMap"
                url="https://api.maptiler.com/maps/dataviz/{z}/{x}/{y}@2x.png?key=BN98JVotQDsrGzPyNRtm"
              />
              {destination ? (
                <MarkerLayer>
                  <Marker position={destination}>
                    <MapPlace>
                      <IoHome color={"#2ec4b6"} size={15} />
                      <Text fontWeight="bold" color={"#2ec4b6"} fontSize={6}>
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
                      <IoStorefrontSharp color={"#2ec4b6"} size={15} />
                      <Text fontWeight="bold" color={"#2ec4b6"} fontSize={6}>
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
                      <FaTruckFast color="#f07167" size={20} />
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
