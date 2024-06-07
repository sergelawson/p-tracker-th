import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { PackageType } from "../helpers/types";

type PackageTableProps = {
  data: Array<PackageType>;
};

export const PackageTable: React.FC<PackageTableProps> = ({ data }) => {
  return (
    <Box boxShadow="base" p="6" rounded="md" bg="white">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>FROM NAME</Th>
              <Th>FROM ADDRESS</Th>
              <Th>TO NAME</Th>
              <Th>TO ADDRESS</Th>
              <Th>DIMENSIONS</Th>
              <Th>WEIGHT</Th>
              <Th>PACKAGE ID</Th>
              <Th>ACTIVE DELIVERY ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((delivery) => (
              <Tr key={delivery._id}>
                <Td>{delivery.from_name}</Td>
                <Td>{delivery.from_address}</Td>
                <Td>{delivery.to_name || "-"}</Td>
                <Td>{delivery.to_address || "-"}</Td>
                <Td>
                  {delivery.height}x{delivery.depth}
                </Td>
                <Td>{delivery.weight}</Td>
                <Td flexWrap={"wrap"}>{delivery._id}</Td>
                <Td>{delivery.active_delivery_id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
