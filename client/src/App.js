import './App.scss';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Question from './components/Question';
import AdminLogin from './components/Admin-login';
import AdminSignUp from './components/Admin-signup';
import UserLogin from './components/User-login';
import UserSignUp from './components/User-signup';
import Subjects from './components/Subjects';
import Result from './components/Result';
import LandingPage from './components/Landing-page';
import  axios  from 'axios';
import { useState } from 'react';
import CreateQuestion from './components/CreateQuestion';

function App() {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

  const fetchData = () => {
  const configuration =  {
    method: 'POST',
    url: 'http://localhost:5000/api/user/login',
    data: {
      email,
      password
    }
  }
  axios(configuration)
  .then((result) => {
    const token = result.data.token;
    console.log(result.data.user.firstName);
     console.log(result);
     console.log(token);
    })
  . catch ((error) => {
    console.log('Error logging in', error.response.data.message);
  }) 
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/question' element={<Question/>}></Route>
        <Route path='/admin/login' element={<AdminLogin/>}></Route>
        <Route path='/admin/signup' element={<AdminSignUp/>}></Route>
        <Route path='/user/login' element={<UserLogin/>}></Route>
        <Route path='/user/signup' element={<UserSignUp/>}></Route>
        <Route path='/subjects' element={<Subjects/>}></Route>
        <Route path='/result' element={<Result/>}></Route>
        <Route path='/newquestion' element={<CreateQuestion/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
