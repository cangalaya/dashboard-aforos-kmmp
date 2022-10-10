import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    title: {
      display: false,
    },
    legend: {
        display: false
    }
  },
  scales: {
    x: {
       display: false,
    },
    y: {
       display: false,
    }
    },
  maintainAspectRatio : false,
  aspectRatio: 2,
};

const labels = ['Julio', 'Agosto', 'Septiembre'];

const data = {
  labels,
  datasets: [
    {
      label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      borderColor: 'rgba(1, 182, 160, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0)',
      borderWidth: 5,
      pointRadius: 0,
      tension: 0.6
    }
  ],
};

const EstadoDeContagios = () => {
  return (
    <Line options={options} data={data} height={null} width={null}/>
  )
}

export default EstadoDeContagios