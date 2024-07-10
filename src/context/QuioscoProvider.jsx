import { createContext/*v273*/ , useState/*v275*/, useEffect/* v294 */ } from 'react'

// { toast } contiene el evento y el tipo de toast que quieres mostrar
// significado de "toast": en el contexto de desarrollo de software, particularmente en interfaces de usuario, "toast" se refiere a una notificación breve y transitoria que aparece y desaparece automáticamente en la pantalla.
import { toast } from 'react-toastify' // v291

// import { categorias as categoriasDB } from "../data/categorias" // v275 (comentado en el v300 ya que lo reemplazamos por una consulta a la API)

// import axios from 'axios' // libreria descargada para hacer peticiones a la API laravel-quiosco e importada en este archivo en el v300 (import comentado en el v302, reemplazado por el import de clienteAxios)

import clienteAxios from '../config/axios' // v302 (reemplaza la importacion del v300)

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]) // v275 (valor inicial modificado en v300)
    const [categoriaActual, setCategoriaActual] = useState({}) // v276 (valor inicial modificado en v300)
    const [modal, setModal] = useState(false) // v280

    // producto seleccionado por el usuario (click en "btn.AGREGAR")
    const [producto, setProducto] = useState({}) // v282
    
    const [pedido, setPedido] = useState([]) // v286
    /* 
    pedido = [
        {id: 12, nombre: "Café Espresso", precio: 29.9, cantidad: 2, imagen: "cafe_12"},
        {id: 17, nombre: "Dona de Fresa", precio: 19.9, cantidad: 3, imagen: "donas_03"},
        ...
    ]
    */
    
    // state para calcular en tiempo real el importe total del pedido (v294) 
    const [total, setTotal] = useState(0)

    // usamos este useEffect para ir calculando en tiempo real el importe total del pedido (v294)
    // recordemos que si le pasamos un state en el array de dependencias (en este caso pedido), el useEffect se ejecutara una primera vez, y luego cada vez que el state cambie (v294)
    useEffect(()=>{ 
        const nuevoTotal = pedido.reduce( (total, productoIterado) => (productoIterado.precio * productoIterado.cantidad) + total, 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    // v300 - esta funcion hace una peticion al endpoint de categorias de la API y es ejecutada dentro de un useEffect debajo     
    const obtenerCategorias = async () => {
        try {
            // const {data} = await axios("http://laravel-quiosco.test/api/categorias") // v300 (comentada en el v301)
            // const {data} = await axios(`${import.meta.env.VITE_API_URL}/api/categorias`) // v301 (comentada en el v302)
            const {data} = await clienteAxios("/api/categorias") // v302
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    // v300 - colocamos el arreglo de dependencias vacio para que este useEffect solo se ejecute cuando se carga este componente (QuioscoProvider es un componente???)     
    useEffect(()=>{ 
        obtenerCategorias()
    }, [])

    // en react hay una convencion, que es que cuando hay un click o un submit, si creamos una funcion para manejar ese evento, el nombre lo definimos con "handle" + evento + especificacion (v276)
    const handleClickCategoria = id => {
        const categoria = categorias.filter( categoria => categoria.id  === id)[0]
        setCategoriaActual(categoria)
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleClickModal = () => { // v280
        setModal(!modal)
    }

    // maneja el array temporal de los productos incluidos en el pedido del usuario (v287)
    // modificada en el v290 vvv 
    //  - este handle se ejecuta cuando el usuario da click en "btn.ANADIR AL PEDIDO", en <ModalProducto />
    //  - el handle valida si el producto clickeado ya existe en el state pedido 
    //  - si existe, reemplaza el objeto del producto original por el objeto del producto actual (que tiene la cantidad actualizada)
    //  - si no existe, lo agrega al state pedido, como venia haciendo hasta antes del v290
    const handleAgregarPedido = ({categoria_id, /* imagen,  */...producto}) => { 
        if( pedido.some(productoIterado => productoIterado.id === producto.id) ){
            const pedidoActualizado = pedido.map( productoIterado => productoIterado.id === producto.id ? producto : productoIterado)
            setPedido(pedidoActualizado)

            console.log(pedido);

            // toast que se renderiza cuando se edita la cantidad de un producto ya existente dentro del state pedido (v291)
            toast.success("Guardado correctamente")

        } else {
            setPedido([...pedido, producto])
            
            // toast que se renderiza cuando se agrega un producto nuevo al state pedido (v291)
            toast.success("Agregado al Pedido") 

        }
    }

    // este handle se ejecuta desde el click en el "btn.IconoEditar" de alguno de los productos listados en el sidebar de la derecha (o sea, un objeto del state pedido)
    // la ejecucion del handle se encuentra en <resumenProducto />
    const handleEditarCantidad = id => { // v292
        const productoActualizar = pedido.filter( productoIterado => productoIterado.id  === id)[0]
        
        // cargo en el state producto el producto cuyo "btn.IconoEditar" estamos cliqueando desde resumen (sidebar izquierdo) para que el modal de producto cargue toda la informacion del producto que se quiere editar
        // handleSetProducto(productoActualizar) // forma alternativa de actualizar producto
        setProducto(productoActualizar)
        
        // abro el modal del producto actualizando el state modal
        // handleClickModal() // forma alternativa de actualizar modal
        setModal(!modal)
    }

    // este handle se ejecuta desde el click en el "btn.IconoEliminar" de alguno de los productos listados en el sidebar de la derecha (o sea, un objeto del state pedido) (v293)
    // este handle elimina el producto clickeado, actualizando el state pedido
    // la ejecucion del handle se encuentra en <resumenProducto />
    const handleEliminarProductoPedido = id => { 
        const pedidoActualizado = pedido.filter( productoIterado => productoIterado.id  !== id)
        setPedido(pedidoActualizado)
        toast.success("Eliminado del pedido") 
    }

    const handleSubmitNuevaOrden = async (logout) => { // v326|v330
        const token = localStorage.getItem("AUTH_TOKEN")
        
        try {
            const {data} = await clienteAxios.post(
                "/api/pedidos", 
                {
                    total,
                    productos: pedido.map( producto => {
                        return {
                            id: producto.id,
                            cantidad: producto.cantidad
                        }
                    }),
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success(data.message) // mensaje en pantalla de pedido realizado (v330)
            setTimeout(() => { // luego de 1 segundo reseteo el arreglo de pedido (v330)
                setPedido([])
            }, 1000);

            // cerrar la sesion del usuario luego de 3 segundos (v330)
            setTimeout(() => {
                logout()
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <QuioscoContext.Provider
            value={
                {
                    categorias,
                    categoriaActual,
                    handleClickCategoria,
                    modal,
                    handleClickModal,
                    producto, // v282
                    handleSetProducto, // v282
                    pedido, // v286
                    handleAgregarPedido, // v287
                    handleEditarCantidad, // v292
                    handleEliminarProductoPedido, // v293
                    total, // v294
                    handleSubmitNuevaOrden, // v326
                }
            }
        >{ children }</QuioscoContext.Provider>
    )
} 

export {
    QuioscoProvider
}
export default QuioscoContext