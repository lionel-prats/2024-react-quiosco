// importamos el hook de React useState para crear el state local "cantidad" (solamente se va a requerir en este componente - v285) 
// tambien importamos el hook de React useEffect (v289)
import {useState, useEffect} from 'react'  

import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers" // v284 

export default function ModalProducto() {

    const { producto, handleClickModal, handleAgregarPedido, pedido /* v289 */ } = useQuiosco() // v283
    const { imagen, nombre, precio } = producto // v283

    // state local para renderizar la cantidad del producto seleccionado en el modal
    const [cantidad, setCantidad] = useState(1) // v285
    
    // state local para setear el texto del boton del modal ("AÑADIR AL PEDIDO" o "GUARDAR CAMBIOS") segun si el producto clickeado se encuentra o no en el state pedido (v289)
    const [edicion, setEdicion] = useState(false) 

    // este useEffect se ejecuta cuando esta listo el componente y cuando se modifica el state pedido (agregado en el array de dependendias de este useEffect) (v289)
    useEffect(()=>{ // v289

        // si el producto cliqueado ya se encuentra en el state pedido, este bloque UPDATEA el state local cantidad antes de renderizar la cantidad del producto seleccionado en el modal para mostrar la cantidad actual seleccionada por el usuario
        if( pedido.some(productoIterado => productoIterado.id === producto.id) ){
            const productoEdicion = pedido.filter( productoIterado => productoIterado.id === producto.id)[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        } 
        // fin bloque
    }, [pedido])

    return (
        <div className="md:flex items-center gap-10">
            
            <div className="md:w-1/3">
                <img 
                    src={`/img/${imagen}.jpg`} 
                    alt={`imagen ${nombre}`} 
                />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button // btn "X" dentro del modal, para cerrarlo cuando esta abierto
                        onClick={ handleClickModal } // cierro el modal (v283)
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
                <h1 className="text-3xl font-bold mt-5">
                    {nombre}
                </h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    {formatearDinero(precio)}
                </p>
                <div className='flex gap-4 mt-5'>

                    <button 
                        type='button'
                        onClick={() => {
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}
                    >
                        <svg // icono del btn. para decrementar la cantidad
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                    <p className='text-3xl'>{cantidad}</p>

                    <button
                        type='button'
                        onClick={() => {
                            if(cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}
                    >
                        <svg // icono del btn. para incrementar la cantidad
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="size-6"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                </div>

                <button
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    type="button"
                    onClick={ () => {
                        
                        // agrego un producto al state pedido (v288)
                        handleAgregarPedido({...producto, cantidad}) 
                        
                        handleClickModal() // cierro el modal (v288)
                    }}
                >{edicion ? "Guardar Cambios" : "Añadir al pedido"}
                </button>

            </div>
            
        </div>
    )
}
