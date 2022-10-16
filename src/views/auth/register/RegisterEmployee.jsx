import React, {useState, useEffect} from "react";

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
  useColorModeValue,
  Select
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import Swal from 'sweetalert2'
import axios from "axios";
import { getCharges, getAllContractors, getRoles } from "../../../api/auth-request"

export default function RegisterEmployee(){
    const textColor = useColorModeValue("navy.800", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [charges, setCharges] = useState("")
    const [contractors, setContractors] = useState("");
    const [roles, setRoles] = useState("");
    // const [startDate, setStartDate] = useState(new Date());
    const genders = [
      {'value': 'Mujer'},
      {'value': 'Hombre'}
    ];
    const userData = sessionStorage.getItem("tk");
    const config = {headers: { Authorization: `Bearer ${userData}` }};

    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [charge, setCharge] = useState("");
    const [contractor, setContractor] = useState("");
    const [role, setRole] = useState("");
    const [identification, setIdentification] = useState("");
    // const [dateBirth, setdateBirth] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [gender, setGender] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      addPosts(name, lastname, email, password, charge, contractor, role, identification, startDate, gender, phone, address);
    }

    useEffect( () => {
      getChargesData();
      getAllContractorsData();
      getAllRolesData();
    },[]);

    const getChargesData = async () => {
      const res = await getCharges();
      if(res !== null && res !== undefined){
        setCharges(res)
      }
    }

    const getAllContractorsData = async () => {
      const res = await getAllContractors();
      if(res !== null && res !== undefined){
        setContractors(res.contractors)
      }
    }
    
    const getAllRolesData = async () => {
      const res = await getRoles();
      console.log('roles', res)
      if(res !== null && res !== undefined){
        setRoles(res)
      }
    }
    
    const handleTypeSelect = e => {
      setCharge(e.target.value);
    };

    const handleTypeSelectContractor = e => {
      setContractor(e.target.value);
    };

    const handleTypeSelectRoles = e => {
      setRole(e.target.value);
    }

    const handleTypeGender = e => {
      setGender(e.target.value);
    };
    
    console.log(contractor)

    const sendData = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      id_charge: charge,
      id_contractor: contractor,
      id_role: role,
      identification: identification,
      date_birth: startDate,
      gender: gender,
      phone: phone,
      address: address
    }

    
    const addPosts = () => {
      axios.post('http://localhost:8000/api/register', sendData , config)
      .then((response) => {
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
      setName('');
      setLastname('');
      setEmail('');
      setPassword('');
      setCharge('')
      setContractor('')
      setRole('')
      setIdentification('');
      setStartDate('');
      setGender('');
      setPhone('');
      setAddress('');
     }

    return (
        <AuthLayout illustrationBackground={illustration} image={illustration}>
          <Flex
            maxW={{ base: "100%", md: "max-content" }}
            w='100%'
            mx={{ base: "auto", lg: "0px" }}
            me='auto'
            h='auto'
            alignItems='start'
            justifyContent='center'
            mb={{ base: "30px", md: "60px" }}
            px={{ base: "25px", md: "0px" }}
            mt={{ base: "10px", md: "5vh" }}
            flexDirection='column'>
            <Box me='auto'>
              <Heading color={textColor} fontSize='36px' mb='10px'>
                Registro de empleado
              </Heading>
              <Text
                mb='36px'
                ms='4px'
                color={textColorSecondary}
                fontWeight='400'
                fontSize='md'>
                Ingresa los datos necesarios para poder registrar al empleado!
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
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  onChange={(e) => setName(e.target.value)}
                  fontWeight='500'
                  size='md'
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Apellido<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='md'
                  onChange={(e) => setLastname(e.target.value)}
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'
                  >
                  Cedula<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => setIdentification(e.target.value)}
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Correo<Text color={brandStars}>*</Text>
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
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Fecha de nacimiento<Text color={brandStars}>*</Text>
                </FormLabel>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Genero <Text color={brandStars}>*</Text>
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
                  onChange={handleTypeGender}
                  placeholder='Seleccione una opción'>
                  {genders?.length > 0 ? genders.map((gender, index) =>
                    <option value={gender.value} key={index}>
                      {gender.value}
                    </option>
                  ): ''}
                </Select>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Telefono<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Dirección<Text color={brandStars}>*</Text>
                </FormLabel>
                <Input
                  isRequired={true}
                  variant='auth'
                  fontSize='sm'
                  ms={{ base: "0px", md: "0px" }}
                  type='text'
                  placeholder='mail@simmmple.com'
                  mb='24px'
                  fontWeight='500'
                  size='lg'
                  onChange={(e) => setAddress(e.target.value)}
                />
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Cargo <Text color={brandStars}>*</Text>
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
                  onChange={handleTypeSelect}
                  placeholder='Seleccione una opción'>
                  {charges?.length > 0 ? charges.map((type, index) =>
                    <option value={type.id} key={index}>
                      {type.type}
                    </option>
                  ): ''}
                </Select>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Contratista <Text color={brandStars}>*</Text>
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
                  onChange={handleTypeSelectContractor}
                  placeholder='Seleccione una opción'>
                  {contractors?.length > 0 ? contractors.map((contractor, index) =>
                    <option value={contractor.id} key={index}>
                      {contractor.name}
                    </option>
                  ): ''}
                </Select>
                <FormLabel
                  display='flex'
                  ms='4px'
                  fontSize='sm'
                  fontWeight='500'
                  color={textColor}
                  mb='8px'>
                  Rol <Text color={brandStars}>*</Text>
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
                  onChange={handleTypeSelectRoles}
                  placeholder='Seleccione una opción'>
                  {roles?.length > 0 ? roles.map((roles, index) =>
                    <option value={roles.id} key={index}>
                      {roles.type}
                    </option>
                  ): ''}
                </Select>
                <Button
                  fontSize='sm'
                  variant='brand'
                  fontWeight='500'
                  w='100%'
                  h='50'
                  mb='24px'
                  type="submit"
                  >
                  Registrar Empleado
                </Button>
                </form>
              </FormControl>
            </Flex>
          </Flex>
        </AuthLayout>
      );
}