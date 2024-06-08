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
import { PackageInputSchema, PackageInputType } from "../schema/PackageSchema";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  onSave: (input: PackageInputType) => Promise<void>;
};

const PackageFormModal: React.FC<ModalProps> = ({
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
  } = useForm<PackageInputType>({ resolver: zodResolver(PackageInputSchema) });

  const onSubmit: SubmitHandler<PackageInputType> = (data) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Create Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <SimpleGrid columns={2} spacing={2} p={5}>
              <InputForm
                error={errors.from_name?.message}
                label="Form Name"
                register={register("from_name")}
              />
              <InputForm
                error={errors.from_address?.message}
                label="Form Address"
                register={register("from_address")}
              />
              <InputForm
                error={errors.from_location?.lat?.message}
                label="Form Location Latitude"
                register={register("from_location.lat")}
              />
              <InputForm
                error={errors.from_location?.lng?.message}
                label="Form Location Longitude"
                register={register("from_location.lng")}
              />
              <InputForm
                error={errors.to_name?.message}
                label="To Name"
                register={register("to_name")}
              />
              <InputForm
                error={errors.to_address?.message}
                label="To Address"
                register={register("to_address")}
              />
              <InputForm
                error={errors.to_location?.lat?.message}
                label="To Location Latitude"
                register={register("to_location.lat")}
              />
              <InputForm
                error={errors.to_location?.lng?.message}
                label="To Location Longitude"
                register={register("to_location.lng")}
              />
              <InputForm
                error={errors.height?.message}
                label="Height"
                register={register("height")}
              />
              <InputForm
                error={errors.depth?.message}
                label="Depth"
                register={register("depth")}
              />

              <InputForm
                error={errors.weight?.message}
                label="Weight"
                register={register("weight")}
              />
              <InputForm
                error={errors.description?.message}
                label="Description"
                register={register("description")}
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

export default PackageFormModal;

const InputForm: React.FC<InputFormProps<PackageInputType>> = ({
  label,
  error,
  register,
}) => (
  <FormControl isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input {...register} placeholder={label} />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);
