import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import React from "react";
import Card from "./Card"

export default function ColumnsTable(props) {

  return (
    <Card
    direction='column'
    w='100%'
    px='0px'
    overflowX={{ sm: "scroll", lg: "hidden" }}>
    <TableContainer>
    <Table variant='simple' color='gray.500' mb='24px' borderRadius='30px'>
      <Thead>
        <Tr>
          <Th align='center'
        fontSize={{ sm: "10px", lg: "12px" }}
        color='gray.400'>Contratistas</Th>
          <Th align='center'
        fontSize={{ sm: "10px", lg: "12px" }}
        color='gray.400'>N. Empleados</Th>
          <Th align='center'
        fontSize={{ sm: "10px", lg: "12px" }}
        color='gray.400'>Reportes</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>inches</Td>
          <Td>millimetres (mm)</Td>
          <Td isNumeric>25.4</Td>
        </Tr>
        <Tr>
          <Td>feet</Td>
          <Td>centimetres (cm)</Td>
          <Td isNumeric>30.48</Td>
        </Tr>
        <Tr>
          <Td>yards</Td>
          <Td>metres (m)</Td>
          <Td isNumeric>0.91444</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
    </Table>
    </TableContainer>
    </Card>
  );
}
