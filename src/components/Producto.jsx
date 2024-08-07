import { formatearDinero } from "../helpers" // v271 
import useQuiosco from "../hooks/useQuiosco" // v280

export default function Producto({producto, botonAgregar = false, botonDisponible = false}) {

    const {handleClickModal, handleSetProducto, handleClickProductoAgotado} = useQuiosco() // v280|v282|v342
    const {nombre, imagen, precio} = producto
    return (
        <div className="border p-3 shadow bg-white">
            <img 
                className="w-full"
                src={`/img/${imagen}.jpg`} 
                alt={`imagen ${nombre}`} 
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>
                {botonAgregar && // v341
                    <button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        type="button"
                        onClick={ () => {
                            handleClickModal();
                            handleSetProducto(producto); // v282
                        }} // v280
                    >Agregar</button>
                }
                {botonDisponible && // v341
                    <button
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        type="button"
                        onClick={ () => 
                            handleClickProductoAgotado(producto.id) // v342
                        } 
                    >Producto Agotado</button>
                }
            </div>
        </div>
    )
}
