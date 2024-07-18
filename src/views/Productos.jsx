import useSWR from "swr" // v341
import clienteAxios from '../config/axios' // v341
import Producto from "../components/Producto" // v341

export default function Ordenes() {

  const token = localStorage.getItem("AUTH_TOKEN")  // v341

  const fetcher = () => clienteAxios("/api/productos", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 10000
  })

  if(isLoading) return "Cargando..."

  return (
    <div>
      <h1 className="text-4xl font-black">Productos</h1>
      <p className="text-2xl my-10">
        Maneja la disponibilidad desde aquí
      </p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        { data.data.map(producto => ( 
          <Producto 
            key={producto.id}
            producto={producto}
            botonDisponible={true} 
          />
        ))}
      </div>
    </div>
  )
}
  