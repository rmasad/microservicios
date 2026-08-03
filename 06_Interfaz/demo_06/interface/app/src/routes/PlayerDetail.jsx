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
  Button,
  Container,
  Image,
  Stack,
  Center,
  useColorModeValue,
  Badge,
  Divider
} from '@chakra-ui/react';
import { FiArrowLeft, FiUsers, FiCreditCard, FiCalendar, FiHash } from 'react-icons/fi';

import { Layout } from '../layout/Layout';
import { GET_PLAYER } from '../api/players';
import { Error, Loading } from '../components/Results';

function PlayerDetail() {
  const { id } = useParams();
  const bgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'gray.100');

  const { loading, error, data } = useQuery(GET_PLAYER, {
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

  const player = data.getPlayer;

  let avatar_url = player.avatar_url;
  if (!avatar_url) {
    avatar_url = '/default-player-avatar.png';
  }

  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        {/* Botón de regreso */}
        <Button
          as={RouteLink}
          to="/players"
          leftIcon={<Icon as={FiArrowLeft} />}
          variant="ghost"
          mb={6}
        >
          Volver a jugadores
        </Button>

        {/* Información principal del jugador */}
        <Center mb={8}>
          <Box
            role={'group'}
            p={8}
            maxW={'500px'}
            w={'full'}
            bg={bgColor}
            boxShadow={'3xl'}
            rounded={'xl'}
            pos={'relative'}
            zIndex={1}
          >
            <Box
              rounded={'xl'}
              mt={-12}
              pos={'relative'}
              height={'300px'}
              _after={{
                transition: 'all .3s ease',
                content: '""',
                w: 'full',
                h: 'full',
                pos: 'absolute',
                top: 5,
                left: 0,
                backgroundImage: `url(${avatar_url})`,
                filter: 'blur(15px)',
                zIndex: -1,
              }}
            >
              <Image
                rounded={'xl'}
                height={300}
                width={'full'}
                objectFit={'cover'}
                src={avatar_url}
                alt={player.name}
              />
            </Box>

            <Stack pt={10} align={'center'} spacing={4}>
              <HStack spacing={2}>
                <Icon as={FiCreditCard} color="gray.500" />
                <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
                  ID: {player.id}
                </Text>
              </HStack>

              <Heading fontSize={'3xl'} fontFamily={'body'} fontWeight={600} textAlign="center">
                #{player.number} {player.name}
              </Heading>

              <HStack spacing={6}>
                <VStack spacing={1}>
                  <Icon as={FiHash} color="blue.500" boxSize={5} />
                  <Text fontWeight={600} fontSize={'lg'}>
                    #{player.number}
                  </Text>
                  <Text fontSize="sm" color="gray.500">Número</Text>
                </VStack>

                <VStack spacing={1}>
                  <Icon as={FiCalendar} color="green.500" boxSize={5} />
                  <Text fontWeight={600} fontSize={'lg'}>
                    {player.age}
                  </Text>
                  <Text fontSize="sm" color="gray.500">Años</Text>
                </VStack>
              </HStack>

              {player.description && (
                <Text
                  width="100%"
                  textAlign="center"
                  color="gray.600"
                  fontSize="md"
                  px={4}
                >
                  {player.description}
                </Text>
              )}
            </Stack>
          </Box>
        </Center>

        {/* Información del equipo */}
        {player.team && (
          <Box
            bg={bgColor}
            p={6}
            borderRadius="lg"
            boxShadow="lg"
            maxW="500px"
            mx="auto"
          >
            <VStack spacing={4}>
              <HStack spacing={2}>
                <Icon as={FiUsers} color="blue.500" boxSize={6} />
                <Heading size="lg" color={headingColor}>
                  Información del Equipo
                </Heading>
              </HStack>

              <Divider />

              <VStack spacing={3} w="full">
                <HStack justify="space-between" w="full">
                  <Text fontWeight="medium" color="gray.600">Equipo:</Text>
                  <Button
                    as={RouteLink}
                    to={`/teams/${player.team.id}`}
                    variant="link"
                    color="blue.500"
                    fontWeight="bold"
                    fontSize="lg"
                  >
                    {player.team.name}
                  </Button>
                </HStack>

                {player.team.country && (
                  <HStack justify="space-between" w="full">
                    <Text fontWeight="medium" color="gray.600">País:</Text>
                    <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                      {player.team.country}
                    </Badge>
                  </HStack>
                )}

                {player.team.description && (
                  <VStack align="start" w="full" spacing={2}>
                    <Text fontWeight="medium" color="gray.600">Descripción del equipo:</Text>
                    <Text color="gray.600" fontSize="sm" bg="gray.50" p={3} borderRadius="md">
                      {player.team.description}
                    </Text>
                  </VStack>
                )}
              </VStack>
            </VStack>
          </Box>
        )}
      </Container>
    </Layout>
  );
}

export default PlayerDetail;
