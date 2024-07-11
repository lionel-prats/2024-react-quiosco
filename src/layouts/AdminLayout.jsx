import { Outlet } from 'react-router-dom' // v331
import AdminSidebar from '../components/AdminSidebar' // v331

import { useAuth } from '../hooks/useAuth' // v334

export default function AdminLayout() { // v331

  useAuth({middleware: "admin"}) // v334

  return (
    <div className='md:flex'>
        <AdminSidebar />
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>
    </div>
  )
}
