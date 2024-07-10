import { Link } from 'react-router-dom' // importo el componente de Link (v332)
import { useAuth } from "../hooks/useAuth" // v332

export default function AdminSidebar() {
    const {logout} = useAuth({ middleware: "auth" }) // v332
    return (
        <aside className="md:w-72 h-screen">
            <div className="p-4">
                <img 
                    className='w-40'

                    // con "/" al incio del path me aseguro que el logo cargue correctamente tanto en /admin como en /admin/productos (v332)
                    src="/img/logo.svg" 

                    alt="Imagen Logo" 
                />
            </div>
            <nav className='flex flex-col p-4'>
                <Link to="/admin" className='font-bold text-lg'>Ordenes</Link>
                <Link to="/admin/productos" className='font-bold text-lg'>Productos</Link>
            </nav>
            <div className='my-5 px-5'>
                <button
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    type="button"
                    onClick={logout} 
                >Cerrar Sesión
                </button>
            </div>
        </aside>
    )
}
