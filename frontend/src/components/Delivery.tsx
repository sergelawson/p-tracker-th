import {
  Card,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  CardBody,
  Box,
  Text,
} from "@chakra-ui/react";
import { DeliveryType } from "../helpers/types";

const timeConfig: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
};

const Delivery: React.FC<DeliveryType> = ({
  delivery_id,
  package_id,
  status,
  pickup_time,
  start_time,
  end_time,
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Delivery</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Status
            </Heading>
            <Text pt="2" fontSize="sm">
              {status}
            </Text>
          </Box>
          {pickup_time ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Pickup Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {new Date(pickup_time).toLocaleString("en-US", timeConfig)}
              </Text>
            </Box>
          ) : null}

          {start_time ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Start Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {new Date(start_time).toLocaleString("en-US", timeConfig)}
              </Text>
            </Box>
          ) : null}

          {end_time ? (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                End Time
              </Heading>
              <Text pt="2" fontSize="sm">
                {new Date(end_time).toLocaleString("en-US", timeConfig)}
              </Text>
            </Box>
          ) : null}
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Delivery ID
            </Heading>
            <Text pt="2" fontSize="sm">
              {delivery_id}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Package ID
            </Heading>
            <Text pt="2" fontSize="sm">
              {package_id}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Delivery;
