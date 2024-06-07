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
import { DeliveryType } from "../helpers/types";

type DeliveryTableProps = {
  data: Array<DeliveryType>;
};
const timeConfig: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

export const DeliveryTable: React.FC<DeliveryTableProps> = ({ data }) => {
  return (
    <Box boxShadow="base" p="6" rounded="md" bg="white">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>STATUS</Th>
              <Th>PICKUP TIME</Th>
              <Th>START TIME</Th>
              <Th>END TIME</Th>
              <Th>DELIVERY ID</Th>
              <Th>PACKAGE ID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((delivery) => (
              <Tr key={delivery._id}>
                <Td>{delivery.status}</Td>
                <Td>
                  {delivery.pickup_time
                    ? new Date(delivery.pickup_time).toLocaleString(
                        "en-US",
                        timeConfig
                      )
                    : "-"}
                </Td>
                <Td>
                  {delivery.start_time
                    ? new Date(delivery.start_time).toLocaleString(
                        "en-US",
                        timeConfig
                      )
                    : "-"}
                </Td>
                <Td>
                  {delivery.end_time
                    ? new Date(delivery.end_time).toLocaleString(
                        "en-US",
                        timeConfig
                      )
                    : "-"}
                </Td>
                <Td>{delivery._id}</Td>
                <Td>{delivery.package_id}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
