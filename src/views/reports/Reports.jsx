
  import { 
    Portal,
    Box,
    SimpleGrid,
    useColorModeValue,
    Icon,
    Button
  } from "@chakra-ui/react";
  import {
    MdDownload
  } from "react-icons/md";
  import { SidebarContext } from "../../contexts/sidebarContext";
  import Sidebar from "../../components/components/sidebar/Sidebar";
  import React, { useState } from "react";
  import NavbarAdmin from "../../components/components/NavbarAdmin";
  import Footer from "../../components/components/footer/FooterAdmin";
  import MiniStatistics from "../../components/components/MiniStatistics";
  import IconBox from "../../components/components/IconBox";
  import routes from "../../routes";
  
  export default function Reports() {
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const userData = sessionStorage.getItem("tk");


    const getActiveRoute = (routes) => {
      let activeRoute = "Reportes";
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
          transitionDuration='.1s, .1s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
          <Portal>
            <Box>
              <NavbarAdmin
              logoText={"Generar Reportes"}
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
                <SimpleGrid
                  columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
                  gap='30px'
                  mb='30px'
                  mt='30px'>
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
                </SimpleGrid>
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
  