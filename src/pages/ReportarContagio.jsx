import React, { useState } from 'react'
import Layout from "../containers/Layout";
import { ref, set } from "firebase/database"
import { db } from '../js/firebase/firebase'

import { Toaster, toast } from 'react-hot-toast'

import { useAuth } from '../context/authContext';

var randomId = require('random-id');


const ReportarContagio = () => {
    const [contagio, setContagio] = useState({});

    const { totalContagioCount, loadTotalContags, timeToday } = useAuth();

    console.log('totalContagioCount', totalContagioCount);

    const countTotalContagsMes = (arr) => {
        const yearToday = timeToday.getFullYear();
        const mes = timeToday.getMonth() + 1;
        //console.log(mes);
        const arrMesTotal = arr.filter(([year, arrMesContags]) => yearToday === year)[0][1];
        const countTotalMes = arrMesTotal.filter(([mesOfList, count]) => mesOfList == mes);
        return countTotalMes[0][1];
    }
    const countTotalContagsYear = (arr) => {
        const yearToday = timeToday.getFullYear();
        const allContags = arr.filter(([year, arrMesContags]) => yearToday === year)[0][1];
        const countTotalYear = allContags.reduce((previousValue, currentValue) => previousValue[1] + currentValue[1])
        return countTotalYear;
    }
    
    var totalCountMes = '';
    var totalCountYear = '';
    if (!loadTotalContags) {
        totalCountMes = countTotalContagsMes(totalContagioCount);
        totalCountYear = countTotalContagsYear(totalContagioCount);
        //console.log(totalCountMes, totalCountYear)
    }


    const writeToDatabase = (e) => {
        e.preventDefault();
        if (Object.keys(contagio).length < 5) {
            console.log(Object.keys(contagio).length)
            toast('Complete el formulario', {
                icon: '⚠️',
            });
            return;
        }
        const date = new Date(contagio.fecha);
        const mes = date.getMonth() + 1;        // +1 porque getMonth devuelve el mes desde 0 a 11
        const year = date.getFullYear();

        toast.promise(
            set(ref(db, 'contagios/callao/' + year + '/' + mes + '/' + randomId(12, 'a0A')), contagio),
            {
                loading: 'Subiendo...',
                success: <b>El contagio se registró con éxito.</b>,
                error: <b>Ocurrió un problema, inténtalo de nuevo.</b>,
            }
        );
        const form = document.getElementById('form-contagio');
        form.reset();
    }


    return (
        <Layout>
            <div className="row">
            <h2 className="display-3 mb-4 mt-4">Registro de Contagios por Covid-19</h2>
                <div className="col-md-4">
                    <div className="card mb-2">
                        <div className=" card-body fs-5">
                            Total de contagios anual: <span className='fw-bold'>{totalCountYear}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-5">
                    <div className="card mb-2">
                        <div className="card-body fs-5">
                            Total de contagios mes: <span className='fw-bold' >{totalCountMes}</span>
                        </div>
                    </div>
                </div>
                <h3 className="display-4 mb-4 mt-4">Reportar nuevo caso de contagio</h3>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Ficha de Contagio por Covid-19</h4>
                            <form className="form-sample" id="form-contagio">
                                <p className="card-description">
                                    Datos del paciente.
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Nombres</label>
                                            <div className="col-sm-9 center-cont-from center-cont-from">
                                                <input type="text" name="nombres" onChange={e => setContagio({ ...contagio, [e.target.name]: e.target.value })} className="form-control inputs-forms" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Genero</label>
                                            <div className="col-sm-9 center-cont-from">
                                                <select className="form-control" required name="genero" onChange={e => setContagio({ ...contagio, [e.target.name]: e.target.value })}>
                                                    <option value="">---</option>
                                                    <option value="varón">Varón</option>
                                                    <option value="mujer">Mujer</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Fecha</label>
                                            <div className="col-sm-9 center-cont-from">
                                                <input id="startDate" className="form-control" type="date" name="fecha" onChange={e => setContagio({ ...contagio, [e.target.name]: e.target.value })} required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Área de Trabajo</label>
                                            <div className="col-sm-9 center-cont-from">
                                                <select className="form-control" required name="area" onChange={e => setContagio({ ...contagio, [e.target.name]: e.target.value })}>
                                                    <option value="" defaultValue >Seleciona</option>
                                                    <option value="Almacén">Almacén</option>
                                                    <option value="Concesionario de Alimentación">Concesionario de Alimentación</option>
                                                    <option value="Machine Shop">Machine Shop</option>
                                                    <option value="Mezzanine">Mezzanine</option>
                                                    <option value="Oficinas Almacén">Oficinas Almacén</option>
                                                    <option value="Taller de Soldadura">Taller de Soldadura</option>
                                                    <option value="Talleres DCP">Talleres DCP</option>
                                                    <option value="Talleres KRCP">Talleres KRCP</option>
                                                    <option value="Torre A - Piso 1">Torre A - Piso 1 (Corporativo)</option>
                                                    <option value="Torre A - Piso 2">Torre A - Piso 2 (Corporativo)</option>
                                                    <option value="Torre A - Piso 3">Torre A - Piso 3 (Corporativo)</option>
                                                    <option value="Torre B - Piso 1">Torre B - Piso 1</option>
                                                    <option value="Torre B - Piso 2">Torre B - Piso 2</option>
                                                    <option value="Torre B - Piso 3">Torre B - Piso 3</option>
                                                    <option value="Workshop">Workshop</option>
                                                    <option value="Zona de Contratistas">Zona de Contratistas</option>
                                                    <option value="Zona de Dinamómetros">Zona de Dinamómetros</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 ">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Estado del paciente</label>
                                            <div className="col-sm-4 center-cont-from">
                                                <select className="form-control" required name="estado" onChange={e => setContagio({ ...contagio, [e.target.name]: e.target.value })}>
                                                    <option value="" defaultValue>---</option>
                                                    <option value="Leve" >Leve</option>
                                                    <option value="Grave">Grave</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <p className="card-description">
                                    Supervisor a Cargo
                                </p>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Nombres</label>
                                            <div className="col-sm-9 center-cont-from">
                                                <input required type="text" className="form-control" name="nombre" onChange={e => setContagio({ ...contagio, supervisor: { ...contagio.supervisor, [e.target.name]: e.target.value } })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label">Correo Electronico</label>
                                            <div className="col-sm-9 center-cont-from">
                                                <input type="email" className="form-control" name="email" onChange={e => setContagio({ ...contagio, supervisor: { ...contagio.supervisor, [e.target.name]: e.target.value } })} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-outline-warning button-witdh" onClick={(e) => writeToDatabase(e)}>Registrar Contagio</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </Layout>

    )
}

export default ReportarContagio