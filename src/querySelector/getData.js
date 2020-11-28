import { useState } from "react";

const getData = async (productoBuscado) => {

    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}`
    try{
        const request = await fetch(url);
        let response = await request.json()
        return response
    }catch (error){
        console.log('Fetch error!', error)
    }
}
 
export default getData;