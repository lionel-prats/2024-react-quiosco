import { createContext/*v273*/ , useState/*v275*/ } from 'react'

// { toast } contiene el evento y el tipo de toast que quieres mostrar
// significado de "toast": en el contexto de desarrollo de software, particularmente en interfaces de usuario, "toast" se refiere a una notificación breve y transitoria que aparece y desaparece automáticamente en la pantalla.
import { toast } from 'react-toastify' // v291

import { categorias as categoriasDB } from "../data/categorias" // v275

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState(categoriasDB) // v275
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]) // v276
    const [modal, setModal] = useState(false) // v280

    // producto seleccionado por el usuario (click en "btn.AGREGAR")
    const [producto, setProducto] = useState({}) // v282
    
    const [pedido, setPedido] = useState([]) // v286

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
    const handleAgregarPedido = ({categoria_id, imagen, ...producto}) => { 
        if( pedido.some(productoIterado => productoIterado.id === producto.id) ){
            const pedidoActualizado = pedido.map( productoIterado => productoIterado.id === producto.id ? producto : productoIterado)
            setPedido(pedidoActualizado)

            // toast que se renderiza cuando se edita la cantidad de un producto ya existente dentro del state pedido (v291)
            toast.success("Guardado correctamente")

        } else {
            setPedido([...pedido, producto])
            
            // toast que se renderiza cuando se agrega un producto nuevo al state pedido (v291)
            toast.success("Agregado al Pedido") 

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
                }
            }
        >{ children }</QuioscoContext.Provider>
    )
} 

export {
    QuioscoProvider
}
export default QuioscoContext