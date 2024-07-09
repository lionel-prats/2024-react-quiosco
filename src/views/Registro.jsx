import {createRef, useState} from 'react' // v310
import { Link } from 'react-router-dom' // v264
// import clienteAxios from '../config/axios' // v310 (comentado en v324)
import Alerta from '../components/Alerta'; // v311
import { useAuth } from '../hooks/useAuth'; // custom hook (v324)

export default function Registro() {
  
    // v310
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
  
    const [errores, setErrorres] = useState([]) // v311

    const {registro} = useAuth({ middleware: "guest", url: "/" }) // v324

    const handleSubmit = async e => { // v310
        e.preventDefault()
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }

        // intento registrar al usuario (v324)
        registro(datos, setErrorres)   
    }

    return (
        <>
            <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
            <p>Crea tu Cuenta llenando el formulario</p>
            <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                <form
                    onSubmit={handleSubmit} // v310
                    noValidate
                >
                    {/* forma #1 de llamar al componente Alerta (v311) */}
                    {/* {errores ? 
                        errores.map( (error, i) => 
                            <Alerta 
                                key={i}
                                children={error} 
                            />)
                        : null
                    } */}

                    {/* forma #2 de llamar al componente Alerta (v311) */}
                    {errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null}
                    
                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="name"
                        >Nombre</label>
                        <input 
                            className="mt-2 w-full p-3 bg-gray-50"
                            type="text" 
                            id="name"
                            name="name"
                            placeholder="Tu Nombre"
                            ref={nameRef} // v310
                        />
                    </div>
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
                            ref={emailRef} // v310
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
                            ref={passwordRef} // v310
                        />
                    </div>
                    <div className="mb-4">
                        <label 
                            className="text-slate-800"
                            htmlFor="password_confirmation"
                        >Repetir Password</label>
                        <input 
                            className="mt-2 w-full p-3 bg-gray-50"
                            type="password" 
                            id="password_confirmation"
                            name="password_confirmation"
                            placeholder="Repetir Password"
                            ref={passwordConfirmationRef} // v310
                        />
                    </div>
                    <input 
                        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        type="submit" 
                        value="Crear Cuenta"
                    />
                </form>
            </div>
            <nav className="mt-5">
                <Link to="/auth/login">
                    ¿Ya tienes cuenta? Inicia Sesión
                </Link>
            </nav>
        </>
    )
}