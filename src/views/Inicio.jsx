// import { productos as data } from "../data/productos" // comentado en el v306 ya que lo reemplazamos por una consulta a la API usando la libreria para react swr

import clienteAxios from '../config/axios'

import useSWR from "swr" // importacion de la sibreria swr, instalada en el v306 (para obtener los productos mediante consulta a la API)

import Producto from "../components/Producto"
import useQuiosco from "../hooks/useQuiosco" // v274

export default function Inicio() {

  const {categoriaActual} = useQuiosco() // v276

  // filtro los productos segun categoriaActual seleccionada (v279)
  // const productos = data.filter( producto => producto.categoria_id === categoriaActual.id)
  
  /* 
  // bloque implementado a modo de prueba en el v306, para hacer la consulta a http://laravel-quiosco.test/api/productos con un enfoque similar al que usamos para obtener las categorias, en QuioscoProvider, en el v300
  const [data, setData] = useState([]);
  const obtenerProducto = async () => {
    try {
      const { data } = await clienteAxios("/api/productos");
      setData(data.data); 
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    obtenerProducto();
  }, []);
  const productos = data.filter( producto => producto.categoria_id === categoriaActual.id)
  // fin bloque 
  */

  // bloque para hacer la peticion a http://laravel-quiosco.test/api/productos usando la libreria de react swr (v306)
  const fetcher = () => clienteAxios("/api/productos").then(data => data.data)
  const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })
  // console.log(data);
  // console.log(error);
  if(isLoading) return "Cargando..."
  // filtro los productos segun categoriaActual seleccionada (v306)
  const productos = data.data.filter( producto => producto.categoria_id === categoriaActual.id)
  // fin bloque
  
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
