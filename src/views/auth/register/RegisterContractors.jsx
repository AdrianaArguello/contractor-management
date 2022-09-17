import React from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";

export default function RegisterContractors(){
    const textColor = useColorModeValue("navy.800", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");

    return (
        <AuthLayout illustrationBackground={illustration} image={illustration}>
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w='100%'
            mx={{ base: "auto", lg: "0px" }}
            me='auto'
            h='100%'
            alignItems='start'
            justifyContent='center'
            mb={{ base: "30px", md: "60px" }}
            px={{ base: "25px", md: "0px" }}
            mt={{ base: "40px", md: "14vh" }}
            flexDirection='column'>
            <Box me='auto'>
              <Heading color={textColor} fontSize='36px' mb='10px'>
                Registro de contratista
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Ingresa los datos necesarios para poder registrar la contratista!
              </Text>
            </Box>
            <Flex
              zIndex='2'
              direction='column'
              w={{ base: "100%", md: "420px" }}
              maxW='100%'
              background='transparent'
              borderRadius='15px'
              mx={{ base: "auto", lg: "unset" }}
              me='auto'
              mb={{ base: "20px", md: "auto" }}>
              <FormControl>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Nombre<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Tipo<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='email'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                />
                <Button
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'>
                  Registrar
                </Button>
              </FormControl>
            </Flex>
          </Flex>
        </AuthLayout>
      );
}