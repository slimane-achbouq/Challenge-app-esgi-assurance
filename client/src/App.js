import './App.css';

import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import LoginVerificationPage from './pages/LoginVerificationPage';
import Logout from "./pages/Logout";
import ResetPassword from './pages/ResetPassword';
import InputResetPassword from './pages/InputResetPassword';
import {CurrentUserProvider} from "./contexts/currentUserContext";

import {
    BrowserRouter,
    Routes,
    Route,
}
    from 'react-router-dom';


function App() {
  return (
      <CurrentUserProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<LoginPage/>}></Route>
            <Route exact path="/signup" element={<SignUp/>}></Route>
            <Route exact path="/login-verification/:jwt/:id" element={<LoginVerificationPage/>}></Route>
            <Route exact path="/logout" element={<Logout/>}></Route>
            <Route exact path="/reset-password" element={<ResetPassword/>}></Route>
            <Route exact path="/reset-password-confirmation/:token" element={<InputResetPassword/>}></Route>
          </Routes>
        </BrowserRouter>
      </CurrentUserProvider>
  );

}

export default App;
