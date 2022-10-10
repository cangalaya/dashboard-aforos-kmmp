import React, {useState, useContext} from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import "../css/vertical-layout-light/style.css";
import "../css/logos.css"

import "../css/custom/style-custom.css"

import logo from '../images/kmmp-logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState();

  const {login} = useAuth();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user , [name]:value});
  }
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try{
      await login(user.email, user.password);
      //console.log(user);
      navigate("/");
    }catch(error){
      setError(error.message);
      console.log("ERROR",error.message);
    }
  }
  return (
    <div className="container-scroller custom-login-display">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                <div>
                  <img src={logo} alt="logo" className="logoDesktop center" />
                </div>
                <h4>Control de Aforo Komatsu Callao</h4>
                <h6 className="fw-light">Ingrese su usuario.</h6>
                <form className="pt-3" id="form-login">
                  <div className="form-group">
                    <input
                      type="email"
                      name= "email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Usuario"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      name = "password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Constraseña"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mt-3">
                    <button
                      type="submit"
                      form="form-login"
                      className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      onClick={handleSubmit}
                    >
                      INGRESAR
                    </button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>
                    <a href="#" className="auth-link text-black">
                      ¿Olvido su contraseña?
                    </a>
                  </div>
                  <div className="text-center mt-4 fw-light spaceTop">
                    ¿No tienes acceso?{" "}
                    <a href="register.html" className="text-primary">
                      Pongase en contacto
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>
  );
};

export default Login;
