import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar,NavBarDoctor } from "./components";
import { Login , ListPatient,UserDetails,ListDoctors,DoctorDetails,Dashboard,Home } from "./screens";
import {getCurrentUser} from './AuthService'  
import React, { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(false);
  
  useEffect(() => {
    const getUser = async () => {
      setUser(await getCurrentUser());
    };
    getUser();
    console.log(user);
  }, []);   

  return (
    
    <>
      <Router>
        {!user || window.location.pathname == "/login"? <NavBar /> : <NavBarDoctor/>}
        <Routes>
          <Route path="/" element={<Home/>} exact/>
          <Route path="/login" element={<Login />} exact />
          <Route path="/admin/list/patients" element={<ListPatient/>} exact/>
          <Route path="/admin/patientdetails/:id" element={<UserDetails/>} exact/>
          <Route path ="/admin/list/doctors" element={<ListDoctors/>} exact/>
          <Route path="/admin/doctordetails/:id" element={<DoctorDetails/>} exact/>
          <Route path="/admin/dashboard" element={<Dashboard/>} exact/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
