// Chakra imports
import { Portal, Box } from "@chakra-ui/react";
import Sidebar from "../../../components/components/sidebar/Sidebar";
import { SidebarContext } from "../../../contexts/sidebarContext";
import React, { useState } from "react";
import NavbarAdmin from "../../../components/components/NavbarAdmin"
import AdminDashboard from "../../../views/dashboard/admin/admin";

export default function Dashboard() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  
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
                <AdminDashboard/>
            </Box>
          <Box>
            {/* <Footer /> */}
          </Box>
        </Box>
      </SidebarContext.Provider>
    </Box>

      
      {/* <Sidebar/>
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
          <Box mx='auto' minH='100vh'>
          Esto es el contenedor
          </Box>
        </Box> */}
    </>
  );
}