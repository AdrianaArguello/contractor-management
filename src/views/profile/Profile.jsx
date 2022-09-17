import { 
    Portal,
    Box,
    useColorModeValue,
    Text,
    Grid,
    Divider 
  } from "@chakra-ui/react";
  import { SidebarContext } from "../../contexts/sidebarContext";
  import Sidebar from "../../components/components/sidebar/Sidebar";
  import React, { useState } from "react";
  import NavbarAdmin from "../../components/components/NavbarAdmin";
  import Footer from "../../components/components/footer/FooterAdmin";
  import General from "../../components/components/General";
  import Banner from "../../components/components/Banner";
  import banner from '../../assets/auth/banner.png';
  import avatar from "../../assets/auth/principal-image.jpg";
  import ComplexTable from "../../components/components/ComplexTable";

  export default function AdminDashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
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
                
                <Text
                  fontSize='22px'
                  fontWeight='700'
                  lineHeight='100%'
                  mb='20px'
                  color={textColor}>
                  Información general del empleado
                </Text>
                <Grid
        mb='20px'
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
            <Banner
          gridArea='1 / 1 / 2 / 2'
          banner={banner}
          avatar={avatar}
          name='Adela Parkson'
          job='Product Designer'
          posts='17'
          followers='9.7k'
          following='274'
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />

      </Grid>
        <Divider />
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
  