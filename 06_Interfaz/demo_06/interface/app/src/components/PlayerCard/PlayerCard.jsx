import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Divider,
  Icon
} from '@chakra-ui/react';

import { FiUsers, FiCreditCard } from 'react-icons/fi';

export const PlayerCard = props => {
  let avatar_url = props.player.avatar_url;

  if (!avatar_url) {
    avatar_url =
      'https://www.thesportsman.com/media/images/admin/football/boots-flying.jpg';
  }

  return (
    <Center py={12}>
      <Box
        role={'group'}
        p={6}
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'lg'}
        pos={'relative'}
        zIndex={1}
      >
        <Box
          rounded={'lg'}
          mt={-12}
          pos={'relative'}
          height={'230px'}
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
          _groupHover={{
            _after: {
              filter: 'blur(20px)',
            },
          }}
        >
          <Image
            rounded={'lg'}
            height={230}
            width={282}
            objectFit={'cover'}
            src={avatar_url}
          />
        </Box>
        <Stack pt={10} align={'center'}>
          <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
            <Icon as={FiCreditCard} mr={1} /> {props.player.id}
          </Text>
          <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
            #{props.player.number} {props.player.name}
          </Heading>
          <Stack direction={'row'} align={'center'}>
            <Text fontWeight={800} fontSize={'l'}>
              Edad: {props.player.age}
            </Text>
          </Stack>
          <Text width="100%" justifyContent="flex-start">
            {props.player.description}
          </Text>
        </Stack>
        {props.player.team && (
          <Box>
            <Divider mt={3}/>
            <Text mt={3}><Icon mr={1} as={FiUsers} /> Equipo: {props.player.team.name}</Text>
          </Box>
        )}
      </Box>
    </Center>
  );
};
