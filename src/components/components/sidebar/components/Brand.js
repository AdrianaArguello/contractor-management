import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text, Divider } from "@chakra-ui/react";


export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text h='26px' w='175px' my='32px' color={logoColor} >
        Menu de Opciones
      </Text>
      <Divider mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
