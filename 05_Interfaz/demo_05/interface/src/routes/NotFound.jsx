import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

import { Layout } from '../layout/Layout';

function App() {
  return (
    <Layout>
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="2xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text"
        >
          404
        </Heading>
        <Text fontSize="18px" mt={3} mb={2}>
          Página no encontrada
        </Text>
        <Text color={'gray.500'} mb={6}>
          La página que estás buscando no parece existir
        </Text>
      </Box>
    </Layout>
  );
}

export default App;
