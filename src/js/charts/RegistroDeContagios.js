import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
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
    Filler,
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

const labels = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: 3000, max: 4000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};



const RegistroDeContagios = () => {
    return (
        <Line options={options} data={data} />
    )
}

export default RegistroDeContagios