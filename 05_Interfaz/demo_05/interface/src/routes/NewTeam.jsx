import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  useToast,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../layout/Layout';
import { useMutation } from '@apollo/client';

import { CREATE_TEAM } from '../api/teams';

export default function NewTeam() {
  const [createTeam, { mutation_data, loading, error }] =
    useMutation(CREATE_TEAM);

  const toast = useToast();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    createTeam({
      variables: {
        name: data.name,
        country: data.country,
        description: data.description,
      },
    });

    toast({
      title: 'Submitted',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Layout>
      <Flex align={'center'} justify={'center'}>
        <Stack spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Nuevo equipo ✌️
            </Heading>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl htmlFor="name" isRequired>
                      <FormLabel>Nombre</FormLabel>
                      <Input id="name" type="text" {...register('name')} />
                      <FormErrorMessage>
                        {errors.name && errors.name.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="country" isRequired>
                      <FormLabel>País</FormLabel>
                      <Select
                        placeholder="Selecciona opción"
                        {...register('country')}
                      >
                        <option value="Chile">Chile</option>
                        <option value="Portugal">Portugal</option>
                        <option value="España">España</option>
                        <option value="Francia">Francia</option>
                      </Select>
                      <FormErrorMessage>
                        {errors.country && errors.country.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="description">
                  <FormLabel>Descripción</FormLabel>
                  <Textarea {...register('description')} />
                  <FormErrorMessage>
                    {errors.Descripción && errors.Descripción.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Creando..."
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    type="submit"
                    isLoading={loading}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Guardar
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </Layout>
  );
}
