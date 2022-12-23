// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";

// Custom Components
import { SidebarResponsive } from "./sidebar/Sidebar";
import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
// Assets

import { MdNotificationsNone } from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaAccusoft, FaEthereum } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from "axios";
// import routes from "routes.js";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const userTk = sessionStorage.getItem("tk");
  const config = {headers: { Authorization: `Bearer ${userTk}` }};
  const { colorMode, toggleColorMode } = useColorMode();
  const userData =  JSON.parse(sessionStorage.getItem("userData"));
  
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  let navigate = useNavigate();
  const [exist, setExist] = useState(false);

  const profile = async () => {
    navigate('/profile');
  }


    useEffect(() => {
    const checkToken = async () => {
        let userToken;
        try {
        userToken = window.sessionStorage.getItem("tk");
        if(userToken !== null){
            setExist(true)
        }else{
            setExist(false)
        }
        }
        catch(e) {
        console.log(e)
        }
    }
    checkToken();
    }, [])

  const handleLogOut = () => {
    axios.post("http://localhost:8000/api/logout", { } , config)
    .then((response) => {
      console.log(response)
      Swal.fire({
        title:'Sesión finalizada',
        icon: 'success',
        confirmButtonText:'Continuar'
      })
      setExist(false);
      sessionStorage.removeItem('tk');
      sessionStorage.removeItem('userData');
      navigate('/');
      window.location.reload(false);
    })
    .catch(error => {
      console.log(error.response)
      Swal.fire({
        title: '¡Error!',
        text: 'No se ha podido cerrar la sesión',
        icon: 'error',
        confirmButtonText: 'Continuar'
      })
    });
  }

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      pl='20px'
      pr='20px'
      borderRadius='30px'
      boxShadow={shadow}>
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'>
        <Flex
          align='center'
          justify='center'
          bg={ethBox}
          h='29px'
          w='29px'
          borderRadius='30px'
          me='7px'>
          <Icon color={ethColor} w='9px' h='14px' as={FaAccusoft} />
        </Flex>
        <Text
          w='max-content'
          color={ethColor}
          fontSize='sm'
          fontWeight='700'
          me='6px'>
          1,924
          <Text as='span' display={{ base: "none", md: "unset" }}>
            {" "}
            ETH
          </Text>
        </Text>
      </Flex>
      <SidebarResponsive />
      <Button
        variant='no-hover'
        bg='transparent'
        p='0px'
        minW='unset'
        minH='unset'
        h='18px'
        w='max-content'
        onClick={toggleColorMode}>
        <Icon
          me='10px'
          h='18px'
          w='18px'
          color={navbarIcon}
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p='0px'>
          <Avatar
            _hover={{ cursor: "pointer" }}
            color='white'
            name={userData.name}
            bg='#11047A'
            size='sm'
            w='40px'
            h='40px'
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p='0px'
          mt='10px'
          borderRadius='20px'
          bg={menuBg}
          border='none'>
          <Flex w='100%' mb='0px'>
            <Text
              ps='20px'
              pt='16px'
              pb='10px'
              w='100%'
              borderBottom='1px solid'
              borderColor={borderColor}
              fontSize='sm'
              fontWeight='700'
              color={textColor}>
              👋&nbsp; {userData.name} {userData.lastname}
            </Text>
          </Flex>
          <Flex flexDirection='column' p='10px'>
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color='red.400'
              borderRadius='8px'
              px='14px'
              onClick={() => handleLogOut()}>
                Cerrar sesión
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
