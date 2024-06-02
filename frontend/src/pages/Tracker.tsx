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

function Tracker() {
  const [destination, setDestination] = useState<LatLngExpression | null>([
    12.505, 1.2,
  ]);

  const [source, setSource] = useState<LatLngExpression | null>([12.505, 1.6]);
  return (
    <Layout>
      <HStack spacing={2} maxW={500}>
        <Input bgColor={"white"} placeholder="Package Id" />
        <Button colorScheme="blue">Submit</Button>
      </HStack>
      <HStack mt={10} alignItems={"flex-start"}>
        <Stack>
          <Heading as="h3" size="lg">
            Package Details
          </Heading>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Heading as="h3" size="lg">
            Delivery Details
          </Heading>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
          <Text fontSize="md">(md) In love with React & Next</Text>
        </Stack>
        <Box w={500} height={400} mx={4}>
          <MapContainer
            style={{ width: 500, height: 400 }}
            center={[12.505, 1.2]}
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

            <MarkerLayer>
              <Marker position={[12.505, 1.4]}>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                >
                  <FaTruckFast color="red" size={20} />
                </Box>
              </Marker>
            </MarkerLayer>

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
        </Box>
      </HStack>
    </Layout>
  );
}

export default Tracker;
