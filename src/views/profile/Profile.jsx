import { 
    Portal,
    Box,
    useColorModeValue,
    Text,
    Grid,
    Divider,
    Flex
  } from "@chakra-ui/react";
  import { SidebarContext } from "../../contexts/sidebarContext";
  import Sidebar from "../../components/components/sidebar/Sidebar";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../components/components/NavbarAdmin";
  import Footer from "../../components/components/footer/FooterAdmin";
  import General from "../../components/components/General";
  import Banner from "../../components/components/Banner";
  import banner from '../../assets/auth/banner.png';
  import avatar from "../../assets/auth/principal-image.jpg";
  import ComplexTable from "../../components/components/ComplexTable";
  import { getUserDetail } from '../../api/auth-request';
  import routes from "../../routes";
  import  Card  from "../../components/components/Card";
  import { Avatar } from "@chakra-ui/react";

  export default function AdminDashboard() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [user, setUser] = useState();
    const textColor = useColorModeValue("navy.700", "white");
    const userData = sessionStorage.getItem("tk");
    const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
    const textColorSecondary = "gray.400";
    const borderColor = useColorModeValue(
      "white !important",
      "#111C44 !important"
    );

    useEffect( () => {
      getAllEmployeesByContractorData();
    },[]);

    const getAllEmployeesByContractorData = async () => {
        const res = await getUserDetail();
        setUser(res.employees);
    }

    console.log(user)

    const getActiveRoute = (routes) => {
      let activeRoute = "Perfil";
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
                logoText={"Perfil"}
                brandText={getActiveRoute(routes)}
                userData={userData}
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
           <Card mb={{ base: "0px", lg: "20px" }} align='center'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={avatar}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {user?.name} {user?.lastname}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        Contratista
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {user?.adress}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Posts
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {user?.phone}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Followers
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {/* {following} */}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Following
          </Text>
        </Flex>
      </Flex>
    </Card>
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
  