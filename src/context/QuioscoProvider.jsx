import { createContext/*v273*/ , useState/*v275*/ } from 'react'
import { categorias as categoriasDB } from "../data/categorias" // v275

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState(categoriasDB) // v275

    return(
        <QuioscoContext.Provider
            value={
                {
                    categorias
                }
            }
        >{ children }</QuioscoContext.Provider>
    )
} 

export {
    QuioscoProvider
}
export default QuioscoContext