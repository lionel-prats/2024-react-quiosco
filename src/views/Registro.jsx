import {createRef, useState} from 'react' // v310
import { Link } from 'react-router-dom' // v264
import clienteAxios from '../config/axios' // v310

export default function Registro() {
  
    // v310
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
  
    const handleSubmit = async e => { // v310
        e.preventDefault()
        const datos = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value
        }
        try {
            const respuesta = await clienteAxios.post("/api/registro", datos)
            console.log(respuesta);
        } catch (error) {
            console.log(error.response.data.errors)
            console.log(Object.values(error.response.data.errors))
        }
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