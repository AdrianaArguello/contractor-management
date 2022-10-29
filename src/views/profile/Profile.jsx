import { 
    Portal,
    Box,
    useColorModeValue,
    Text,
    Grid,
    Flex,
    Icon,
  } from "@chakra-ui/react";
  import { SidebarContext } from "../../contexts/sidebarContext";
  import Sidebar from "../../components/components/sidebar/Sidebar";
  import React, { useState, useEffect } from "react";
  import NavbarAdmin from "../../components/components/NavbarAdmin";
  import Footer from "../../components/components/footer/FooterAdmin";
  import General from "../../components/components/General";
  import banner from '../../assets/auth/banner.png';
  import avatar from "../../assets/auth/principal-image.jpg";
  import { getUserDetail, getContractorById } from '../../api/auth-request';
  import  Card  from "../../components/components/Card";
  import { Avatar } from "@chakra-ui/react";
  import MiniStatistics from "../../components/components/MiniStatistics";
  import IconBox from "../../components/components/IconBox";
  import { MdDownload } from "react-icons/md";

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
        var temp;
        if(res?.employees.id_contractor) {
          temp = await getContractorById(res.employees.id_contractor);
          // setContractor(temp)
        }
        setUser({ "employee": res.employees, "contractor": temp.contractors});
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

    function downloadPdf() {
      const config = {headers: { Authorization: `Bearer ${userData}`,  responseType: 'application/pdf'}};
      fetch('http://localhost:8000/create-job-letter/'+user.employee.id+'', config)
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
        link.download="cartadetrabajo"+new Date().getDay()+"-"+new Date().getMonth()+"-"+new Date().getFullYear()+".pdf";
        link.click();
  
        setTimeout(function(){
          window.URL.revokeObjectURL(data);
        }, 100);
      })
    }

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
                brandText={getActiveRoute('routes')}
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
        {user?.employee.name} {user?.employee.lastname}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {user?.contractor.name}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        {/* <Flex mx='auto' me='60px' align='center' direction='column'>
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
            
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Following
          </Text>
        </Flex> */}
        {user?.employee ? 
        <div
          onClick={() => downloadPdf()}
          style={{cursor: 'pointer'}}
        >
          <MiniStatistics
            startContent={
            <IconBox
                w='60px'
                h='60px'
                bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                icon={<Icon w='28px' h='28px' as={MdDownload} color='white' />}
              />
            }
            name='Descargar reporte en Pdf'
          />
        </div>
        : ''}
      </Flex>
    </Card>
        <General
          user={(user) ? user : undefined}
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH='365px'
          pe='20px'
        />

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
  