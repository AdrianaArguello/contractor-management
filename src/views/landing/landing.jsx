
import {
  Box,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  Heading,
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
        <Box maxWidth={{ base: "100%"}}>
          <NavbarLanding position='absolute'></NavbarLanding>
        </Box>
        <Flex
          justify={{ base: "space-around", md: "flex-end", lg: "space-around", xl: "space-around", sm: 'flex-end', xs: 'flex-end' }}
          direction={{ base: "column-reverse", md: "row" }}
          wrap="no-wrap"
          minH={{base: "auto", md: "70vh", sm: "70vh",  xs: "70vh"}}
          // minH="70vh"
          px={8}
          mb={16}
        >
          <Stack
            spacing={4}
            w={{ base: "80%", md: "45%", sm: "100%" }}
            align={["center", "center", "flex-start", "flex-start"]}
            justifyContent="center"
          >
            <Heading
              as="h1"
              size={{base: "xl", sm: "lg", xs: "sm"}}
              fontWeight="bold"
              color="primary.800"
              textAlign={["center", "center", "left", "left"]}
            >
              Bienvenido a Elca Telecomunicaciones
            </Heading>
            <Heading
              as="h2"
              size="md"
              color="primary.800"
              opacity="0.8"
              fontWeight="normal"
              lineHeight={1.5}
              textAlign={["center", "center", "left", "left"]}
            >
              Bienvenido a Elca Telecomunicaciones
            </Heading>
          </Stack>
          <Box
            filter='auto'
            brightness='90%'
            pb="20px"
            w={{ base: "80%", sm: "100%", md: "50%" }}
            mb={{ base: 12, md: 0 }}
          >
            <img
              src={principalImage}
              alt="imagen-principal"
              size="100%"
              className="banner"
              shadow="2xl"
              width={{ sm: '100%'}}
            />
          </Box>
        </Flex>
        <Box>
          <Footer />
        </Box>
      </Box>
    </Box>
    </>
    );
  }