import React, { useState } from "react";
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
} from "@chakra-ui/react";
import AuthLayout from "../../../layouts/themes/auth-layout/auth-layout";
import illustration from "../../../assets/auth/principal-image.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(email, password);
 }

 const addPosts = (email, password) => {
  axios.post('http://localhost:8000/api/login', {
    email: email,
    password: password,
  })
  .then((response) => {
    setPosts([response.data, ...posts]);
    sessionStorage.setItem("tk", response.data.authorization.token);
    sessionStorage.setItem("userData", JSON.stringify(response.data.user));
    Swal.fire({
      title:'¡Bienvenido!',
      text:'Haz ingresado exitosamente al sistema',
      icon: 'success',
      confirmButtonText:'Continuar'
    })
    var existToken = sessionStorage.getItem("tk");
    if(existToken){
      navigate('/admin');
    }
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
  setEmail('');
  setPassword('');
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
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='email'
              placeholder='mail@simmmple.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              id="email"
              autoComplete="off"
            />
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
                isRequired={true}
                value={password}
                fontSize='sm'
                placeholder='Min. 8 characters'
                mb='24px'
                size='lg'
                onChange={(e) => setPassword(e.target.value)}
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
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              type="submit"
              background="#5d77a4">
              Iniciar sesión
            </Button>
          </form>
          </FormControl>
        </Flex>
      </Flex>
    </AuthLayout>
  );
}

export default SignIn;
