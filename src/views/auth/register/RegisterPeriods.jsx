import React, {useState} from "react";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Text,
  useColorModeValue,
  Select
} from "@chakra-ui/react";
// Custom components
import DatePicker from "react-datepicker";
import '../../../style/App.css';
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";

export default function RegisterPeriods(){
  const textColor = useColorModeValue("navy.800", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let navigate = useNavigate();
  const [type, setType] = useState("");
  const userData = sessionStorage.getItem("tk");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const config = {headers: { Authorization: `Bearer ${userData}` }};
  const typesContractors = [
    {'value': 'Activo'},
    {'value': 'Inactivo'}
  ];
  

  const handleTypeSelect = e => {
    setType(e.target.value);
    console.log(type)
  };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        addPosts(type, startDate, endDate );
    }


    const sendData = {
        initial_date: startDate?.toISOString().split('T')[0],
        final_date: endDate?.toISOString().split('T')[0],
        status: type
    }

    const addPosts = () => {
    axios.post('http://localhost:8000/api/period/create', sendData , config)
    .then((response) => {
      Swal.fire({
        title:'Se ha registrado correctamente!',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
      navigate('/admin')
    })
    .catch(error => {
      console.log(error.response.data.error)
      Swal.fire({
        title: '¡Error!',
        text: 'No se ha podido registrar correctamente',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    });
  setType('');
  setDateRange('');
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
          Registro de tarifas
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
            Tipo<Text color={brandStars}>*</Text>
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
              {typesContractors.map((type, index) =>
              <option value={type.value} key={index}>
                {type.value}
              </option>
            )}
          </Select>
          <FormLabel
            display='flex'
            ms='4px'
            fontSize='sm'
            fontWeight='500'
            color={textColor}
            mb='8px'>
            Fecha del periodo<Text color={brandStars}>*</Text>
          </FormLabel>
          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => {
            setDateRange(update);
            }}
            dateFormat="yyyy/MM/dd"
            isClearable={true}
            />
          <Button
            fontSize='sm'
            variant='brand'
            fontWeight='500'
            w='100%'
            h='50'
            mt='20px'
            mb='24px'
            type="submit">
            Registrar
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