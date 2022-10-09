
  import { 
    Portal,
    Box,
    SimpleGrid,
    useColorModeValue,
    Icon,
    Text
  } from "@chakra-ui/react";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart
  } from "react-icons/md";
  import { SidebarContext } from "../../../contexts/sidebarContext";
  import React, { useState } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import MiniStatistics from "../../../components/components/MiniStatistics";
  import IconBox from "../../../components/components/IconBox";
  import ComplexTable from "../../../components/components/ComplexTable"
  import routes from "../../../routes";
  import {
    Flex,
    IconButton,
    Divider,
    Avatar,
    Heading,
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
import { Link } from "react-router-dom";

import NavItem from '../../../components/components/NavItem'

  export default function AdminDashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("navy.700", "white");
    const userData =  JSON.parse(sessionStorage.getItem("userData"));
    const [navSize, changeNavSize] = useState("large")

    const getActiveRoute = (routes) => {
      let activeRoute = "Admin";
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].collapse) {
          let collapseActiveRoute = getActiveRoute(routes[i].items);
          if (collapseActiveRoute !== activeRoute) {
            return collapseActiveRoute;
          }
        } else if (routes[i].category) {
          let categoryActiveRoute = getActiveRoute(routes[i].items);
          if (categoryActiveRoute !== activeRoute) {
            return categoryActiveRoute;
          }
        } else {
          if (
            window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
          ) {
            return routes[i].name;
          }
        }
      }
      return activeRoute;
    };

    return (
      <>
        <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
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
                      style={{transition: "all 0.5s"}}
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
                    <Link to="/registerContractor"><NavItem navSize={navSize} icon={FiUser} title="Registrar contratista" /></Link>
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
                            <Heading as="h3" size="sm">{userData.name} {userData.lastname}</Heading>
                            <Text color="gray">Admin</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          style={navSize === "small" ? {transition: "all 0.3s"} : {transition:"all 0.3s"}}
          w={ navSize === "small" ? {base: "100%", xl: "calc( 100% - 100px )"} : {base: "100%", xl: "calc( 100% - 10px )"} }
          maxWidth={navSize === "small" ? { base: "100%", xl: "calc( 100% - 100px )" } : { base: "50%", xl: "calc( 100% - 290px )" } }
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <NavbarAdmin
              logoText={"Elca Telecomunicaciones"}
              brandText={getActiveRoute(routes)}
              userData={userData}
              navSize={navSize}
              />
            </Box>
          </Portal>
            <Box
              mx='auto'
              p={{ base: "20px", md: "30px" }}
              pe='20px'
              minH='100vh'
              pt='50px'>
              <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
                  gap='20px'
                  mb='20px'>
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                          <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
                        }
                      />
                    }
                    name='Contratistas'
                    value='5'
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        bg={boxBg}
                        icon={
                          <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                        }
                      />
                    }
                    name='Pagos'
                    value='20'
                  />
                  <MiniStatistics
                    startContent={
                      <IconBox
                        w='56px'
                        h='56px'
                        bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                        icon={<Icon w='28px' h='28px' as={MdAddTask} color='white' />}
                      />
                    }
                    name='Empleados'
                    value='50'
                  />
                </SimpleGrid>
                <Text
                  fontSize='22px'
                  fontWeight='700'
                  lineHeight='100%'
                  mb='20px'
                  color={textColor}>
                  Información principal de contratistas
                </Text>
                <ComplexTable/>
              </Box>
            </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>
       
      </>
    );
  }
  