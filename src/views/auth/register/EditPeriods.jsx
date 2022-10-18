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
  Select
} from "@chakra-ui/react";
// Custom components
import DatePicker from "react-datepicker";
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { getPeriodsById } from "../../../api/auth-request";
import Swal from 'sweetalert2'
import axios from "axios";
import moment from 'moment'

export default function EditPeriods(){
    const {id} = useParams();
    console.log(id)
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
  const [tStartDate, setStartDate] = useState(new Date());
  const [tEndDate, setEndDate] = useState(new Date());

    useEffect( () => {
        getPeriodsByIdData(id); 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
  
    const getPeriodsByIdData = async (id) => {
        const res = await getPeriodsById(id)
        setType(res?.period?.status)
        const timeStampStartDate = Date.parse(res?.period.initial_date);
        const timeStampEndDate = Date.parse(res?.period.final_date);
        

        console.log(res?.period);
        console.log(timeStampStartDate);
        console.log(timeStampEndDate);
        console.log(moment(res?.period.initial_date).format('YYYY/MM/DD'));
        if(res?.period) {
          console.log(new Date(moment(res?.period.initial_date).format('YYYY/MM/DD')));

          setDateRange([
            new Date(moment(res?.period.initial_date).format('YYYY/MM/DD')), new Date(moment(res?.period.final_date).format('YYYY/MM/DD'))])
        }
        // setStartDate(res?.period.initial_date);
        // setEndDate(res?.period.final_date);
        // setType(res.data.charges.type)
    }

  const handleTypeSelect = e => {
    setType(e.target.value);
  };
  
    const handleSubmit = (e) => {
        e.preventDefault();
        // addPosts(type, startDate, endDate);
    }


    // const sendData = {
    //     initial_date: startDate?.toISOString().split('T')[0],
    //     final_date: endDate?.toISOString().split('T')[0],
    //     status: type
    // }

    // console.log('sendData',sendData);

    // const addPosts = () => {
    // axios.put( `http://localhost:8000/api/period/update/${id}`, sendData , config)
    // .then((response) => {
    //   Swal.fire({
    //     title:'Se ha registrado correctamente!',
    //     icon: 'success',
    //     confirmButtonText:'Continuar'
    //   })
    // })
    // .catch(error => {
    //   console.log(error.response.data.error)
    //   Swal.fire({
    //     title: '¡Error!',
    //     text: 'No se ha podido registrar correctamente la contratista',
    //     icon: 'error',
    //     confirmButtonText: 'Continuar'
    //   })
    // });
    // setType('');
    // setDateRange('');
    // }

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
          Modificar periodos
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
            value={type}
            onChange={handleTypeSelect}
            >
              {typesContractors.map((type, index) =>
              <option value={type.value} key={index}>
                {type.value}
              </option>
            )}
          </Select>
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