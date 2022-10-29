import '../../style/shared.css';
import {
  Text,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';

function Logo(){
  return(
    <>
      <Text
      textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
      fontFamily={'heading'}
      color={useColorModeValue('gray.800', 'white')}>
        <h4 className="title">ELCA</h4>
        <h5 className="subtitle">Telecomunicaciones</h5>
      </Text>
    </>
  )
}

export default Logo;