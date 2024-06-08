import {
  Button,
  Heading,
  HStack,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../layout";
import withRole from "../components/WithRole";
import useAdmin from "../hooks/useAdmin";
import { PackageTable } from "../components/PackageTable";
import { DeliveryTable } from "../components/DeliveryTable";
import { Spinner } from "@chakra-ui/react";
import PackageFormModal from "../components/PackageFormModal";
import DeliveryFormModal from "../components/DeliveryFormModal";

function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelivery,
    onOpen: onOpenDelivery,
    onClose: onCloseDelivery,
  } = useDisclosure();

  const {
    createPackage,
    createDelivery,
    packageList,
    deliveryList,
    loadingPackages,
    loadingDelivery,
    loadingDeliveryRequest,
    loadingPackageRequest,
    errPackageRequest,
    errDeliveryRequest,
  } = useAdmin();

  return (
    <Layout>
      <Stack>
        {/** Package Section  */}

        <HStack justifyContent={"space-between"}>
          <Heading size="lg">Package List</Heading>
          <Button onClick={onOpen} colorScheme="green">
            Create Package
          </Button>
        </HStack>

        {loadingPackages ? <Spinner /> : null}

        {packageList.length ? <PackageTable data={packageList} /> : null}

        {/** Delivery Section  */}

        <HStack mt={10} justifyContent={"space-between"}>
          <Heading size="lg">Delivery List</Heading>
          <Button onClick={onOpenDelivery} colorScheme="green">
            Create Delivery
          </Button>
        </HStack>

        {loadingDelivery ? <Spinner /> : null}

        {deliveryList.length ? <DeliveryTable data={deliveryList} /> : null}
      </Stack>
      <PackageFormModal
        isOpen={isOpen}
        isLoading={loadingPackageRequest}
        onClose={onClose}
        onSave={createPackage}
      />
      <DeliveryFormModal
        isOpen={isOpenDelivery}
        isLoading={loadingDeliveryRequest}
        onClose={onCloseDelivery}
        onSave={createDelivery}
      />
    </Layout>
  );
}

export default withRole(Admin, "admin");
