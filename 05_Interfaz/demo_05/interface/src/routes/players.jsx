import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading } from '@chakra-ui/react';

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
        <Heading align={'center'} size={'4xl'} m={30}>Lista de jugadores</Heading>
        {data.listPlayers.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </Layout>
  );
}

export default App;
