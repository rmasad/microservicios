import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link as RouteLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Button,
  Container,
  Divider,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { FiArrowLeft, FiUsers, FiGlobe, FiCreditCard } from 'react-icons/fi';

import { Layout } from '../layout/Layout';
import { GET_TEAM } from '../api/teams';
import { PlayerCard } from '../components/PlayerCard';
import { Error, Loading } from '../components/Results';

function TeamDetail() {
  const { id } = useParams();
  const bgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'gray.100');
  const { loading, error, data } = useQuery(GET_TEAM, {
    variables: { id }
  });

  if (error) {
    return (
      <Layout>
        <Error />
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  const team = data.getTeam;

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        {/* Botón de regreso */}
        <Button
          as={RouteLink}
          to="/teams"
          leftIcon={<Icon as={FiArrowLeft} />}
          variant="ghost"
          mb={6}
        >
          Volver a equipos
        </Button>

        {/* Información del equipo */}
        <Box
          bg={bgColor}
          p={8}
          borderRadius="lg"
          boxShadow="lg"
          mb={8}
        >
          <VStack spacing={4} align="start">
            <HStack spacing={2}>
              <Icon as={FiCreditCard} color="gray.500" />
              <Text color="gray.500" fontSize="sm">
                ID: {team.id}
              </Text>
            </HStack>

            <Heading size="2xl" color={headingColor}>
              {team.name}
            </Heading>

            <HStack spacing={2}>
              <Icon as={FiGlobe} color="blue.500" />
              <Text fontSize="lg" fontWeight="medium">
                {team.country}
              </Text>
            </HStack>

            {team.description && (
              <Text fontSize="md" color="gray.600" maxW="600px">
                {team.description}
              </Text>
            )}

            <HStack spacing={2}>
              <Icon as={FiUsers} color="green.500" />
              <Badge colorScheme="green" fontSize="sm">
                {team.players?.length || 0} jugadores
              </Badge>
            </HStack>
          </VStack>
        </Box>

        {/* Lista de jugadores */}
        <Box>
          <Heading size="lg" mb={6} color={headingColor}>
            Jugadores del equipo
          </Heading>

          {team.players && team.players.length > 0 ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {team.players.map(player => (
                <PlayerCard
                  key={player.id}
                  player={{ ...player, team }}
                />
              ))}
            </SimpleGrid>
          ) : (
            <Box
              p={8}
              textAlign="center"
              bg="gray.50"
              borderRadius="lg"
              border="2px dashed"
              borderColor="gray.200"
            >
              <Icon as={FiUsers} boxSize={12} color="gray.400" mb={4} />
              <Text color="gray.500" fontSize="lg">
                Este equipo aún no tiene jugadores
              </Text>
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
}

export default TeamDetail;
