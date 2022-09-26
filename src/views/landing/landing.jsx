
  import { 
    Box,
    useColorModeValue,
    Text
  } from "@chakra-ui/react";
  import React from "react";
  import Footer from "../../components/components/footer/FooterAdmin";
import NavbarLanding from "../../components/components/NavbarLanding";
import principalImage from "../../assets/landing/imagen-principal.jpg";
import '../../style/App.css';

  export default function Landing() {
    const textColor = useColorModeValue("Navy.500", "white");

    return (
      <>
        <Box>
        <Box
          minHeight='100vh'
          height='100%'
          position='relative'
          maxHeight='100%'
          width='100%'
          transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
          transitionDuration='.2s, .2s, .35s'
          transitionProperty='top, bottom, width'
          transitionTimingFunction='linear, linear, ease'>
            <Box
             maxWidth={{ base: "100%"}}>
                <NavbarLanding
                position='absolute'
                ></NavbarLanding>
            </Box>
            <Box
              mx='auto'
              pe='20px'
              minH='100vh'
              >
              <Box filter='auto' brightness='40%' className="box" pb="20px">
                <img src={principalImage} alt="imagen-principal" className="banner"/>
                <Text
                  fontSize='60px'
                  p='20px'
                  fontWeight='700'
                  lineHeight='100%'
                  mb='20px'
                  textAlign='center'
                  color={textColor}>
                    Bienvenido a Elca Telecomunicaciones
                </Text>
              </Box>
            </Box>
          <Box>
            <Footer />
          </Box>
        </Box>
    </Box>
       
      </>
    );
  }