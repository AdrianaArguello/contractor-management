import '../../style/shared.css';
import {
  Box,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

function Logo(){
  return(
    <>
      <Box
        textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
        color={useColorModeValue('gray.800', 'white')}>
        <h4 className="title">ELCA</h4>
        <h5 className="subtitle">Telecomunicaciones</h5>
      </Box>
    </>
  )
}

export default Logo;