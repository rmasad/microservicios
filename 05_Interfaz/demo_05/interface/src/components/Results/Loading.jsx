import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Spinner size='xl' />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Cargando...
      </Heading>
      <Text color={'gray.500'}>
        Parece que esta tardando más de lo esperado.
      </Text>
    </Box>
  );
}