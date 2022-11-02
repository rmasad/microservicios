import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import { SidebarWithHeader } from '../components/Sidebar';

export const Layout = ({ children }) => {
  return (
    <ChakraProvider theme={theme}>
      <SidebarWithHeader textAlign="center" fontSize="xl">
        {children}
      </SidebarWithHeader>
    </ChakraProvider>
  );
};
