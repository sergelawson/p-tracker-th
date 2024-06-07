import { Button, Heading, HStack, Stack } from "@chakra-ui/react";
import Layout from "../layout";
import withRole from "../components/WithRole";
import useAdmin from "../hooks/useAdmin";
import { PackageTable } from "../components/PackageTable";
import { DeliveryTable } from "../components/DeliveryTable";
import { Spinner } from "@chakra-ui/react";

function Admin() {
  const { packageList, deliveryList, loadingPackages, loadingDelivery } =
    useAdmin();
  return (
    <Layout>
      <Stack>
        {/** Package Section  */}

        <HStack justifyContent={"space-between"}>
          <Heading size="lg">Package List</Heading>
          <Button colorScheme="green">Create Package</Button>
        </HStack>

        {loadingPackages ? <Spinner /> : null}

        {packageList ? <PackageTable data={packageList} /> : null}

        {/** Delivery Section  */}

        <HStack mt={10} justifyContent={"space-between"}>
          <Heading size="lg">Delivery List</Heading>
          <Button colorScheme="green">Create Delivery</Button>
        </HStack>

        {loadingDelivery ? <Spinner /> : null}

        {deliveryList ? <DeliveryTable data={deliveryList} /> : null}
      </Stack>
    </Layout>
  );
}

export default withRole(Admin, "admin");
