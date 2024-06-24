import { Link } from 'react-router-dom' // v264

export default function Registro() {
  return (
    <>
        <h1 className="text-4xl font-black">Crea tu Cuenta</h1>
        <p>Crea tu Cuenta llenando el formulario</p>
        <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
            <form>
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