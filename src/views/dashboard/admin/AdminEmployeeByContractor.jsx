import { 
    Portal,
    Box,
    useColorModeValue,
    Text,
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
  } from "@chakra-ui/react";
  import Card from "../../../components/components/Card"
  import { SidebarContext } from "../../../contexts/sidebarContext";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import routes from "../../../routes";
  import {
    Flex,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Tbody,
    Td
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiUser,
    FiDollarSign,
    FiBriefcase,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getEmployeeByIdContractor } from '../../../api/auth-request';

import NavItem from '../../../components/components/NavItem'

  export default function AdminEmployeeByContractor() {
    const {id} = useParams();
    console.log('soyyyy yo',id)
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    const userData =  JSON.parse(sessionStorage.getItem("userData"));
    const [navSize, changeNavSize] = useState("large")
    const [employees, setEmployees] = useState([]);
    let navigate = useNavigate();

    useEffect( () => {
        getAllEmployeesByContractorData(id);
    },[]);

    const getAllEmployeesByContractorData = async (id) => {
        const res = await getEmployeeByIdContractor(id);
        setEmployees(res.data);
    }
    
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
                    <Link to="/adminEmployee"><NavItem navSize={navSize} icon={FiHome} title="Ver Empleados" /></Link>
                    <Link to="/registerContractor"><NavItem navSize={navSize} icon={FiUser} title="Registrar contratista"/></Link>
                    <Link to="/registerEmployee"><NavItem navSize={navSize} icon={FiBriefcase} title="Registrar empleado" /></Link>
                    <Link to="/registerPeriods"><NavItem navSize={navSize} icon={FiDollarSign} title="Registrar periodos" /></Link>
                    <Link to="/registerCharge"><NavItem navSize={navSize} icon={FiDollarSign} title="Registrar nuevo cargo" /></Link>
                    <NavItem navSize={navSize} icon={FiBriefcase} title="Reports" />
                    {/* <NavItem navSize={navSize} icon={FiSettings} title="Settings" /> */}
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
          w={navSize === "small" ? 
          {
            base: "calc(100vw - 6%)",
            md: "calc(100vw - 8%)",
            lg: "calc(100vw - 6%)",
            xl: "calc(100vw - 170px)",
            "2xl": "calc(100vw - 365px)",
          }: {
            base: "calc(100vw - 3%)",
            md: "calc(100vw - 1%)",
            lg: "calc(100vw - 1%)",
            xl: "calc(100vw - 300px)",
            "2xl": "calc(100vw - 365px)",
          }}
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
                
                <Text
                  fontSize='22px'
                  fontWeight='700'
                  lineHeight='100%'
                  mb='20px'
                  color={textColor}>
                    Contratista
                </Text>
                <Card
                
                direction='column'
                w='100%'
                px='0px'
                overflowX={{ sm: "scroll", lg: "hidden" }}>
                <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px' borderRadius='30px'>
                  <Thead>
                    <Tr>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Empleado</Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Correo</Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Dirección</Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Telefono</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Salario</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Status</Th>
                    
                    </Tr>
                  </Thead>
                  {employees?.length > 0 ? employees.map((employee,index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{employee?.name} {employee?.lastname}</Td>
                      <Td>{employee?.email}</Td>
                      <Td>{employee?.address}</Td>
                      <Td>{employee?.phone}</Td>
                      <Td>{employee?.salary}</Td>
                      <Td>{employee?.status}</Td>
                    </Tr>
                  </Tbody>
                  ): ''}
                </Table>
                </TableContainer>
                </Card>
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
  