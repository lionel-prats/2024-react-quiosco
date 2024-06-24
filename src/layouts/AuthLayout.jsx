import { Outlet } from 'react-router-dom' // v259

export default function AuthLayout() {
  return (
    <main 
        className='max-w-4xl mx-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center'
    >
        <img 
            className='max-w-xs'
            
            // la ruta relativa la definimos a partir de la ruta definida en src\router.jsx
            // este componente se renderiza en http://localhost:5173/auth/..., hay que retroceder un nivel para estar en la raiz (v266)
            src="../img/logo.svg" 
            
            alt="imagen logotipo" 
        />
        <div className='p-10 w-full'>
            <Outlet />
        </div>
    </main>
  )
}