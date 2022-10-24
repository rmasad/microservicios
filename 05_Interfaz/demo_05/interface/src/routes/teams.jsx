import React from 'react';
import { useQuery } from '@apollo/client';
import { Heading, Link, Flex, Spacer } from '@chakra-ui/react';

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
      <Heading align={'center'} size={'4xl'} m={30}>
        Lista de equipos
      </Heading>
      <Flex>
        <Spacer />
        <Link
          as={RouteLink}
          to="/teams/new"
          _focus={{ boxShadow: 'none' }}
          Align="right"
          mr={10}
        >
          Nuevo equipo
        </Link>
      </Flex>
      {data.listTeams.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </Layout>
  );
}

export default App;
