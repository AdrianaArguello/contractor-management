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
  let mainText = useColorModeValue("#3f51b5", "white");
  let buttonLogin = useColorModeValue("#3f51b5", "navy.800");

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
              Elca
               {/* Telecomunicaciones */}
            </Link></Box>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              bg={buttonLogin}
              _hover={{ color:'#f0f0f0', background:'#536dff'}}
              _active={{
                background: "#3e4ea9",
                transform: "none",
                borderColor: "transparent",
              }}
              >
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