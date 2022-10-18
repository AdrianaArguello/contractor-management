// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "./Card";
import React from "react";
import Information from "./Information";

// Assets
export default function GeneralInformation(props) {
  const { user } = props;
  console.log(user);
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} >
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        Información general
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
        Dirección: {user?.employee?.address}
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='N° telefónico'
          value={user?.employee.phone}
        />
        <Information
          boxShadow={cardShadow}
          title='Email'
          value={user?.employee.email}
        />
        <Information
          boxShadow={cardShadow}
          title='Identificación'
          value={user?.employee.identification}
        />
        <Information
          boxShadow={cardShadow}
          title='Género'
          value={user?.employee.gender}
        />
        <Information
          boxShadow={cardShadow}
          title='Contratista'
          value={user?.contractor.name}
        />
        <Information
          boxShadow={cardShadow}
          title='Fecha cumpleaños'
          value={user?.employee.date_birth}
        />
      </SimpleGrid>
    </Card>
  );
}
