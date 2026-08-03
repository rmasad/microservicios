import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading, SimpleGrid, Container, Box } from '@chakra-ui/react';

import { Layout } from '../layout/Layout';
import { LIST_PLAYERS } from '../api/players';

import { PlayerCard } from '../components/PlayerCard'

import { Error, Loading } from '../components/Results'

function App() {
  const { loading, error, data } = useQuery(LIST_PLAYERS);

  if (error) return <Layout> <Error /> </Layout>;
  if (loading) return  <Layout> <Loading /> </Layout>;


  return (
      <Layout>
        <Container maxW="container.xl" py={8}>
          <Box textAlign="center" mb={12}>
            <Heading size={'4xl'} color="gray.800" mb={4}>
              Lista de jugadores
            </Heading>
            <Box w="100px" h="4px" bg="blue.500" mx="auto" borderRadius="full" />
          </Box>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
            spacing={8}
            justifyItems="center"
          >
            {data.listPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </SimpleGrid>
        </Container>
      </Layout>
  );
}

export default App;
