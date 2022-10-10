import React from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import "../App.css";
import Home from "../pages/Home"
import Aforos from "../pages/Aforos"
import ReportarContagio from "../pages/ReportarContagio";

import Login from "../containers/Login";
import RecoveryPassword from "../containers/RecoveryPassword";
import NotFound from '../pages/NotFound'

import GetData from "../hooks/useGetData"

// ---- CSS for all pages-----
import "../vendors/feather/feather.css";
import "../vendors/mdi/css/materialdesignicons.min.css";
import "../vendors/ti-icons/css/themify-icons.css";
import "../vendors/typicons/typicons.css";
import "../vendors/simple-line-icons/css/simple-line-icons.css";
import "../vendors/css/vendor.bundle.base.css";
import "../css/vertical-layout-light/style.css"


import ExcesosAforos from "../js/charts/ExcesosAforos";

import { AuthProvider } from "../context/authContext";


import { ProtectedRoute } from "../components/ProtectedRoute";


const App = () => {

  return (
    <HashRouter >
      <AuthProvider>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/aforos" element={
            <ProtectedRoute>
              <Aforos />
            </ProtectedRoute>
          } />
          <Route path="/reportar-contagio" element={
            <ProtectedRoute>
              <ReportarContagio />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
          <Route path="/getdata" element={<GetData />} />
          {/* <Route exact path="/recovery" element={<RecoveryPassword />} />
            <Route exact path="/charts" element={<ExcesosAforos />} /> */}
        </Routes>
      </AuthProvider >
    </HashRouter>
  );
};

export default App;
