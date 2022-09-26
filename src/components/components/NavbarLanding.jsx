import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export default function NavbarLanding() {
  const { colorMode, toggleColorMode } = useColorMode();
  let mainText = useColorModeValue("gray.500", "white");

  return (
    <>
      <Box bg={useColorModeValue('gray.200', 'gray.500')} boxShadow='base' px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box><Link
              color={mainText}
              bg='inherit'
              borderRadius='inherit'
              fontWeight='bold'
              fontSize='20px'
              _hover={{ color: { mainText } }}
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}>
              Elca Telecomunicaciones
            </Link></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              bg='navy.800'
              _hover={{ color:'navy.200'}}>
              Ingresar
            </Button>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}