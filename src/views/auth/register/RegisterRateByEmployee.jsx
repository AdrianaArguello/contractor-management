import React, {useState, useEffect} from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  Select
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import { useParams } from "react-router-dom";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { getAllPeriods, getAllRates } from '../../../api/auth-request';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";

export default function RegisterRatesByEmployee(){
    const {id} = useParams();
    console.log(id)
  const textColor = useColorModeValue("navy.800", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let navigate = useNavigate();
  const [type, setType] = useState("");
  const [rates, setRates] = useState("");
  const userData = sessionStorage.getItem("tk");
  const config = {headers: { Authorization: `Bearer ${userData}` }};

  useEffect( () => {
    // getAllPeriodsData();
    getAllRatesData();
  },[]);

//   const getAllPeriodsData = async () => {
//     const res = await getAllPeriods();
//     if(res !== null && res !== undefined){
//       setRates(res.period)
//     }
//   }

    const handleTypeSelect = e => {
        setType(e.target.value);
        console.log(type)
    };

  const getAllRatesData = async () => {
    const res = await getAllRates();
    if(res !== null && res !== undefined){
      setRates(res.rate)
    }
  }

  console.log(rates)

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(type);
  }

  const sendData = {
    id_employees: id,
    id_rates: type,
  }

  const addPosts = () => {
    axios.post('http://localhost:8000/api/employeesRates/create', sendData , config)
    .then((response) => {
      Swal.fire({
        title:'Se ha registrado correctamente!',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
    })
    .catch(error => {
      console.log(error.response.data.error)
      Swal.fire({
        title: '¡Error!',
        text: 'No se ha podido registrar correctamente la contratista',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    });
  setType('');
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
          Registro de tarifa
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
        <form onSubmit={handleSubmit}>
        <FormLabel
            display='flex'
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'>
            Salario<Text color={brandStars}>*</Text>
          </FormLabel>
          <Select 
            isRequired={true}
            id="type"
            name="type"
            fontSize='sm'
            ms={{ base: "0px", md: "0px" }}
            mb='24px'
            fontWeight='500'
            size='lg'
            autoComplete="off"
            onChange={handleTypeSelect}
            placeholder='Seleccione una opción'>
              {rates.length > 0 ? rates.map((rates, index) =>
              <option value={rates.id} key={index}>
                {rates.salary}
              </option>
            ) : ''}
          </Select>
          <Button
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mb='24px'
            type="submit">
            Guardar
          </Button>
        </form>
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