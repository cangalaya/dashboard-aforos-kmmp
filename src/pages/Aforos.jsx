import React from 'react'
import LineChartAforos from '../js/charts/LineChartAforos'
import Layout from "../containers/Layout";
import { useAuth } from '../context/authContext'

import '../css/custom/style-custom.css'

import iconPerson from '../images/icons/icon-person.svg'
const Aforos = () => {

    const {aforos} = useAuth();
    console.log(aforos);
    return (
        <Layout>
            <div className="mx-auto">
                <h1 className="display-4 mb-4">Aforos a Tiempo Real</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-img-top p-3"><LineChartAforos /></div>
                            <div className="card-body">
                                <h5 className="card-title margin-top">Vest. Varones Planta Baja</h5>
                                <div className="container-aforos-realtime">
                                    <div className="cont-center-items">
                                        <img src={iconPerson} alt="icon person" className='icon-person'/>
                                        <span className='text-aforos'>{aforos['vestVaronesBaja']}</span>
                                    </div>
                                    <div className="cont-center-items">
                                        <span className='text-excesos'>Excesos:</span>
                                        <span className='number-excesos text-warning'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-img-top p-3"><LineChartAforos /></div>
                            <div className="card-body">
                                <h5 className="card-title margin-top">Vest. Varones Planta Alta</h5>
                                <div className="container-aforos-realtime">
                                    <div className="cont-center-items">
                                        <img src={iconPerson} alt="icon person" className='icon-person'/>
                                        <span className='text-aforos'>{aforos['vestVaronesAlta']}</span>
                                    </div>
                                    <div className="cont-center-items">
                                        <span className='text-excesos'>Excesos:</span>
                                        <span className='number-excesos text-warning'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <div className="card-img-top p-3"><LineChartAforos /></div>
                            <div className="card-body">
                                <h5 className="card-title margin-top">Vestuario Damas</h5>
                                <div className="container-aforos-realtime">
                                    <div className="cont-center-items">
                                        <img src={iconPerson} alt="icon person" className='icon-person'/>
                                        <span className='text-aforos'>{aforos['vestDamas']}</span>
                                    </div>
                                    <div className="cont-center-items">
                                        <span className='text-excesos'>Excesos:</span>
                                        <span className='number-excesos text-warning'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>




    )
}

export default Aforos