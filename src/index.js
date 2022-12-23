import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import "./style/App.css";
import theme from './layouts/themes/theme';
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
        <App />
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>
);

