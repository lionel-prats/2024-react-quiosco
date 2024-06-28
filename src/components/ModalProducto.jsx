import {useState} from 'react'  // importamos useState para crear el state local "cantidad" (solamente se va a requerir en este componente - v285) 
import useQuiosco from "../hooks/useQuiosco"
import { formatearDinero } from "../helpers" // v284 

export default function ModalProducto() {

    const { producto, handleClickModal } = useQuiosco() // v283
    const { imagen, nombre, precio } = producto // v283
    const [cantidad, setCantidad] = useState(1) // v285

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
                    <button 
                        onClick={ handleClickModal } // v283
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                </div>






                <button
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded"
                    type="button"
                >Añadir al pedido
                </button>
            </div>


            
        </div>
    )
}
