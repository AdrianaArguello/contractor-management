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
  } from "@chakra-ui/react";
  import Card from "../../../components/components/Card"
  import { SidebarContext } from "../../../contexts/sidebarContext";
  import Sidebar from "../../../components/components/sidebar/Sidebar";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import { getAllEmployees } from '../../../api/auth-request';
  import routes from "../../../routes";
import { useNavigate } from "react-router-dom";

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

   console.log(employees)
    return (
      <>
        <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}>
        <Sidebar/>
        <Box
          float='right'
          minHeight='100vh'
          height='100%'
          overflow='auto'
          position='relative'
          maxHeight='100%'
          w={{ base: "100%", xl: "calc( 100% - 290px )" }}
          maxWidth={{ base: "100%", xl: "calc( 100% - 290px )" }}
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
                  Información principal de los empleados
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
                    color='gray.400'>Nombre</Th>
                      <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Apellido</Th>
                     <Th align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>Telefono</Th>
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
                  {employees?.length > 0 ? employees.map((employee,index) => 
                  <Tbody key={index}>
                    <Tr>
                      <Td>{employee?.name}</Td>
                      <Td>{employee?.lastname}</Td>
                      <Td>{employee?.phone}</Td>
                      <Td>hola</Td>
                      <Td>
                        <Button
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => addRange(employee.id)}>
                          Agregar tarifa
                        </Button>
                      </Td>
                       {/* <Td>
                        <Button
                          colorScheme='red'
                          fontSize='sm'
                          variant='brand'
                          fontWeight='500'
                          h='50'
                          type="button"
                          onClick={() => deleteContractorsData(contractor.id)}
                          >
                          Eliminar
                        </Button>
                      </Td> */}
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
  