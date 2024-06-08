import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  SimpleGrid,
} from "@chakra-ui/react";
import { InputFormProps } from "../helpers/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  DelivertInputType,
  DeliveryInputSchema,
} from "../schema/DeliverySchema";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSave: (input: DelivertInputType) => Promise<void>;
};

const DeliveryFormModal: React.FC<ModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DelivertInputType>({
    resolver: zodResolver(DeliveryInputSchema),
  });

  const onSubmit: SubmitHandler<DelivertInputType> = (data) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create Delivery</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={2} p={5}>
              <InputForm
                error={errors.package_id?.message}
                label="Package ID"
                register={register("package_id")}
              />
              <InputForm
                type="datetime-local"
                error={errors.pickup_time?.message}
                label="Pickup Time"
                register={register("pickup_time")}
              />
              <InputForm
                error={errors.location?.lat?.message}
                label="Latitude"
                register={register("location.lat")}
              />
              <InputForm
                error={errors.location?.lng?.message}
                label="Longitude"
                register={register("location.lng")}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              type="submit"
              colorScheme="blue"
              mr={3}
            >
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeliveryFormModal;

const InputForm: React.FC<InputFormProps<DelivertInputType>> = ({
  label,
  error,
  register,
  ...rest
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input {...rest} {...register} placeholder={label} />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
