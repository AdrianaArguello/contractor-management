import React, {useState} from "react";
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
  FormControl,
  FormHelperText,
} from "@chakra-ui/react";
// Custom components
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import { useParams } from "react-router-dom";
// Assets
import illustration from "../../../assets/dashboards/Debit.png";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";

// export default function RegisterRates(){
//     const {id} = useParams();
//     console.log(id)
//   const textColor = useColorModeValue("navy.800", "white");
//   const textColorSecondary = "gray.400";
//   const brandStars = useColorModeValue("brand.500", "brand.400");
//   let navigate = useNavigate();
//   const [type, setType] = useState("");
//   const [rates, setRates] = useState("");
//   const userData = sessionStorage.getItem("tk");
//   const config = {headers: { Authorization: `Bearer ${userData}` }};

//   useEffect( () => {
//     getAllPeriodsData();
//   },[]);

//   const getAllPeriodsData = async () => {
//     const res = await getAllPeriods();
//     if(res !== null && res !== undefined){
//       setRates(res.period)
//     }
//   }

//   console.log(rates)

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addPosts(type);
//   }

//   const sendData = {
//     salary: type,
//     id_period: id
//   }

//   const addPosts = () => {
//     axios.post('http://localhost:8000/api/rate/create', sendData , config)
//     .then((response) => {
//       Swal.fire({
//         title:'Se ha registrado correctamente!',
//         icon: 'success',
//         confirmButtonText:'Continuar'
//       })
//     })
//     .catch(error => {
//       console.log(error.response.data.error)
//       Swal.fire({
//         title: '¡Error!',
//         text: 'No se ha podido registrar correctamente la contratista',
//         icon: 'error',
//         confirmButtonText: 'Continuar'
//       })
//     });
//   setType('');
//  }

//  const goBack = async () => {
//   navigate('/Admin');
//  }

// return (
//   <AuthLayout illustrationBackground={illustration} image={illustration}>
//     <Flex 
//       maxW={{ base: "100%", md: "max-content" }}
//       w='100%'
//       mx={{ base: "auto", lg: "0px" }}
//       me='auto'
//       h='100%'
//       alignItems='start'
//       justifyContent='center'
//       mb={{ base: "30px", md: "60px" }}
//       px={{ base: "25px", md: "0px" }}
//       mt={{ base: "40px", md: "14vh" }}
//       flexDirection='column'>
//       <Box me='auto'>
//         <Heading color={textColor} fontSize='36px' mb='10px'>
//           Registro de tarifa
//         </Heading>
//         <Text
//           mb='36px'
//           ms='4px'
//           color={textColorSecondary}
//           fontWeight='400'
//           fontSize='md'>
//           Ingresa los datos necesarios para poder registrar la contratista!
//         </Text>
//       </Box>

//       <Flex
//         zIndex='2'
//         direction='column'
//         w={{ base: "100%", md: "420px" }}
//         maxW='100%'
//         background='transparent'
//         borderRadius='15px'
//         mx={{ base: "auto", lg: "unset" }}
//         me='auto'
//         mb={{ base: "20px", md: "auto" }}>
//         <form onSubmit={handleSubmit}>
//           <FormLabel
//             display='flex'
//             ms='4px'
//             fontSize='sm'
//             fontWeight='500'
//             color={textColor}
//             mb='8px'>
//             Salario<Text color={brandStars}>*</Text>
//           </FormLabel>
//           <Input
//             isRequired={true}
//             variant='auth'
//             fontSize='sm'
//             ms={{ base: "0px", md: "0px" }}
//             type='number'
//             mb='24px'
//             fontWeight='500'
//             size='lg'
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//             name="name"
//             id="name"
//             autoComplete="off"
//           />
//           <Button
//             fontSize='sm'
//             variant='brand'
//             fontWeight='500'
//             w='100%'
//             h='50'
//             mb='24px'
//             type="submit">
//             Guardar
//           </Button>
//         </form>
//           <Button
//             fontSize='sm'
//             variant='brand'
//             fontWeight='500'
//             w='100%'
//             h='50'
//             mb='24px'
//             onClick={() => goBack()}>
//             Volver
//           </Button>
//       </Flex>
//     </Flex>
//   </AuthLayout>
//   );
// }

export default function RegisterRates() {
  const {id} = useParams();
  const initialValues = { rates: ''};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userData = sessionStorage.getItem("tk");
  const config = {headers: { Authorization: `Bearer ${userData}` }};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsLoading(true);
    addPosts(formValues.rates)
  };

  const validate = (values) => {
    const errors = {};
    if (!values.rates) {
      errors.rates = "¡El correo es requerido!";
    }
    return errors;
  };

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  let navigate = useNavigate();

  const addPosts = (rates) => {
    axios.post('http://localhost:8000/api/rate/create', {
      salary: rates,
      id_period: id
    }, config)
    .then((response) => {
      setIsLoading(true)
      Swal.fire({
        title:'Se ha registrado correctamente!',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
      setIsLoading(false)
      navigate('/admin');
    })
    .catch(error => {
      Swal.fire({
        title: '¡Error!',
        text: 'No se ha podido registrar correctamente la contratista',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
      setIsLoading(false)
    });
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
            Introduce la tarifa del periodo correspondiente
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
            <Box mb='20px'>
              <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                  Tarifa<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                fontWeight='500'
                size='lg'
                value={formValues.rates}
                onChange={handleChange}
                name="rates"
                id="rates"
                autoComplete="off"
              />
              <FormHelperText style={{color:'#d32222'}}>{formErrors.rates}</FormHelperText>
            </Box>
            {!isLoading ? (
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
            ) : (
              <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              isLoading
              loadingText='Iniciando sesión'
              colorScheme='teal'
              spinnerPlacement='start'>
              Guardando
            </Button>
            )}
          </form>
          </FormControl>
        </Flex>
      </Flex>
    </AuthLayout>
  );
}