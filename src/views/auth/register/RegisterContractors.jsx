import React, {useState} from "react";
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
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";

export default function RegisterContractors(){
    const textColor = useColorModeValue("navy.800", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");
    let navigate = useNavigate();
    const [type, setType] = useState("");
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const userData = sessionStorage.getItem("tk");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(type, name);
 }

  const config = {
    headers: { Authorization: `Bearer ${userData}` }
  };

 const addPosts = (type, name) => {
  axios.post('http://localhost:8000/api/contractors/create', {
    type: type,
    name: name,
    config
  })
  .then((response) => {
    setData([response.data, ...data]);
    console.log('funciono')
    Swal.fire({
      title:'¡Bienvenido!',
      text:'Haz ingresado exitosamente al sistema',
      icon: 'success',
      confirmButtonText:'Continuar'
    })
  })
  .catch(error => {
    console.log(error.response.data.error)
    Swal.fire({
      title: '¡Error!',
      text: 'Revisa los datos ingresados y vuelve a intentarlo',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
  });
  setType('');
  setName('');
 }

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
              <form onSubmit={handleSubmit}>
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
                  type='text'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  id="name"
                  autoComplete="off"
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
                  type='text'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  name="type"
                  id="type"
                  autoComplete="off"
                />
                <Button
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                  type="submit">
                  Registrar
                </Button>
              </form>
              </FormControl>
            </Flex>
          </Flex>
        </AuthLayout>
      );
}