import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  FormHelperText
} from "@chakra-ui/react";
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import illustration from "../../../assets/auth/principal-image.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
import {AuthContext} from '../../../contexts/authContext';


function SignIn() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {signIn} = useContext(AuthContext);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsLoading(true);
    addPosts(formValues.email, formValues.password)
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "¡El correo es requerido!";
    } else if (!regex.test(values.email)) {
      errors.email = "El correo no es valido";
    }
    if (!values.password) {
      errors.password = "¡La contraseña es requerida!";
    } else if (values.password.length < 4) {
      errors.password = "!La contraseña debe poseer mas de 4 digitos¡";
    }
    return errors;
  };

 const addPosts = (email, password) => {
  axios.post('http://localhost:8000/api/login', {
    email: email,
    password: password,
  })
  .then((response) => {
    sessionStorage.setItem("userData", JSON.stringify(response.data.user));
    signIn(response.data.authorization.token);
    setPosts([response.data, ...posts]);
    Swal.fire({
      title:'¡Bienvenido!',
      text:'Haz ingresado exitosamente al sistema',
      icon: 'success',
      confirmButtonText:'Continuar'
    })
    setIsLoading(false);
    if(response?.data.user.id_role === 1){
      navigate('/admin');
    }else{
      navigate("/profile");
    }
  })
  .catch(error => {
    setIsLoading(false);
    Swal.fire({
      title: '¡Error!',
      text: 'Revisa los datos ingresados y vuelve a intentarlo',
      icon: 'error',
      confirmButtonText: 'Continuar'
    })
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
            Iniciar sesión
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Introduce tu correo electrónico y tu contraseña para iniciar sesión!
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
                Correo
                <Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                variant='auth'
                fontSize='sm'
                ms={{ base: "0px", md: "0px" }}
                placeholder='ejemplo@gmail.com'
                fontWeight='500'
                size='lg'
                value={formValues.email}
                onChange={handleChange}
                name="email"
                id="email"
                autoComplete="off"
              />
              <FormHelperText style={{color:'#d32222'}}>{formErrors.email}</FormHelperText>
            </Box>
            <Box mb='20px'>
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Contraseña
              <Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                fontSize='sm'
                size='lg'
                value={formValues.password}
                onChange={handleChange}
                type={show ? "text" : "password"}
                variant='auth'
                name="password"
                id="password"
                autoComplete="off"
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={handleClick}
                  />
                </InputRightElement>
              </InputGroup>
              <FormHelperText style={{color:'#d32222'}}>{formErrors.password}</FormHelperText>
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
                Iniciar sesión
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
              Iniciar sesión
            </Button>
            )}
          </form>
          </FormControl>
        </Flex>
      </Flex>
    </AuthLayout>
  );
}

export default SignIn;
