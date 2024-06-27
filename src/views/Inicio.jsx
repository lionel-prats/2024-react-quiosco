import { productos as data } from "../data/productos"
import Producto from "../components/Producto"
import useQuiosco from "../hooks/useQuiosco" // v274

export default function Inicio() {

  const {categoriaActual} = useQuiosco() // v276
  
  // filtro los productos segun categoriaActual seleccionada (v279)
  const productos = data.filter( producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        { productos.map(producto => ( 
          <Producto 
            key={producto.id}
            producto={producto} 
          />
        ))}
      </div>
    </>
  )
}
