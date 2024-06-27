import { useContext } from 'react' // v274
import QuioscoContext from '../context/QuioscoProvider' // v274

const useQuiosco = () => {
    return useContext(QuioscoContext) // aparentemente, una foma de conectar este custom hook con QuioscoProvider.jsx (v274)
}

export default useQuiosco

// de esta forma, cuando yo mande a llamar este hook useQuiosco puedes ver que va a utilizar el Context de QuioscoContext y va a tener acceso a toda la informacion de src\context\QuioscoProvider.jsx