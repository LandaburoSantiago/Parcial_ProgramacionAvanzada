import SearchBar from './components/SearchBar'
import { useState } from 'react';
import Catalogo from './components/Catalogo';


function App() {
  const [ productos, setProductos ] = useState()
  const handleProductos = (producto) =>{
    setProductos(producto)
  }
  
  // console.log(productos)
  return (
    <>

      <SearchBar
        handleProductos = {handleProductos} 
      />
      
      {productos === '' || productos === undefined ? <div className="alerta"><div className="alert alert-danger"> Debe buscar algun articulo </div></div>: <Catalogo setProductos={setProductos} data = {productos}/>}




    </>
    
  );
}

export default App;
