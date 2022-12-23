import React from 'react'
import {
  Flex,
  Text,
  Icon,
  Box,
  Menu,
  MenuButton,
  useColorModeValue,
} from '@chakra-ui/react'

export default function NavItem({ icon, title, active, navSize }) {
  const backgroundColor = useColorModeValue("gray.200", "gray.300");
  const textColor = useColorModeValue("white", "black");

  return (
    <Flex
      mt={'7%'}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}>
        <Menu placement="right">
          <Box
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: backgroundColor }}
            w={navSize === "large" && "100%"}
          >
          <MenuButton w="100%">
            <Flex>
                <Icon as={icon} fontSize="xl" color={active ? textColor : "gray.500"} />
                <Text ml={5} display={navSize === "small" ? "none" : "flex"}>{title}</Text>
            </Flex>
          </MenuButton>
          </Box>
        </Menu>
    </Flex>
  )
}
