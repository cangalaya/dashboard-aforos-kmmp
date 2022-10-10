import React, { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { db } from '../js/firebase/firebase'

const useGetData = () => {

  const [aforos, setAforos] = useState({});

  const updateDataRealtime = (ambiente, data) => {
    if (data !== null) {
      setAforos(oldAforos => ({ ...oldAforos, [ambiente]: data }))
    }
  }

  useEffect(() => {
    const dbRefDamas = ref(db, '/callao/vest-dam-der/aforoRealtime');
    return onValue(dbRefDamas, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        updateDataRealtime('vestDamas', data);
      }
    });
  }
    , [])

  useEffect(() => {
    const dbRefVaronesBaja = ref(db, '/callao/vest-var-der/aforoRealtime');
    return onValue(dbRefVaronesBaja, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        updateDataRealtime('vestVaronesBaja', data);
      }
    });

  }, [])

  useEffect(() => {
    const dbRefVaronesAlta = ref(db, '/callao/vest-var-alta/aforoRealtime');
    return onValue(dbRefVaronesAlta, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        updateDataRealtime('vestVaronesAlta', data);
      }
    });

  }, [])
  //console.log(aforos);

  return {
    aforos
  }
}

export default useGetData