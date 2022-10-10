import React, { useState, useEffect } from 'react'
import { ref, onValue } from "firebase/database";
import { db } from '../js/firebase/firebase'

const useGetTotalContagios = () => {
  const [totalContagioCount, setTotalContagioCount] = useState([]);
  const [loadTotalContags, setLoadTotalContags] = useState(true);

  const makeObjectTotal = (obj) => {
    const arr = Object.keys(obj).map(function (key) { return [Number(key), Object.assign({}, obj[key])]; });
    const result = arr.map(arrYearObject => {
      const year = arrYearObject[0];
      const arrMesContagios = Object.entries(arrYearObject[1]);
      const arrMesNumberOfContagios = arrMesContagios.map(([mes, contagio]) => {
        return [mes, Object.values(contagio).length]
      })
      return [year, arrMesNumberOfContagios];
    });
    setLoadTotalContags(false);

    return result;

  }


  useEffect(() => {
    const dbRef = ref(db, '/contagios/callao');
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const listOfContags = makeObjectTotal(data);
        setTotalContagioCount(listOfContags);
      }
    });
  }
    , [])


  return {
    totalContagioCount,
    loadTotalContags
  }
}


export default useGetTotalContagios