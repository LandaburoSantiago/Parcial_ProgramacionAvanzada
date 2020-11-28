import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import CatalogoStyle from './CatalogoStyle.css'

const Catalogo = ({data, setProductos}) => {

    const [ordenados, setOrdenados] = useState({})

    const getData = async ( productoBuscado, metodoOrdenamiento ) =>{
        const url = `https://api.mercadolibre.com/sites/MLA/search?q=${productoBuscado}&sort=`
        console.log(productoBuscado)
        try{
            const request = await fetch(url);
            const results = await request.json()
            
            setOrdenados(results)
        }catch (error){
            console.log('Fetch error!', error)
        }   
    }


    const handleSortMax = () =>{
        getData(data.query, data.available_sorts[0].id)
        setProductos(ordenados)
        console.log(ordenados)
    }

    const handleSortMin = () =>{
        getData(data.query, data.available_sorts[1].id)
        setProductos(ordenados)
    }
    


    return ( 
        <>
        
        <section className="gird-products">
            <div className="products">
                <article className="product">
                    {data.results.map(producto => <ProductCard
                        key = {producto.id}
                        imagen = {producto.thumbnail}
                        titulo = {producto.title}
                        precio = {producto.price}
                        condicion = {producto.condition}
                        cantidad_disponible = {producto.available_quantity}
                        cantidad_vendida = {producto.sold_quantity}
                    
                    />)}

                </article>
            </div>
        </section>
        </>
     );
}
 
export default Catalogo;