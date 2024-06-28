import { createContext/*v273*/ , useState/*v275*/ } from 'react'
import { categorias as categoriasDB } from "../data/categorias" // v275

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState(categoriasDB) // v275
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]) // v276
    const [modal, setModal] = useState(false) // v280
    const [producto, setProducto] = useState({}) // v282

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
                }
            }
        >{ children }</QuioscoContext.Provider>
    )
} 

export {
    QuioscoProvider
}
export default QuioscoContext