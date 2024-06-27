import { Outlet } from 'react-router-dom' // v259
import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import useQuiosco from "../hooks/useQuiosco" // v280

export default function Layout() {

  const {modal} = useQuiosco() // v280
  console.log(modal);

  return (
    <div className='md:flex'>
      <Sidebar />
      <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
        <Outlet />
      </main>
      <Resumen />
    </div>
  )
}