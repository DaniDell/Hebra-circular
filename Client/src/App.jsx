import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import CssBaseline from "@mui/material/CssBaseline";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Landing from "./Views/Landing";
import Login from "./Views/Login";
import Home from "./Views/Home";
import DetailUser from "./Views/DetailUser";
import UserProfile from "./Views/UserProfile";
import ReceptionMeasure from "./Views/ReceptionMeasure";
import DashHistoricalMeasure from "./Views/DashHistoricalMeasure";
import InformToPrint from "./Views/InformToPrint";
import AboutUs from "./Views/AboutUs";
import FeedbackForm from "./Views/FeedbackForm";
import Register from "./Views/Register";
import Calculate from "./Views/Calculate";
import ProtectedRoute from "./Components/Utils/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { checkAuthStatus } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.user.authorized);

  useEffect(() => {
    // Verificar el estado de autorización al cargar la aplicación
    dispatch(checkAuthStatus());
  }, [dispatch]);

  const user = authorized ? true : false;

  console.log("Valor de authorized:", authorized); // Añade este console.log

  const RedirectIfAuthenticated = ({ children }) => {
    return user ? <Navigate to="/perfil" /> : children;
  };

  return (
    <Router>
      <CssBaseline />

      <div style={{ width: "100vw", height: "100vh" }}>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/calculadora" element={<Calculate />} />
          <Route path="/registro" element={<Register />} />
          <Route
            path="/iniciar-sesion"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route path="/home" element={<Home user={user} />} />
          <Route path="/detalle/:id" element={<DetailUser />} />
          <Route path="/terminos-y-condiciones" element={<AboutUs />} />
          <Route path="/retroalimentacion" element={<FeedbackForm />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute
                canActivate={user}
                redirectPath="/iniciar-sesion"
                component={UserProfile}
              />
            }
          />
          <Route
            path="/recepcion"
            element={
              <ProtectedRoute
                canActivate={user}
                redirectPath="/iniciar-sesion"
                component={ReceptionMeasure}
              />
            }
          />
          <Route
            path="/historica"
            element={
              <ProtectedRoute
                canActivate={user}
                redirectPath="/iniciar-sesion"
                component={DashHistoricalMeasure}
              />
            }
          />
          <Route
            path="/informe"
            element={
              <ProtectedRoute
                canActivate={user}
                redirectPath="/iniciar-sesion"
                component={InformToPrint}
              />
            }
          />
        </Routes>
        <SpeedInsights />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
