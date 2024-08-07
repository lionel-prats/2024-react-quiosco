import useQuiosco from "../hooks/useQuiosco" // v275
import Categoria from "./Categoria"
import { useAuth } from "../hooks/useAuth" // v323

export default function Sidebar() {

    // state con la data de categorias.js (v275)
    const {categorias} = useQuiosco() 

    const {logout, user} = useAuth({ // v323|v324
        middleware: "auth"
    })

    return (
        <aside className="md:w-72">
            <div className="p-4">
                <img 
                    className='w-40'

                    // la ruta relativa la definimos a partir de la ruta definida en src\router.jsx
                    // este componente se renderiza en http://localhost:5173/..., ya estamos ubicados en la raiz (v266)
                    src="img/logo.svg" 
                    alt="Imagen Logo"
                />
            </div>
            <p className="my-10 text-xl text-center">
                Hola: { user?.name }
            </p>
            <div className="mt-10">
                { 
                    categorias.map(categoria => ( 
                            <Categoria 
                                key={categoria.id}
                                categoria={categoria} // prop (v267)
                            />
                        )
                    )
                }
            </div>
            <div className="my-5 px-5">
                <button
                    className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
                    type="button"
                    // onClick={() => logout()}
                    onClick={logout} // v323
                >Cancelar Orden
                </button>
            </div>
        </aside>
    )
}
