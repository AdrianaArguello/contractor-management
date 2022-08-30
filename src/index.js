import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./style/App.css"
import theme from './layouts/themes/theme'
import SignIn from './views/auth/signIn/signIn';

import AdminDashboard from './views/dashboard/admin/admin';
import Profile from './views/profile/profile';
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="/admin" element={<AdminDashboard/>} />
              <Route path="/profile" element={<Profile/>} />
            </Routes>
          </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>
);

