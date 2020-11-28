import React, { useState, useEffect } from 'react';
import SearchBarStyle from './SearchBarStyle.css'


const SearchBar = ({handleProductos}) => {

    const [error, handleError] = useState(false)
    const [buscado, setBuscado] = useState(
        {
            control_precio: 'relevance',
            control_condicion: 'todos',
            offset: 0,
            limit: 30
        }
    )

    const [encontrados, setEncontrados] = useState()


    const handleEncontrado = (dataEncontrado) =>{
        setEncontrados(dataEncontrado)
    }

    const handleBuscado = (e) =>{
        setBuscado(
            {
            ...buscado,
            [e.target.name]: e.target.value,
            }
        )
        console.log(buscado)
    }

    const getData = async ( productoBuscado, filtro, offset, limit ) =>{
        const urlConfiltro=`https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}&FilterID=${filtro}`
        const urlSinFiltro = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}`
        let url = ''
        if (filtro==='todos'){
            url = urlSinFiltro
        }else{
            url = urlConfiltro
        }

        try{
            const request = await fetch(url);
            const response = await request.json()
            
            handleEncontrado(response)
            console.log(encontrados)
        }catch (error){
            console.log('Fetch error!', error)
        }   
    }

    const getDataMayorPrecio = async (productoBuscado, filtro, offset, limit) => {
        const urlConfiltro = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}&sort=price_desc&FilterID=${filtro}`
        const urlSinFiltro = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}&sort=price_desc`
        let url = ''
        if (filtro==='todos'){
            url = urlSinFiltro
        }else{
            url = urlConfiltro
        }
        try{
            const request = await fetch(url);
            const response = await request.json()
            setEncontrados(response)
        }catch (error){
            console.log('Fetch error!', error)
        }   
    }
    
    const getDataMenorPrecio = async (productoBuscado, filtro, offset, limit) =>{
        const urlConfiltro = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}&sort=price_asc&FilterID=${filtro}`
        const urlSinFiltro = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&offset=${offset}&limit=${limit}&sort=price_asc`
        let url = ''
        if (filtro==='todos'){
            url = urlSinFiltro
        }else{
            url = urlConfiltro
        }
        try{
            const request = await fetch(url);
            const response = await request.json()
            
            setEncontrados(response)
        }catch (error){
            console.log('Fetch error!', error)
        }
    }

    const submit = (e) =>{
        
        e.preventDefault()
        if( buscado.producto === ''){
            setEncontrados()
            handleError(true)
            console.log('error')
        }else if(buscado.control_precio === 'relevance'){
            getData(buscado.producto, buscado.control_condicion, buscado.offset, buscado.limit)
        }else if (buscado.control_precio === 'price_desc'){
            getDataMayorPrecio(buscado.producto, buscado.control_condicion, buscado.offset, buscado.limit)
        }else if (buscado.control_precio === 'price_asc'){
            getDataMenorPrecio(buscado.producto, buscado.control_condicion, buscado.offset, buscado.limit)
        }
        handleProductos(encontrados)
    }

    const paginacionSiguiente = (e) =>{
        buscado.offset += 1
        handleBuscado(e)
        submit(e)
    }

    const paginacionAtras = (e) =>{
        if (buscado.offset > 0){
            buscado.offset -= 1
        }   
        handleBuscado(e)
        submit(e)
    }
 
    return ( 
        <form
            onSubmit={submit}
        >
            <div className="search-container">
                    <input 
                        className="search-input"  
                        name="producto"
                        onChange={handleBuscado}
                        placeholder="Busca algun producto"
                        autoComplete= "off"
                    />
                    
                    <div className="search-button-container">
                        <button 
                            type = "submit"
                            className="btn btn-light"
                            onClick={handleBuscado}
                        ><img src="./assets/images/searchIcon.png"/></button>
                    </div>
            </div>
            <div className="radios-precios">
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="control_precio" id="moreRelevance" value="relevance" onChange={handleBuscado} />
                    <label className="form-check-label" for="exampleRadios1">
                        Mas relevantes
                    </label>     
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="control_precio" id="mayorPrecio" onChange={handleBuscado} value="price_desc"/>
                    <label className="form-check-label" for="exampleRadios1">
                        Mayor precio
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="control_precio" id="menorPrecio" onChange={handleBuscado} value="price_asc"/>
                    <label className="form-check-label" for="exampleRadios1">
                        Menor precio
                    </label>
                </div>
            </div>
            <div className="radios-condicion">
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="control_condicion" id="moreRelevance" value="todos" onChange={handleBuscado} />
                        <label className="form-check-label" for="exampleRadios1">
                            Todos
                        </label>     
                    </div>
                <div className="form-check">
                        <input className="form-check-input" type="radio" name="control_condicion" id="moreRelevance" value="2230284" onChange={handleBuscado}/>
                        <label className="form-check-label" for="exampleRadios1">
                            Nuevo
                        </label>     
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="control_condicion" id="mayorPrecio" onChange={handleBuscado} value="2230581"/>
                        <label className="form-check-label" for="exampleRadios1">
                            Usado
                        </label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="control_condicion" id="menorPrecio" onChange={handleBuscado} value="2230582"/>
                        <label className="form-check-label" for="exampleRadios1">
                            Reacondicionado
                        </label>
                </div>
            </div>
            <div className="paginacion">    
                <button type="button" onClick={paginacionAtras} className="btn btn-outline-secondary btn-sm">Atras</button>
                <button type="button" onClick={paginacionSiguiente} className="btn btn-outline-secondary btn-sm">Siguiente</button>
            </div>
        </form>
     );
}

 
export default SearchBar;