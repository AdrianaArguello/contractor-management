import React, {useEffect, useReducer} from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import "./style/App.css"
import theme from './layouts/themes/theme'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from './contexts/authContext';
import { Spinner } from '@chakra-ui/react'
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
import AdminDashboard from './views/dashboard/admin/Admin';
import Profile from './views/profile/Profile';
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import SignIn from './views/auth/signIn/SignIn';


export default function App() {
  const initialLoginState = {
    token: null
  }

  const loginReducer = (prevState, action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          token: action.token
        }
      case 'LOGIN':
        return {
          ...prevState,
          token: action.token
        }
      case 'LOGOUT':
        return {
          ...prevState,
          token: action.token
        }
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        try {
          window.localStorage.setItem("tk", data);
        }
        catch(e) {
          console.log(e)
        }
        dispatch({type: 'LOGIN', token: data});
      },
      signOut: () => {
        window.localStorage.removeItem("tk");
        dispatch({type: 'LOGOUT', token: null});
      }
    }),
    []
  );

  useEffect(() => {
    const checkToken = async () => {
      let userToken;
      try {
        userToken = window.localStorage.getItem("tk");
      }
      catch(e) {
        console.log(e)
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    }
    checkToken();
  }, [])


  return (
    <ChakraProvider theme={theme}>
      <React.StrictMode>
      <ThemeEditorProvider>
       {
        (loginState.isLoading) ? <>
        <div style={{
            position: 'absolute',
            display: 'block',
            top: '50%',
            left: '50%',
          }}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'/>
          </div>
          </> :
          <>
          <AuthContext.Provider value={authContext}>
            <BrowserRouter>
              <Routes>
                {
                  (loginState.token === null) ? <>
                    <Route path="/" element={<Landing />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route
                      path="*"
                      element={
                        <main style={{ padding: "1rem" }}>
                          <p>There's nothing here!</p>
                        </main>
                      } />
                  </> : <>
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
                  </>
                }
              </Routes>
            </BrowserRouter>
          </AuthContext.Provider>
          </>
      }
      </ThemeEditorProvider>
      </React.StrictMode>
    </ChakraProvider>
  );
}
