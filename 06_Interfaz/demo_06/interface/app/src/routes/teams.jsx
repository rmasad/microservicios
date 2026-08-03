import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Heading,
  Link,
  Flex,
  Spacer,
  SimpleGrid,
  Container,
  Box,
  Button,
  Icon,
  HStack
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';

import { Layout } from '../layout/Layout';
import { LIST_TEAMS } from '../api/teams';

import { TeamCard } from '../components/TeamCard';

import { Link as RouteLink } from 'react-router-dom';
import { Error, Loading } from '../components/Results';

function App() {
  const { loading, error, data } = useQuery(LIST_TEAMS);

  if (error)
    return (
      <Layout>
        <Error />
      </Layout>
    );
  if (loading)
    return (
      <Layout>
        <Loading />
      </Layout>
    );

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" mb={8}>
          <Heading size={'4xl'} color="gray.800" mb={4}>
            Lista de equipos
          </Heading>
          <Box w="100px" h="4px" bg="green.500" mx="auto" borderRadius="full" />
        </Box>

        <Flex justify="space-between" align="center" mb={12}>
          <Box />
          <Button
            as={RouteLink}
            to="/teams/new"
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="green"
            size="lg"
            _focus={{ boxShadow: 'none' }}
          >
            Nuevo equipo
          </Button>
        </Flex>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          spacing={8}
          justifyItems="center"
        >
          {data.listTeams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export default App;
