import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAuth } from '../../context/authContext'
import { useEffect, useRef } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);


const options = {
    plugins: {
        legend: {
            display: false
        }
    },
}

const ExcesosPorAmbiente = () => {

    const { emVar, emVarAlta, emDam } = useAuth();


    const getTotalCount = (obj) => {
        console.log('obj:', Object.entries(obj));
        const arrOfExcesos = Object.entries(obj).map((arr)=> arr[1])
        return arrOfExcesos.reduce((previusValue, currentValue) => previusValue+ currentValue, 0)
    }

    const totalVar = useRef(0);
    const totalVarAlta = useRef(0);
    const totalEmDam = useRef(0);
    totalVar.current = getTotalCount(emVar);
    totalVarAlta.current = getTotalCount(emVarAlta);
    totalEmDam.current = getTotalCount(emDam);

    
    const data = {
        labels: ['Vestuario Varones Planta Baja', 'Vestuario Varones Planta Alta', 'Vestuario de Damas'],
        datasets: [
            {
                label: '# de Excesos',
                data: [totalVar.current, totalVarAlta.current, totalEmDam.current],
                backgroundColor: [
                    'rgba(31, 59, 179, 1)',
                    'rgba(82, 205, 255, 1)',
                    'rgba(253, 208, 199, 1)',
                ],
                borderColor: [
                    'rgba(31, 59, 179, 1)',
                    'rgba(82, 205, 255, 1)',
                    'rgba(253, 208, 199, 1)',
                ],
                borderWidth: 1,
                hoverOffset: 3,
            },
        ],
    };

    return (
        <Doughnut data={data} options={options} />
    )
}

export default ExcesosPorAmbiente