import { extendTheme } from "@chakra-ui/react";
import { buttonStyles } from "./components/button";
import { inputStyles } from "./components/input";
import { breakpoints } from "./foundations/breakpoints";
import { globalStyles } from "./styles";
import { CardComponent } from "./additions/card/card"

export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  buttonStyles, // button styles
  inputStyles,
  CardComponent
);
