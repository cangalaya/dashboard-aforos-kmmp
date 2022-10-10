import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../context/authContext';
import { ref, get, set } from 'firebase/database'
import { db } from '../firebase/firebase'
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
  maintainAspectRatio: false,
  aspectRatio: 2
};

const ExcesosAforos = () => {

  // obtener la fecha actual, número, día, mes, anio  (en español el día) [lunes, [dd,mm,yyyy], number of excesos]
  // si number of excesos no está definido en firebase, guardar como null

  const { timeToday } = useAuth();

  const [excesosDam, setExcesosDam] = useState({});
  const [excesosAntDam, setExcesosAntDam] = useState({});

  const [excesosVarPb, setExcesosVarPb] = useState({});
  const [excesosAntVarPb, setExcesosAntVarPb] = useState({});

  const [excesosVarAlta, setExcesosVarAlta] = useState({});
  const [excesosAntVarAlta, setExcesosAntVarAlta] = useState({});


  const listOfDaysSemActual = () => {
    const result = []
    for (var i = 1; i <= 7; i++) {
      var date = new Date();
      date.setDate(timeToday.getDate() - i);
      result.push(date);
    }
    return result
  };

  const listOfDaysSemAnterior = () => {
    const result = []
    for (var i = 8; i <= 14; i++) {
      var date = new Date();
      date.setDate(timeToday.getDate() - i);
      result.push(date);
    }
    return result
  }


  const getExcesos = (ddmmyyyy, ambiente, setFuntion, setFuntionAnt,  sem) => {
    const dbRef = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/excesos`);
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        if (sem === 'actual') {
          setFuntion(oldValue => ({ ...oldValue, [ddmmyyyy]: snapshot.val() }));
        } else {
          setFuntionAnt(oldValue => ({ ...oldValue, [ddmmyyyy]: snapshot.val() }));
        }
      } else {
        console.log("making data");
        const dbRefer = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/`);
        const ingresosFake = faker.datatype.number({ min: 0, max: 10 });
        const egresosFake = ingresosFake +  faker.datatype.number({ min: 0, max: 3 });
        const excesosFake = ambiente ==='vest-dam-der' ? 0 : faker.datatype.number({ min: 0, max: 2 });
        set(dbRefer, {
          egresos: ingresosFake,
          ingresos: egresosFake,
          excesos: excesosFake,
        })
        if (sem === 'actual') {
          setFuntion(oldValue => ({ ...oldValue, [ddmmyyyy]: excesosFake }));
        } else {
          setFuntionAnt(oldValue => ({ ...oldValue, [ddmmyyyy]: excesosFake }));
        }
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const daySpanishArrDate = (listOfDays) => {
    return listOfDays.map(day => {
      const ddmmyyyyArr = [day.getUTCDate(), day.getMonth() + 1, day.getUTCFullYear()];
      const daySpanish = day.toLocaleString(undefined, { weekday: 'long' });
      const daySpanishUpper = daySpanish.charAt(0).toUpperCase() + daySpanish.slice(1);    // primera letra en mayúscula
      return [daySpanishUpper, ddmmyyyyArr];
    })
  };
  const daySemanaActual = listOfDaysSemActual();
  const diasSemActual = daySpanishArrDate(daySemanaActual);
  const labels = diasSemActual.map(arr => arr[0]).reverse();   // reverse para que muestre los días en orden consecutivo
  //console.log('labelsSemActual', labelsSemActual);

  const daySemanaAnterior = listOfDaysSemAnterior();
  const diasSemAnterior = daySpanishArrDate(daySemanaAnterior);

  useEffect(() => {
    const allAmbientes = ['vest-dam-der', 'vest-var-der', 'vest-var-alta'];
    diasSemActual.forEach(arr => getExcesos(arr[1], allAmbientes[0], setExcesosDam, setExcesosAntDam, 'actual'));
    diasSemAnterior.forEach(arr => getExcesos(arr[1], allAmbientes[0], setExcesosDam,  setExcesosAntDam, 'anterior'));

    diasSemActual.forEach(arr => getExcesos(arr[1], allAmbientes[1], setExcesosVarPb, setExcesosAntVarPb, 'actual'));
    diasSemAnterior.forEach(arr => getExcesos(arr[1], allAmbientes[1], setExcesosVarPb,  setExcesosAntVarPb, 'anterior'));

    diasSemActual.forEach(arr => getExcesos(arr[1], allAmbientes[2], setExcesosVarAlta, setExcesosAntVarAlta, 'actual'));
    diasSemAnterior.forEach(arr => getExcesos(arr[1], allAmbientes[2], setExcesosVarAlta,  setExcesosAntVarAlta, 'anterior'));
    //console.log('excesos ->', excesos)
  }, [])

  const sumDataTotalActual = () => {
    const vestDam = Object.entries(excesosDam).map(([key, value]) => value);
    const vestVarPb = Object.entries(excesosVarPb).map(([key, value]) => value);
    const vestVarAlta = Object.entries(excesosVarAlta).map(([key, value]) => value);

    const result = []
    for (var i = 0; i< vestDam.length ; i++){
      const sum = vestDam[i]+vestVarAlta[i]+vestVarPb[i];
      result.push(sum);
    }
    return result.reverse();
  }

  const sumDataTotalAnterior = () => {
    const vestDam = Object.entries(excesosAntDam).map(([key, value]) => value);
    const vestVarPb = Object.entries(excesosAntVarPb).map(([key, value]) => value);
    const vestVarAlta = Object.entries(excesosAntVarAlta).map(([key, value]) => value);

    const result = []
    for (var i = 0; i< vestDam.length ; i++){
      const sum = vestDam[i]+vestVarAlta[i]+vestVarPb[i];
      result.push(sum);
    }
    return result.reverse();
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Semana Actual',
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: sumDataTotalActual(),
        borderColor: 'rgba(31, 59, 179, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 2,
        pointRadius: 4,
        tension: 0.35,

      },
      {
        label: 'Semana Anterior',
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
        data: sumDataTotalAnterior(),
        borderColor: 'rgba(85, 206, 255, 1)',
        backgroundColor: 'rgba(85, 206, 255, 0.5)',
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.35,
      },
    ]
  };

  return <Line options={options} data={data} height={null} width={null} />;
}

export default ExcesosAforos