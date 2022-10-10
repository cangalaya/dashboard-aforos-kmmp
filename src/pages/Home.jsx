import React, { useRef } from 'react'
import { useAuth } from '../context/authContext'
// charts
import ExcesosAforos from '../js/charts/ExcesosAforos'
import EstadoDeContagios from '../js/charts/EstadoDeContagios'
import ExcesosPorAmbiente from '../js/charts/ExcesosPorAmbiente'
import RegistroDeContagios from '../js/charts/RegistroDeContagios'
import ExcesosTotales from '../js/charts/ExcesosTotales'

//icons
import overflowIcon from '../images/icons/overflow-45x45.png'
import coronaVirus from '../images/icons/coronavirus-icon.png'

import Layout from "../containers/Layout";

const Home = () => {
  const { user, loading, timeToday,

    totalContagioCount, loadTotalContags,

    emVar, emVarAlta, emDam,
  } = useAuth();



  console.log(user);
  if (loading) return <h1>Cargando ...</h1>

  // total de contagios mes
  const countTotalContagsMes = (arr) => {
    const yearToday = timeToday.getFullYear();
    const mes = timeToday.getMonth() + 1;
    //console.log(mes);
    const arrMesTotal = arr.filter(([year, arrMesContags]) => yearToday === year)[0][1];
    const countTotalMes = arrMesTotal.filter(([mesOfList, count]) => mesOfList == mes);
    return countTotalMes[0][1];
  }

  var totalCountMes = '';
  if (!loadTotalContags) {
    totalCountMes = countTotalContagsMes(totalContagioCount);
    //console.log(totalCountMes, totalCountYear)
  }

  //total de excesos mes 
  const totalVar = useRef(0);
  const totalVarAlta = useRef(0);
  const totalEmDam = useRef(0);
  const getTotalCount = (obj) => {
    //console.log('obj:', Object.entries(obj));
    const arrOfExcesos = Object.entries(obj).map((arr) => arr[1])
    return arrOfExcesos.reduce((previusValue, currentValue) => previusValue + currentValue, 0)
  }

  totalVar.current = getTotalCount(emVar);
  totalVarAlta.current = getTotalCount(emVarAlta);
  totalEmDam.current = getTotalCount(emDam);
  const totalExcesosMes = totalVar.current + totalVarAlta.current + totalEmDam.current;


  // top overview
  const time = timeToday.getHours() + 'h :' + timeToday.getMinutes() + 'm';
  return (
    <Layout>
      <div className="row">
        <div className="col-sm-12">
          <div className="home-tab">
            <div className="d-sm-flex align-items-center justify-content-between border-bottom">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active ps-0" id="home-tab" data-bs-toggle="tab" href="#overview" role="tab" aria-controls="overview" aria-selected="true">Sede Callao</a>
                </li>
              </ul>
              <div>
                <div className="btn-wrapper">
                  <a href="#" className="btn btn-otline-dark"><i className="icon-printer" /> Print</a>
                  <a href="#" className="btn btn-primary text-white me-0"><i className="icon-download" /> Export</a>
                </div>
              </div>
            </div>
            <div className="tab-content tab-content-basic">
              <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview">
                <div className="row">
                  <div className="col-sm-12">
                    <div className="statistics-details d-flex align-items-center justify-content-between  gap-3">
                      <div>
                        <p className="statistics-title">Saturación <br /> de ambientes (%)</p>
                        <h3 className="rate-percentage">32.53%</h3>
                        <p className="text-success d-flex"><i className="mdi mdi-menu-down" /><span>-0.5%</span></p>
                      </div>
                      <div>
                        <p className="statistics-title">Exceso de Aforo</p>
                        <h3 className="rate-percentage">{totalExcesosMes}</h3>
                        <p className="text-danger d-flex"><i className="mdi mdi-menu-up" /><span>+0.1%</span></p>
                      </div>
                      <div>
                        <p className="statistics-title">Periodo más <br /> Concurrente (24h)</p>
                        <h3 className="rate-percentage">7-10 h</h3>
                        <p className="text-danger d-flex"> <span /></p>
                      </div>
                      <div className="d-none d-md-block">
                        <p className="statistics-title">Ambiente más <br /> Concurrente</p>
                        <h3 className="rate-percentage">Vest. Varones P.B.</h3>
                        <p className="text-success d-flex"><span /></p>
                      </div>
                      <div className="d-none d-md-block">
                        <p className="statistics-title">Hora</p>
                        <h3 className="rate-percentage">{time}</h3>
                        <p className="text-success d-flex"><span /></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="card-title card-title-dash">Excesos Aforo Semanal</h4>
                                <h5 className="card-subtitle card-subtitle-dash">Excesos de aforo con una semana de antiguedad</h5>
                              </div>
                              <div id="performance-line-legend">
                                <div className='chartjs-legend'>
                                  <ul>
                                    <li>
                                      <span className='leyend-last'></span>Semana Actual
                                    </li>
                                    <li>
                                      <span className='leyend-dest'></span>Semana Anterior
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="">
                              <ExcesosAforos />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                        <div className="card bg-primary card-rounded">
                          <div className="card-body pb-0">
                            <h4 className="card-title card-title-dash text-white mb-4">Estado de Contagios / Mes</h4>
                            <div className="row">
                              <div className="col-sm-4">
                                <p className="status-summary-ight-white mb-1">Totales</p>
                                <h2 className="text-info">{totalCountMes}</h2>
                              </div>
                              <div className="col-sm-8">
                                <div className="status-summary-chart-wrapper pb-4">
                                  {/* <canvas id="status-summary" /> */}
                                  <EstadoDeContagios />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-center align-items-center mb-2 mb-sm-0">
                                  <img src={overflowIcon} alt="averflow icon" className='icon-space' />
                                  <div>
                                    <p className="text-small mb-2">Total Excesos</p>
                                    <h4 className="mb-0 fw-bold">{totalExcesosMes}</h4>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-6">
                                <div className="d-flex justify-content-center align-items-center mb-2 mb-sm-0">
                                  <img src={coronaVirus} alt="coronavirus icon" className='icon-space' />
                                  <div>
                                    <p className="text-small mb-2">Total Contagios</p>
                                    <h4 className="mb-0 fw-bold">{totalCountMes}</h4>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="d-sm-flex justify-content-between align-items-start">
                              <div>
                                <h4 className="card-title card-title-dash">Registro de Contagios</h4>
                                <p className="card-subtitle card-subtitle-dash">Contagios registrados semanalmente.</p>
                              </div>
                              <div>
                                <div className="dropdown">
                                  <button className="btn btn-secondary dropdown-toggle toggle-dark btn-lg mb-0 me-0" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Año Actual </button>
                                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                    <h6 className="dropdown-header">Settings</h6>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                    <div className="dropdown-divider" />
                                    <a className="dropdown-item" href="#">Separated link</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="d-sm-flex align-items-center mt-1 justify-content-between">
                              <div className="d-sm-flex align-items-center mt-4 justify-content-between"><h2 className="me-2 fw-bold">853</h2><h4 className="me-2">personas</h4><h4 className="text-danger">(+1.37%)</h4></div>
                              <div className="me-3"><div id="marketing-overview-legend" /></div>
                            </div>
                            <div className="chartjs-bar-wrapper mt-3">
                              {/* <canvas id="marketingOverview" /> */}
                              <RegistroDeContagios />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-lg-12 grid-margin stretch-card">
                        <div className="card">
                          <div className="card-body">
                            <h4 className="card-title">Saturación de ambientes</h4>
                            <div className="table-responsive pt-3">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>
                                      #
                                    </th>
                                    <th>
                                      Nombre de Ambiente
                                    </th>
                                    <th>
                                      Saturación
                                    </th>
                                    <th>
                                      Aforo Actual
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      1
                                    </td>
                                    <td>
                                      Vestuario de Varones Planta Baja
                                    </td>
                                    <td>
                                      <div className="progress">
                                        <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
                                      </div>
                                    </td>
                                    <td>
                                      12
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      2
                                    </td>
                                    <td>
                                      Vesturio Varones Planta Alta
                                    </td>
                                    <td>
                                      <div className="progress">
                                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '75%' }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />
                                      </div>
                                    </td>
                                    <td>
                                      32
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      3
                                    </td>
                                    <td>
                                      Vestuario de Damas
                                    </td>
                                    <td>
                                      <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '90%' }} aria-valuenow={90} aria-valuemin={0} aria-valuemax={100} />
                                      </div>
                                    </td>
                                    <td>
                                      2
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 d-flex flex-column">
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <h4 className="card-title card-title-dash">Excesos por ambiente / Mes</h4>
                                </div>
                                {/* <canvas className="my-auto" id="doughnutChart" height={200} /> */}
                                <ExcesosPorAmbiente />
                                <div id="doughnut-chart-legend" className="mt-5 text-center">
                                  <div className="chartjs-legend">
                                    <ul className='justify-content-center'>
                                      <li><span className='excesos-ambiente1'></span>Varones P. Baja</li>
                                      <li><span className='excesos-ambiente2'></span>Varones P. Alta</li>
                                      <li><span className='excesos-ambiente4'></span>Vestuario Mujeres</li>
                                    </ul>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row flex-grow">
                      <div className="col-12 grid-margin stretch-card">
                        <div className="card card-rounded">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div>
                                    <h4 className="card-title card-title-dash">Excesos Totales Mensuales</h4>
                                  </div>
                                  <div>
                                    <div className="dropdown">
                                      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton3">
                                        <h6 className="dropdown-header">week Wise</h6>
                                        <a className="dropdown-item" href="#">Year Wise</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  {/* <canvas id="leaveReport" /> */}
                                  <ExcesosTotales />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default Home