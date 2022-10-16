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
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import { useParams } from "react-router-dom";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { getChargesById } from "../../../api/auth-request";
import axios from "axios";

export default function EditCharge(){
    const {id} = useParams();
    console.log(id)
  const textColor = useColorModeValue("navy.800", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let navigate = useNavigate();
  const [type, setType] = useState("");
  const userData = sessionStorage.getItem("tk");
  const config = {headers: { Authorization: `Bearer ${userData}` }};

    useEffect( () => {
        getChargeByIdData(id); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getChargeByIdData = async (id) => {
        const res = await getChargesById(id)
        setType(res.data.charges.type)
        console.log(res)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editCharge(type);
    }

    const sendData = {
        type: type
    }


  const editCharge = () => {
    axios.put(`http://localhost:8000/api/charges/update/${id}`, sendData , config)
    .then((response) => {
      Swal.fire({
        title:'Se ha modificado correctamente el cargo!',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
    })
    .catch(error => {
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
          Modificar cargo
        </Heading>
        <Text
          mb='36px'
          ms='4px'
          color={textColorSecondary}
          fontWeight='400'
          fontSize='md'>
          Modifique los datos necesarios para poder guardar el cargo!
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
            value={type}
            onChange={(e) => setType(e.target.value)}
            name="name"
            id="name"
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