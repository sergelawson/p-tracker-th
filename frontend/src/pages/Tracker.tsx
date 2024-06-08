import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import Layout from "../layout";
import { MapContainer, TileLayer } from "react-leaflet";
//@ts-ignore
import { MarkerLayer, Marker } from "react-leaflet-marker";
import { FaTruckFast } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { IoStorefrontSharp, IoHome } from "react-icons/io5";
import withRole from "../components/WithRole";
import useApiRequest from "../hooks/useApiRequest";
import { DeliveryType } from "../helpers/types";
import useTracker from "../hooks/useTracker";
import MapPlace from "../components/MapPlace";
import Package from "../components/Package";
import Delivery from "../components/Delivery";

function Tracker() {
  useApiRequest<DeliveryType>();

  const [packageId, setPackageId] = useState<string>("");

  const {
    loading,
    handleGetPackage,
    packageData,
    deliveryData,
    destination,
    source,
    driver,
  } = useTracker();

  return (
    <Layout>
      <HStack spacing={2} maxW={500}>
        <Input
          bgColor={"white"}
          placeholder="Enter Package Id"
          onChange={(e) => setPackageId(e.target.value)}
        />
        <Button
          isLoading={loading}
          colorScheme="blue"
          onClick={() => handleGetPackage(packageId)}
        >
          Track
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
      </HStack>
    </Layout>
  );
}

export default withRole(Tracker, "tracker");
