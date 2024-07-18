import useSWR from "swr" // v335
import useQuiosco from "../hooks/useQuiosco" // v340
import clienteAxios from '../config/axios' // v335
import { formatearDinero } from "../helpers" // v339 

export default function Ordenes() {
  
  const token = localStorage.getItem("AUTH_TOKEN")  // v335

  const fetcher = () => clienteAxios("/api/pedidos", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, {
    refreshInterval: 1000
  })
  
  const { handleClickCompletarPedido } = useQuiosco() // v340

  if(isLoading) return "Cargando..."

  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes</h1>
      <p className="text-2xl my-10">
        Administra las órdenes desde aquí
      </p>
      <div className="grid grid-cols-2 gap-5">
        { data.data.data.map( pedido => (
          <div 
            className="p-5 bg-white shadow space-y-2 border-b flex flex-col justify-between gap-3"
            key={pedido.id}
          >
            <div>
              <div className="text-xl font-bold text-slate-600">
                Contenido del Pedido:
              </div>
              { pedido.productos.map( producto => (
                <div 
                  className="border-b border-b-slate-200 last-of-type:border-none py-4"
                  key={producto.id}
                >
                  <p className="text-sm">ID: { producto.id }</p>
                  <p>{ producto.nombre }</p>
                  <p>
                    Cantidad: {""} {/* para dejar un espacio (v338) */}
                    <span className="font-bold">{producto.pivot.cantidad}</span>
                  </p>
                </div>
              ))}
              <p className="text-lg font-bold text-slate-600">
                Cliente: {""} {/* para dejar un espacio (v339) */}
                <span className="font-normal">{ pedido.user.name}</span>
              </p>
              <p className="text-lg font-bold text-amber-500">
                Total a pagar: {""} {/* para dejar un espacio (v339) */}
                <span className="font-normal text-slate-600">{ formatearDinero(pedido.total) }</span>
              </p>
            </div>
            <button 
              className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
              type="button"
              onClick={ () => handleClickCompletarPedido(pedido.id) }
            >Completar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
