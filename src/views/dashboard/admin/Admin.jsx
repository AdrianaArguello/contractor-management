
  import { 
    Portal,
    Box,
    SimpleGrid,
    useColorModeValue,
    Icon,
    Text,
    TableContainer,
    Table,
    Thead,
    Button,
    Tr,
    Th,
    Td,
    Tbody,
    Grid,
  } from "@chakra-ui/react";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart
  } from "react-icons/md";
  import Card from "../../../components/components/Card"
  import { SidebarContext } from "../../../contexts/sidebarContext";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import MiniStatistics from "../../../components/components/MiniStatistics";
  import IconBox from "../../../components/components/IconBox";
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
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom';
import { getCharges, getCounts, deletePeriodById, deleteContractors, deleteChargesById, getAllEmployeesByContractor,getAllPeriods, getAllRates } from '../../../api/auth-request';

import NavItem from '../../../components/components/NavItem'

  export default function AdminDashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("navy.700", "white");
    const userData =  JSON.parse(sessionStorage.getItem("userData"));
    const [navSize, changeNavSize] = useState("large")
    const [contractors, setContractors] = useState([]);
    const [charges, setCharges] = useState([]);
    const [periods, setPeriods] = useState([]);
    const [count, setCount] = useState([]);
    const [rates, setRates] = useState([]);
    let navigate = useNavigate();

    useEffect( () => {
        getAllContractorsData();
        getAllChargesData();
        getAllPeriodsData();
        getCountsData();
        getAllRatesData();
    },[]);

    const getAllContractorsData = async () => {
        const res = await getAllEmployeesByContractor();
        setContractors(res.data);
    }

    const getAllPeriodsData = async () => {
      const res = await getAllPeriods();
      setPeriods(res.period)
    }

    const getAllChargesData = async () => {
      const res = await getCharges();
      setCharges(res)
    }

    const getCountsData = async () => {
      const res = await getCounts();
      setCount(res)
    }

    const getAllRatesData = async () => {
      const res = await getAllRates();
      setRates(res.rate);
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
      
    const editContractor = async (id) => {
      navigate(`/editContractors/${id}`);
    }
    
    const editCharge = async (id) => {
      navigate(`/editCharges/${id}`);
    }

    const editRate = async (id) => {
      navigate(`/editRates/${id}`);
    }
      
    const deleteContractorsData = async (id) => {
      await deleteContractors(id);
      getAllContractorsData();
    }

    const deleteChargeData = async (id) => {
      await deleteChargesById(id);
      getAllChargesData();
    }

    const editPeriod = async (id) => {
      navigate(`/editPeriods/${id}`);
    }

    const deletePeriodData = async (id) => {
      await deletePeriodById(id);
      getAllPeriodsData();
    }

    const handleRegisterRate = async (idPeriod) => {
      navigate( `/registerRates/${idPeriod}`)
    }

    const goToEmployees = async (idContractor) => {
      console.log('envio el id', idContractor)
      navigate( `/adminEmployeeByContractor/${idContractor}`)
    }

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
                    <Link to="/reports"><NavItem navSize={navSize} icon={FiBriefcase} title="Reportes" /></Link>
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
          // w={ navSize === "small" ? {base: "100%", xl: "calc( 100% - 100px )"} : {base: "100%", xl: "calc( 100% - 10px )"} }
          // maxWidth={navSize === "small" ? { base: "100%", xl: "calc( 100% - 100px )" } : { base: "50%", xl: "calc( 100% - 290px )" } }
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
                    value={contractors?.length.toString()}
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
                    value={count.rates}
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
                    value={count.employees}
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
                    color='gray.400'>Contratistas</Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>N. Empleados</Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Tipo</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Ver Empleados</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    </Tr>
                  </Thead>
                  {contractors?.length > 0 ? contractors.map((contractor,index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{contractor?.name}</Td>
                      <Td>{contractor?.cantidad_empleados}</Td>
                      <Td>{contractor?.type}</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => editContractor(contractor.id)}>
                          Editar
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme='red'
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => deleteContractorsData(contractor?.id)}
                          >
                          Eliminar
                        </Button>
                      </Td>
                      <Td>
                      <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => goToEmployees(contractor?.id)}>
                          Ver empleados
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                  ): ''}
                </Table>
                </TableContainer>
                </Card>
                <Text
                  fontSize='22px'
                  fontWeight='700'
                  lineHeight='100%'
                  mb='20px'
                  mt='20px'
                  color={textColor}>
                  Periodos registrados
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
                    color='gray.400'>Fecha de inicio</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Fecha final</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>status</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    </Tr>
                  </Thead>
                  {periods?.length > 0 ? periods.map((period, index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{period?.initial_date}</Td>
                      <Td>{period?.final_date}</Td>
                      <Td>{period?.status}</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => editPeriod(period.id)}>
                          Editar
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme='red'
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => deletePeriodData(period.id)}
                          >
                          Eliminar
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => handleRegisterRate(period?.id)}>
                          Registrar tarifa
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                  ): ''}
                </Table>
                </TableContainer>
                </Card>
                <Grid
                  mb='20px'
                  mt='20px'
                  templateColumns={{
                    base: "1fr",
                    lg: "repeat(2, 1fr)",
                    "2xl": "1.34fr 1.62fr 1fr",
                  }}
                  templateRows={{
                    base: "1fr",
                    lg: "repeat(1, 1fr)",
                    "2xl": "1fr",
                  }}
                  gap={{ base: "20px", xl: "20px" }}>
                <Card
                    direction='column'
                    w='100%'
                    px='0px'
                    overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Text
                      fontSize='22px'
                      fontWeight='700'
                      ml="15px"
                      lineHeight='100%'
                      mb='20px'
                      color={textColor}>
                        Cargos registrados
                    </Text>
                <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px' borderRadius='30px'>
                  <Thead>
                    <Tr>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Cargos</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    </Tr>
                  </Thead>
                  {charges?.length > 0 ? charges.map((charge, index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{charge?.type}</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => editCharge(charge.id)}>
                          Editar
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme='red'
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => deleteChargeData(charge.id)}
                          >
                          Eliminar
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                  ): ''}
                </Table>
                </TableContainer>
                </Card>
                <Card
                    direction='column'
                    w='100%'
                    px='0px'
                    overflowX={{ sm: "scroll", lg: "hidden" }}>
                    <Text
                      fontSize='22px'
                      fontWeight='700'
                      ml="15px"
                      lineHeight='100%'
                      mb='20px'
                      color={textColor}>
                        Tarifas por periodo
                    </Text>
                <TableContainer>
                <Table variant='simple' color='gray.500' mb='24px' borderRadius='30px'>
                  <Thead>
                    <Tr>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>N</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Tarifa</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    </Tr>
                  </Thead>
                  {rates?.length > 0 ? rates.map((rates, index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{rates?.id}</Td>
                      <Td>{rates?.salary}</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => editRate(rates.id)}>
                          Editar
                        </Button>
                      </Td>
                    </Tr>
                  </Tbody>
                  ): ''}
                </Table>
                </TableContainer>
                </Card>

                </Grid>
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
  