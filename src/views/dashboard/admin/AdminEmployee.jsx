import { 
  Portal,
  Box,
  useColorModeValue,
  Text,
  TableContainer,
  Table,
  Thead,
  Button,
  Tr,
  Th,
  Td,
  Tbody,
  Divider,
  Flex,
  IconButton,
  Avatar,
  Heading,
  SimpleGrid,
  Icon
  } from "@chakra-ui/react";
  import {
    FiMenu,
    FiHome,
    FiUser,
    FiDollarSign,
    FiBriefcase,
} from 'react-icons/fi'
  import Card from "../../../components/components/Card"
  import { SidebarContext } from "../../../contexts/sidebarContext";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import { getAllEmployees } from '../../../api/auth-request';
import { useNavigate, Link } from "react-router-dom";
import NavItem from "../../../components/components/NavItem";
import IconBox from "../../../components/components/IconBox";
import MiniStatistics from "../../../components/components/MiniStatistics";
import { MdDownload } from "react-icons/md";

  export default function AdminDashboardEmployee() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const textColor = useColorModeValue("navy.700", "white");
    let navigate = useNavigate();
    const userData =  JSON.parse(sessionStorage.getItem("userData"));
    const [navSize, changeNavSize] = useState("large")
    const [employees, setEmployees] = useState([]);

    const getActiveRoute = (routes) => {
      let activeRoute = "Empleados";
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

    useEffect( () => {
      getAllEmployeesData();
  },[]);

  const getAllEmployeesData = async () => {
      const res = await getAllEmployees();
      setEmployees(res.employees);
  }

  const addRange = async (id) => {
    navigate( `/registerRatesByEmployee/${id}`)
  }

  const editEmployee = async (id) => {
    navigate( `/editEmployee/${id}`)
  }

  function downloadPdf() {
    const config = {headers: { Authorization: `Bearer ${userData}`,  responseType: 'application/pdf'}};
    fetch('http://localhost:8000/create-pdf-file', config)
    .then(r => r.blob())
    .then(res => {
      var newBlob = new Blob([res], {type: "application/pdf"})
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      const data = window.URL.createObjectURL(newBlob);
      var link = document.createElement('a');
      link.href = data;
      link.download="ReporteEmpleadosPorContratista"+new Date().getDay()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()+".pdf";
      link.click();

      setTimeout(function(){
        window.URL.revokeObjectURL(data);
      }, 100);
    })
  }

return (
  <>
  <SidebarContext.Provider value={{ toggleSidebar, setToggleSidebar}}>
    <Box display={{ sm: "none", xl: "block" }} position='fixed' minH='100%' left="5">
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
            as="nav">
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
                }}/>
                <Link to="/adminEmployee"><NavItem navSize={navSize} icon={FiHome} title="Ver Empleados" /></Link>
                <Link to="/registerContractor"><NavItem navSize={navSize} icon={FiUser} title="Registrar contratista"/></Link>
                <Link to="/registerEmployee"><NavItem navSize={navSize} icon={FiBriefcase} title="Registrar empleado" /></Link>
                <Link to="/registerPeriods"><NavItem navSize={navSize} icon={FiDollarSign} title="Registrar periodos" /></Link>
                <Link to="/registerCharge"><NavItem navSize={navSize} icon={FiDollarSign} title="Registrar nuevo cargo" /></Link>
                <Link to="/reports"><NavItem navSize={navSize} icon={FiBriefcase} title="Reportes" /></Link>
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
      w={{ base: "100%", xl: "calc( 100% - 290px )" }}
      maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}>
      <Portal>
        <Box>
          <NavbarAdmin
          logoText={"Elca Telecomunicaciones"}
          brandText={getActiveRoute('routes')}
          userData={userData}
          navSize={navSize}/>
        </Box>
      </Portal>
        <Box
          p={{ base: "20px", md: "30px" }}
          pe='20px'
          minH='100vh'
          pt='50px'>
          <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' mb='20px'>Reportes</Text>
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}>
                <div style={{cursor: 'pointer'}} onClick={() => downloadPdf()}>
                  <MiniStatistics
                    startContent={
                    <IconBox
                        w='60px'
                        h='60px'
                        bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                        icon={<Icon w='28px' h='28px' as={MdDownload} color='white' />}
                      />
                    }
                    name='Descargar reporte en Pdf'/>
                </div>
            </SimpleGrid>
          </Box>
          <Box pt={{ base: "10px", md: "80px", xl: "15px" }}>
          <Text color={textColor} fontSize='22px' fontWeight='700' lineHeight='100%' mb='20px'>Empleados</Text>
          <Card
            direction='column'
            w='100%'
            overflowX={{ sm: "scroll", lg: "hidden" }}>
              <TableContainer>
                <Table variant='simple' color='gray.500' mb='10px' borderRadius='30px'>
                  <Thead>
                    <Tr>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Nombre</Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Apellido</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Cedula</Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Telefono</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Correo</Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'> </Th>
                    </Tr>
                  </Thead>
                  {employees?.length > 0 ? employees.map((employee,index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{employee?.name}</Td>
                      <Td>{employee?.lastname}</Td>
                      <Td>{employee?.identification}</Td>
                      <Td>{employee?.phone}</Td>
                      <Td>{employee?.email}</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => addRange(employee.id)}>
                          Agregar tarifa de pago
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => editEmployee(employee.id)}>
                          Editar empleado
                        </Button>
                      </Td>
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
  </>
);
  }
  