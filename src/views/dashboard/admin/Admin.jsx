
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
  import Sidebar from "../../../components/components/sidebar/Sidebar";
  import React, { useState } from "react";
  import NavbarAdmin from "../../../components/components/NavbarAdmin";
  import Footer from "../../../components/components/footer/FooterAdmin";
  import MiniStatistics from "../../../components/components/MiniStatistics";
  import IconBox from "../../../components/components/IconBox";
  import ComplexTable from "../../../components/components/ComplexTable"

  export default function AdminDashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const textColor = useColorModeValue("navy.700", "white");

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
              <NavbarAdmin/>
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
                  Información principal
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
  