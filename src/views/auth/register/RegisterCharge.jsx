import React, {useState, useEffect} from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
  useColorModeValue,
  FormControl,
  Select
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
import { getCharges } from "../../../api/auth-request"

export default function RegisterCharge(){
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [chargesdata, setCharges] = useState([]);
  const [existCharges, setChargesExists] = useState([]);
  const charges = [
    {'value': 'Supervisor'},
    {'value': 'Vigilante'},
    {'value': 'Coordinador'},
    {'value': 'Fontanero'}
  ];

  useEffect( () => {
    getChargesData();
  },[]);

  const handleChange = (e) => {
    setCharges(e.target.value)
  };

  const getChargesData = async () => {
    const res = await getCharges();
    if(res !== null && res !== undefined){
      setChargesExists(res)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    addPosts(chargesdata)
  };

  const textColor = useColorModeValue("navy.800", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let navigate = useNavigate();
  const userData = sessionStorage.getItem("tk");
  const config = {headers: { Authorization: `Bearer ${userData}` }};

  const addPosts = (type) => {
    axios.post('http://localhost:8000/api/charges/create', {
      type: type
    }, config)
    .then((response) => {
      setPosts([response.data, ...posts]);
      Swal.fire({
        title:'Se ha registrado correctamente!',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
      setIsLoading(false);
      navigate('/Admin');
    })
    .catch(error => {
      setIsLoading(false);
      Swal.fire({
        title: '¡Error!',
        text: 'No se ha podido registrar correctamente la contratista',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    });
 }

 const goBack = async () => {
  navigate('/Admin');
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
          Registro de cargo
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
            <Box mb='24px'>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Nombre<Text color={brandStars}>*</Text>
            </FormLabel>
            <Select 
              isRequired={true}
              id="id_charge"
              name="id_charge"
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              mb='24px'
              fontWeight='500'
              size='lg'
              autoComplete="off"
              onChange={handleChange}
              placeholder='Seleccione una opción'>
              {charges?.length > 0 ? charges.map((charges, index) =>
                <option value={charges.value} key={index}>
                  {charges.value}
                </option>
              ): ''}
            </Select>
            </Box>
            {!isLoading ? (
                <Button
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                  type="submit"
                  background="#5d77a4">
                  Registrar
                </Button>
              ) : (
                <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                mb='24px'
                background="#5d77a4"
                isLoading
                loadingText='Iniciando sesión'
                colorScheme='teal'
                spinnerPlacement='start'>
                Registrando cargo
              </Button>
              )}
          </form>
        </FormControl>
          <Button
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'
            onClick={() => goBack()}>
            Volver
          </Button>
      </Flex>
    </Flex>
  </AuthLayout>
  );
}