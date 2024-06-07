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
import { PackageType } from "../helpers/types";

const Package: React.FC<PackageType> = ({
  active_delivery_id,
  package_id,
  weight,
  height,
  depth,
  from_name,
  to_name,
  from_address,
  to_address,
}) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Package</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              From Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {from_name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              From Address
            </Heading>
            <Text pt="2" fontSize="sm">
              {from_address}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              To Name
            </Heading>
            <Text pt="2" fontSize="sm">
              {to_name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              To Address
            </Heading>
            <Text pt="2" fontSize="sm">
              {to_address}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Dimensions
            </Heading>
            <Text pt="2" fontSize="sm">
              {height}x{depth}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Weight
            </Heading>
            <Text pt="2" fontSize="sm">
              {weight}
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
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Active delivery ID
            </Heading>
            <Text pt="2" fontSize="sm">
              {active_delivery_id}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Package;
