import { useContext } from 'react' // v274
import QuioscoContext from '../context/QuioscoProvider' // v274

const useQuiosco = () => {
    return useContext(QuioscoContext) // aparentemente, una foma de conectar este custom hook con QuioscoProvider.jsx (v274)
}

export default useQuiosco

// de esta forma, cuando yo mande a llamar este hook useQuiosco puedes ver que va a utilizar el Context de QuioscoContext y va a tener acceso a toda la informacion de src\context\QuioscoProvider.jsx

// el hook useQuiosco empieza con "use" porque vvv 
// en React existen los hooks 
// y tu puedes crear tambien tus propios hooks 
// y si a un hook propio lo nombras con el prefijo "use", React realiza una serie de mejoras en tu codigo y lo integra mejor con React 
// los hooks no son para crear funciones reutilizables 
