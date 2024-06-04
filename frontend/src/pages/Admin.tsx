import { Button, Heading, HStack, Stack } from "@chakra-ui/react";
import Layout from "../layout";
import withRole from "../components/WithRole";

function Admin() {
  return (
    <Layout>
      <Stack>
        {/** Package Section  */}

        <HStack justifyContent={"space-between"}>
          <Heading variant={"xl"}>Package List</Heading>
          <Button colorScheme="green">Create Package</Button>
        </HStack>

        {/** Delivery Section  */}

        <HStack justifyContent={"space-between"}>
          <Heading variant={"xl"}>Deliver List</Heading>
          <Button colorScheme="green">Create Delivery</Button>
        </HStack>
      </Stack>
    </Layout>
  );
}

export default withRole(Admin, "admin");
