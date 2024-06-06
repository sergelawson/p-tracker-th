import { Box } from "@chakra-ui/react";
import React from "react";

type MapPlaceProps = {
  children: React.ReactNode;
};
const MapPlace: React.FC<MapPlaceProps> = ({ children }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      position={"absolute"}
      backgroundColor={"rgba(255, 255, 255, .8)"}
      borderRadius={"50%"}
      boxShadow="base"
      p={1}
      width={10}
      height={10}
      justifyContent={"center"}
    >
      {children}
    </Box>
  );
};

export default MapPlace;
