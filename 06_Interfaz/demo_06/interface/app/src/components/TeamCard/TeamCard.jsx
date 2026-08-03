import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Icon,
  Link,
} from '@chakra-ui/react';

import { FiCreditCard,  } from 'react-icons/fi';
import { BiWorld } from "react-icons/bi";
import { Link as RouteLink } from 'react-router-dom';

export const TeamCard = props => {
  return (
    <Box
      as={RouteLink}
      to={`/teams/${props.team.id}`}
      role={'group'}
      p={6}
      maxW={'330px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'2xl'}
      rounded={'lg'}
      pos={'relative'}
      zIndex={1}
      _hover={{ transform: 'translateY(-2px)', boxShadow: '3xl' }}
      transition="all 0.2s"
      cursor="pointer"
      style={{ textDecoration: 'none' }}
    >
      <Stack align={'center'}>
        <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
          <Icon as={FiCreditCard} mr={1} /> {props.team.id}
        </Text>
        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
          {props.team.name}
        </Heading>
        <Stack direction={'row'} align={'center'}>
          <Text fontWeight={800} fontSize={'l'}>
            <Icon as={BiWorld} /> {props.team.country}
          </Text>
        </Stack>
        <Text width="100%" justifyContent="flex-start">
          {props.team.description}
        </Text>
      </Stack>
    </Box>
  );
};
