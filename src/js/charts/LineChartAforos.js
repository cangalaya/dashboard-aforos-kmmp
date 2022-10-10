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
  maintainAspectRatio: true,
  aspectRatio: 2
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Semana Actual',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 30 })),
      borderColor: 'rgba(31, 59, 179, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 2,
      pointRadius: 4,
      tension: 0.35,

    }
  ]
};

export default function ExcesosAforos() {
  return <Line options={options} data={data} />;
}
