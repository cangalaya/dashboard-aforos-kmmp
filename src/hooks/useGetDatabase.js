import React, { useEffect, useState } from 'react'
import { ref, onValue } from "firebase/database";
import { db } from '../js/firebase/firebase';


const useGetDatabase = () => {

    const [database, setDatabase] = useState({});

    const updateDataBase = (ambiente, data) => {
        if (data !== null) {
            setDatabase(oldAforos => ({ ...oldAforos, [ambiente]: data }))
        }
    }

    // vestuario damas
    useEffect(() => {
        const dbRefDamas = ref(db, '/dataBaseCallao/vest-dam-der');
        return onValue(dbRefDamas, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                updateDataBase('vestDamas', data);
            }
        });
    }, [])
    return (
        <div>useGetDatabase</div>
    )
}

export default useGetDatabase