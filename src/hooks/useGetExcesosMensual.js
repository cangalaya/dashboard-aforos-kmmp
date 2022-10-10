import React, { useState, useEffect } from 'react'
import { ref, get, set } from 'firebase/database'
import { db } from '../js/firebase/firebase'
import faker from 'faker';

const useGetExcesosMensual = () => {

    var timeToday = new Date();

    const [emVar, setEmVar] = useState({});
    const [emVarAlta, setEmVarAlta] = useState({});
    const [emDam, setEmDam] = useState({});

    const [exMonthsVar, setExMonthsVar] = useState({})
    const [exMonthsVarAlta, setExMonthsVarAlta] = useState({})
    const [exMonthsDam, setExMonthsDam] = useState({})

    const arrOfDays4MonthsAgo = () => {
        const dayStart = timeToday.getUTCDate() - 1;  // el día anterior al actual
        console.log(dayStart)
        var count = 1;
        var mes0Name = "";
        var mes1Name = "";
        var mes2Name = "";
        var mes3Name = "";
        const mes0 = [];    // mes actual
        const mes1 = [];
        const mes2 = [];
        const mes3 = [];

        // lista resultante [[mes0, [days]], [mes1, [days]], [mes2, [days]], [mes3, [days]]]
        for (var i = dayStart; i >= 1; i--) {
            var date = new Date();
            date.setDate(timeToday.getDate() - count);
            mes0Name = date.toLocaleString(undefined, { month: 'long' });
            mes0.push(date);
            count++;
        }
        const timeMes1 = new Date();
        timeMes1.setDate(timeToday.getDate() - count);
        for (var i =  timeMes1.getUTCDate() ; i >= 1; i--) {
            var date = new Date();
            date.setDate(timeToday.getDate() - count);
            mes1Name = date.toLocaleString(undefined, { month: 'long' });
            mes1.push(date);
            count++;
        }
        const timeMes2 = new Date();
        timeMes2.setDate(timeToday.getDate() - count);
        for (var i =   timeMes2.getUTCDate(); i >= 1; i--) {
            var date = new Date();
            date.setDate(timeToday.getDate() - count);
            mes2Name = date.toLocaleString(undefined, { month: 'long' });
            mes2.push(date);
            count++;
        }
        const timeMes3 = new Date();
        timeMes3.setDate(timeToday.getDate() - count);
        for (var i =  timeMes3.getUTCDate(); i >= 1; i--) {
            var date = new Date();
            date.setDate(timeToday.getDate() - count);
            mes3Name = date.toLocaleString(undefined, { month: 'long' });
            mes3.push(date);
            count++;
        }

        const daySpanishArrDate = (listOfDays) => {
            return listOfDays.map(day => {
                const ddmmyyyyArr = [day.getUTCDate(), day.getMonth() + 1, day.getUTCFullYear()];
                const daySpanish = day.toLocaleString(undefined, { weekday: 'long' });
                const daySpanishUpper = daySpanish.charAt(0).toUpperCase() + daySpanish.slice(1);    // primera letra en mayúscula
                return [daySpanishUpper, ddmmyyyyArr];
            })
        };
        return [[mes0Name, daySpanishArrDate(mes0)], [mes1Name, daySpanishArrDate(mes1)], [mes2Name, daySpanishArrDate(mes2)], [mes3Name, daySpanishArrDate(mes3)]];
    }
    console.log(arrOfDays4MonthsAgo());
    console.log('prueba: ', arrOfDays4MonthsAgo()[0][1][1][1])


    const listOfDaysMesActual = () => {
        const dayStart = timeToday.getUTCDate() - 1;  // el día anterior al actual
        var count = 1;
        const result = []               // lista resultante [[mes0, [days]], [mes1, [days]], [mes2, [days]], [mes3, [days]]]
        for (var i = dayStart; i >= 1; i--) {
            var date = new Date();
            date.setDate(timeToday.getDate() - count);
            result.push(date);
            count++;
        }

        return result;
    };

    const daySpanishArrDate = (listOfDays) => {
        return listOfDays.map(day => {
            const ddmmyyyyArr = [day.getUTCDate(), day.getMonth() + 1, day.getUTCFullYear()];
            const daySpanish = day.toLocaleString(undefined, { weekday: 'long' });
            const daySpanishUpper = daySpanish.charAt(0).toUpperCase() + daySpanish.slice(1);    // primera letra en mayúscula
            return [daySpanishUpper, ddmmyyyyArr];
        })
    };

    const getExcesos = (ddmmyyyy, ambiente, setFuntion) => {
        const dbRef = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/excesos`);
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                setFuntion(oldValue => ({ ...oldValue, [ddmmyyyy]: snapshot.val() }));
            } else {
                console.log("making data");
                const dbRefer = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/`);
                const ingresosFake = faker.datatype.number({ min: 0, max: 10 });
                const egresosFake = ingresosFake + faker.datatype.number({ min: 0, max: 3 });
                const excesosFake = ambiente === 'vest-dam-der' ? 0 : faker.datatype.number({ min: 0, max: 2 });
                set(dbRefer, {
                    egresos: ingresosFake,
                    ingresos: egresosFake,
                    excesos: excesosFake,
                })
                setFuntion(oldValue => ({ ...oldValue, [ddmmyyyy]: excesosFake }));
            }
        }).catch((error) => {
            console.error(error);
        });
    }


    const getExcesosMensuales = (ddmmyyyy, ambiente, mes, setFuntion) => {
        const dbRef = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/excesos`);
        get(dbRef).then((snapshot) => {
            if (snapshot.exists()) {
                setFuntion(oldValue => ({ ...oldValue, [mes]: {...oldValue[mes], [ddmmyyyy]: snapshot.val()} }));
            } else {
                console.log("making data");
                const dbRefer = ref(db, `/dataBaseCallao/${ambiente}/${ddmmyyyy[2]}/${ddmmyyyy[1]}/${ddmmyyyy[0]}/`);
                const ingresosFake = faker.datatype.number({ min: 0, max: 10 });
                const egresosFake = ingresosFake + faker.datatype.number({ min: 0, max: 3 });
                const excesosFake = ambiente === 'vest-dam-der' ? 0 : faker.datatype.number({ min: 0, max: 2 });
                set(dbRefer, {
                    egresos: ingresosFake,
                    ingresos: egresosFake,
                    excesos: excesosFake,
                })
                setFuntion(oldValue => ({ ...oldValue, [mes]: {...oldValue[mes], [ddmmyyyy]: excesosFake} }));
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const diasTotales = daySpanishArrDate(listOfDaysMesActual());
    console.log(diasTotales)

    const allDaysMoths = arrOfDays4MonthsAgo();


    useEffect(() => {
        const allAmbts = ['vest-dam-der', 'vest-var-der', 'vest-var-alta'];
        diasTotales.forEach(arr => getExcesos(arr[1], allAmbts[0], setEmDam));
        diasTotales.forEach(arr => getExcesos(arr[1], allAmbts[1], setEmVar));
        diasTotales.forEach(arr => getExcesos(arr[1], allAmbts[2], setEmVarAlta));

        allDaysMoths.forEach(arr => arr[1].forEach(array => getExcesosMensuales(array[1], allAmbts[0], arr[0], setExMonthsDam)));
        allDaysMoths.forEach(arr => arr[1].forEach(array => getExcesosMensuales(array[1], allAmbts[1], arr[0], setExMonthsVar)));
        allDaysMoths.forEach(arr => arr[1].forEach(array => getExcesosMensuales(array[1], allAmbts[2], arr[0], setExMonthsVarAlta)));
    }, [])


    return {
        emVar,
        emVarAlta,
        emDam,

        exMonthsVar,
        exMonthsVarAlta,
        exMonthsDam,
    }
}

//Object.entries(emVar).map(([key,value]) => value).reduce((previusValue, currentValue) => previusValue+ currentValue)

export default useGetExcesosMensual