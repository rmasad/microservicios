import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  useToast,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Select,
  Textarea,
  FormErrorMessage,
} from '@chakra-ui/react';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { useMutation } from '@apollo/client';

import { CREATE_TEAM, LIST_TEAMS } from '../api/teams';

export default function NewTeam() {
  const toast = useToast();
  const navigate = useNavigate();

  const [createTeam, { loading }] = useMutation(CREATE_TEAM, {
    refetchQueries: [{ query: LIST_TEAMS }],
    onCompleted: () => {
      toast({
        title: 'Equipo creado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/teams');
    },
    onError: error => {
      toast({
        title: 'Error al crear el equipo',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

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
                    <FormControl htmlFor="name" isRequired isInvalid={errors.name}>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        {...register('name', {
                          required: 'El nombre es obligatorio',
                        })}
                      />
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
                    {errors.description && errors.description.message}
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
