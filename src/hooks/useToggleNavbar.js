import { useState } from "react";

const useToggleNavbar = () => {
    const [toggle, setToggle] = useState(false);
    
    const clickToggle = () =>{
        setToggle(!toggle);
        //console.log('navbar activado-desactivado');
    }

    return {
        toggle,
        clickToggle
    }
}

export default useToggleNavbar;

