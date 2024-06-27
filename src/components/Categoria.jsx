import useQuiosco from "../hooks/useQuiosco" // v276

export default function Categoria({categoria}) {

    const {handleClickCategoria, categoriaActual} = useQuiosco() // v276
    const {icono, id, nombre} = categoria

    // forma #2 de aplicarle un "active" a la categoria seleccionada (v278)
    // const resaltarCategoriaActual = categoriaActual.id === id ? "bg-amber-400" : "bg-white"
    
    // forma #3 de aplicarle un "active" a la categoria seleccionada (v278)
    const resaltarCategoriaActual = () => categoriaActual.id === id ? "bg-amber-400" : "bg-white"

    return (

        // forma #1 de aplicarle un "active" a la categoria seleccionada (v278)
        // <div className={`${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        
        // forma #2 de aplicarle un "active" a la categoria seleccionada (v278)
        // <div className={`${resaltarCategoriaActual} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        
        // forma #3 de aplicarle un "active" a la categoria seleccionada (v278)
        <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
        
            <img 
                className="w-12"
                src={`/img/icono_${icono}.svg`} 
                alt="Imagen Icono" 
            />
            <button 
                className="text-lg font-bold cursor-pointer truncate"
                type="button" // v276
                onClick={ () => handleClickCategoria(id) } // v276|v277
            >{categoria.nombre}
            </button>
        </div>
    )
}
