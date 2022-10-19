import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./style/App.css"
import theme from './layouts/themes/theme'
import SignIn from './views/auth/signIn/SignIn';

import AdminDashboard from './views/dashboard/admin/Admin';
import Profile from './views/profile/Profile';
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import RegisterContractors from './views/auth/register/RegisterContractors';
import RegisterEmployee from './views/auth/register/RegisterEmployee';
import AdminDashboardEmployee from './views/dashboard/admin/AdminEmployee';
import Reports from './views/reports/Reports';
import Landing from './views/landing/landing';
import RegisterCharge from './views/auth/register/RegisterCharge';
import EditContractors from './views/auth/register/EditContractors';
import EditCharge from './views/auth/register/EditCharge';
import RegisterPeriods from './views/auth/register/RegisterPeriods';
import EditPeriods from './views/auth/register/EditPeriods';
import RegisterRates from './views/auth/register/RegisterRates';
import EditRates from './views/auth/register/EditRates';
import RegisterRatesByEmployee from './views/auth/register/RegisterRateByEmployee';
import AdminEmployeeByContractor from './views/dashboard/admin/AdminEmployeeByContractor';
import EditEmployee from './views/auth/register/EditEmployee';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <ThemeEditorProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/admin" element={<AdminDashboard/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/registerContractor" element={<RegisterContractors/>} />
              <Route path="/editContractors/:id" element={<EditContractors/>} />
              <Route path="/registerEmployee" element={<RegisterEmployee/>} />
              <Route path="/registerCharge" element={<RegisterCharge/>}/>
              <Route path="/editCharges/:id" element={<EditCharge/>}/>
              <Route path='registerPeriods' element={<RegisterPeriods/>}/>
              <Route path='registerRates/:id' element={<RegisterRates/>}/>
              <Route path='editRates/:id' element={<EditRates/>}/>
              <Route path='/editPeriods/:id' element={<EditPeriods/>}/>
              <Route path="/adminEmployee" element={<AdminDashboardEmployee/>} />
              <Route path="/registerRatesByEmployee/:id" element={<RegisterRatesByEmployee/>} />
              <Route path="/adminEmployeeByContractor/:id" element={<AdminEmployeeByContractor/>} />
              <Route path="/editEmployee/:id" element={<EditEmployee/>}/>
              <Route path="/reports" element={<Reports/>} />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                } />
            </Routes>
          </BrowserRouter>
      </ThemeEditorProvider>
    </React.StrictMode>
  </ChakraProvider>
);

