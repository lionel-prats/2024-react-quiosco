import { Outlet } from 'react-router-dom' // v259

export default function AuthLayout() {
  return (
    <main 
        className='max-w-4xl mx-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center'
    >
        <img 
            className='max-w-xs'
            src="../img/logo.svg" 
            alt="imagen logotipo" 
        />
        <div className='p-10 w-full'>
            <Outlet />
        </div>
    </main>
  )
}