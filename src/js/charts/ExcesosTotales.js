import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAuth } from '../../context/authContext';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    }
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: false,
        drawBorder: false, // <-- this removes y-axis line
        lineWidth: 0.5,
      }
    },
    y: {
      display: true,
      grid: {
        display: true,
        drawBorder: false, // <-- this removes x-axis line
        lineWidth: 0.5,
      }
    }
  },
  maintainAspectRatio: false,
  aspectRatio: 2
};


const ExcesosTotales = () => {
  const { exMonthsVar, exMonthsVarAlta, exMonthsDam } = useAuth();


  console.log('prubeeeee: ', Object.entries(exMonthsVar));
  const getTotalCount = (obj) => {
    return Object.entries(obj).map(arr => {
      const arrCount = Object.entries(arr[1]).map((array) => array[1])
      const count = arrCount.reduce((previusValue, currentValue) => previusValue + currentValue, 0);
      return [arr[0], count]
    })
  };
  console.log(getTotalCount(exMonthsDam));
  const sumTotal = () => {
    const dam = getTotalCount(exMonthsDam);
    const varones = getTotalCount(exMonthsVar);
    const varAlta = getTotalCount(exMonthsVarAlta);
    const totalMes0 = dam[0][1] + varones[0][1] + varAlta[0][1]
    const totalMes1 = dam[1][1] + varones[1][1] + varAlta[1][1]
    const totalMes2 = dam[2][1] + varones[2][1] + varAlta[2][1]
    const totalMes3 = dam[3][1] + varones[3][1] + varAlta[3][1]
    return [[dam[0][0], totalMes0], [dam[1][0], totalMes1], [dam[2][0], totalMes2], [dam[3][0], totalMes3]]
  }

  const labels = [getTotalCount(exMonthsDam)[3], getTotalCount(exMonthsDam)[2], getTotalCount(exMonthsDam)[1], getTotalCount(exMonthsDam)[0]];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(82, 205, 255, 1)',
    }
  ],
};


  return (
    <Bar options={options} data={data} />
  )
}

export default ExcesosTotales