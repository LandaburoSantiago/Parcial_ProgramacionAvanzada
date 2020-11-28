import React from 'react';
import ProductCardStyle from './ProductCardStyle.css'
const ProductCard = ({imagen,titulo,precio,condicion,cantidad_disponible,cantidad_vendida}) => {
    return ( 

        <div className="card mb-3" >
            <div className="row no-gutters">
                <div className="col-md-4">
                <img src={imagen} className="card-img" alt={titulo}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{titulo}</h5>
                        <p className="card-text">Precio: AR${precio}</p>
                        <p className="condicion-text">Condicion: {condicion} </p>
                        <p className="card-text"><small className="text-muted">Disponibles: {cantidad_disponible} <br></br> Vendidos: {cantidad_vendida}</small></p>
                    </div>
                </div>
            </div>
        </div>

        /* <div className="card">
            <img src={imagen} className="card-img-top" alt={titulo}/>
            
            <div className="card-body">
                <hr/>
                <h5 className="card-title">{ titulo }</h5>
                <p className="card-text"><b>Precio: ${precio} </b><span></span></p>
            </div>
        </div>  */
     );
}
 
export default ProductCard;