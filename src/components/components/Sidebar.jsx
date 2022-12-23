import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Box
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'

export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Box display={{ sm: "none", xl: "block" }} position='fixed' minH='100%' left="5" >
            <Flex
                pos="sticky"
                h="95%"
                marginTop="2.5vh"
                boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
                borderRadius= "30px"
                w={navSize === "small" ? "100px" : "250px"}
                flexDir="column"
                justifyContent="space-between">
                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                    as="nav"
                >
                    <IconButton
                        background="none"
                        mt={2}
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize === "small")
                                changeNavSize("large")
                            else
                                changeNavSize("small")
                        }}
                    />
                    <NavItem navSize={navSize} icon={FiHome} title="Pagina principal" description="This is the description for the dashboard." />
                    <NavItem navSize={navSize} icon={FiUser} title="Clients" />
                    <NavItem navSize={navSize} icon={IoPawOutline} title="Animals" />
                    <NavItem navSize={navSize} icon={FiDollarSign} title="Stocks" />
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings" />
                </Flex>

                <Flex
                    p="5%"
                    flexDir="column"
                    w="100%"
                    alignItems={navSize === "small" ? "center" : "flex-start"}
                    mb={4}
                >
                    <Divider display={navSize === "small" ? "none" : "flex"} />
                    <Flex mt={4} align="center">
                        <Avatar size="sm" src="avatar-1.jpg" />
                        <Flex flexDir="column" ml={4} display={navSize === "small" ? "none" : "flex"}>
                            <Heading as="h3" size="sm">Sylwia Weller</Heading>
                            <Text color="gray">Admin</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}
