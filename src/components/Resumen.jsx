import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco" // v286
import ResumenProducto from "./ResumenProducto"; // v288
import { useAuth } from "../hooks/useAuth" // v330

export default function Resumen() {

  const {pedido, total, handleSubmitNuevaOrden} = useQuiosco(); // v286|v294|v326
  const {logout} = useAuth({}) // v330

  const comprobarPedido = () => pedido.length === 0
  
  const handleSubmit = e => { // v326
    e.preventDefault()
    handleSubmitNuevaOrden(logout); // v326|v330
  }

  return (
    <aside className="md:w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      <p className="text-lg my-5">Aquí podrás ver el resumen y totales de tu pedido</p>
      <div className="py-10"> 
        {/* {pedido.length === 0 ? ( */}
        {comprobarPedido() ? (
          <p className="text-center text-2xl">No hay elementos en tu pedido aún</p>
        ) : (
          pedido.map(producto => ( // v288
            <ResumenProducto 
              key={producto.id}
              producto={producto} // esto es una prop (atributo del objeto props que recibe el componente hijo, en este caso ResumenProducto)
            />
          ))
        )}
      </div>
      <p className="text-xl mt-10">
        Total: {formatearDinero(total)}
      </p>
      <form 
        className="w-full"
        onSubmit={handleSubmit} // v326
      >
        <div className="mt-5"> 
          <input 
            className={`${comprobarPedido() ? 
              "bg-indigo-100" : 
              "bg-indigo-600 hover:bg-indigo-800"} 
              px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
            type="submit"
            value="Confirmar Pedido"
            disabled = {comprobarPedido()}
          />
        </div>
      </form>
    </aside>
  )
}
  