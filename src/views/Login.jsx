import { Link } from 'react-router-dom' // v264
import {createRef, useState} from 'react' // v315

// import clienteAxios from '../config/axios' // v315 (reemplazado en v318 por la importacion de uuseAuth)
import { useAuth } from '../hooks/useAuth'; // v318

import Alerta from '../components/Alerta'; // v315

export default function Login() {

    // bloque v315
    const emailRef = createRef();
    const passwordRef = createRef();
    const [errores, setErrorres] = useState([]) 

    const {login} = useAuth({ // v319
        // el middleware va a ser para indentificar en que parte de nuestra aplicacion estamos utilizando este hook (useAuth) vvv
        middleware: "guest", 
        // en caso que el usuario se autentique correctamente, queremos redireccionarlo hacia la pagina principal vvv
        url: "/"
    })


    const handleSubmit = async e => { 
        e.preventDefault()
        const datos = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        
        // try { // bloque try catch comentado en v319
        //     const {data} = await clienteAxios.post("/api/login", datos)
        //     localStorage.setItem("AUTH_TOKEN", data.token) // v318
        //     setErrorres([])
        // } catch (error) {
        //     setErrorres(Object.values(error.response.data.errors))
        // }

        login(datos, setErrorres) // v319     

    }
    // fin bloque

    return (
        <>
            <h1 className="text-4xl font-black">Iniciar Sesión</h1>
            <p>Para crear un pedido debes iniciar sesión</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit} // v315
                    noValidate
                >
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="email"
                        >Email</label>
                        <input 
                            className="mt-2 w-full p-3 bg-gray-50"
                            type="email" 
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            ref={emailRef} // v315
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="password"
                        >Password</label>
                        <input 
                            className="mt-2 w-full p-3 bg-gray-50"
                            type="password" 
                            id="password"
                            name="password"
                            placeholder="Tu Password"
                            ref={passwordRef} // v315
                        />
                    </div>
                    <input 
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        type="submit" 
                        value="Iniciar Sesión"
                    />
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/auth/registro">
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </>
    )
}
