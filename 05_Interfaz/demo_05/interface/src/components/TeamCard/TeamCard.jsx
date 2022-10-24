import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Divider,
  Icon,
} from '@chakra-ui/react';

import { FiCreditCard,  } from 'react-icons/fi';
import { BiWorld } from "react-icons/bi";

export const TeamCard = props => {
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
    </Center>
  );
};
