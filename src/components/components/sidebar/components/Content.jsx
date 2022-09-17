import { Box, Flex, Stack, Text, Divider } from "@chakra-ui/react";
//   Custom components
import SidebarCard from "./SidebarCard";
import React from "react";

// FUNCTIONS

function SidebarContent() {

  return (
    <>
      <Flex direction='column' height='100%' pt='25px'>
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
        <Text
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'
          mb='20px'>
          Menu
        </Text>
        <Divider />
        </Box>
      </Stack>

      <Box
        ps='20px'
        pe={{ md: "16px", "2xl": "0px" }}
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        <SidebarCard />
      </Box>
    </Flex>
    </>
  )
}

export default SidebarContent;
