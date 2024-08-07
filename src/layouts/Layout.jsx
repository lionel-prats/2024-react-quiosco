import { Outlet } from 'react-router-dom' // v259

import Modal from 'react-modal' // libreria instalada (v281)

import { ToastContainer/* , toast */ } from 'react-toastify'; // v291
import 'react-toastify/dist/ReactToastify.css'; // v291

import Sidebar from '../components/Sidebar'
import Resumen from '../components/Resumen'
import ModalProducto from '../components/ModalProducto' // v282
import useQuiosco from "../hooks/useQuiosco" // v280
import { useAuth } from '../hooks/useAuth'; // v322

const customStyles = { // v281
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// con esta linea eliminamos el error por consola del navegador (v282)
Modal.setAppElement("#root")

export default function Layout() {

  useAuth({ // v322
    middleware: "auth", 
    // url: "/auth/login"
  })

  const { modal/* , handleClickModal */ } = useQuiosco() // v280|v281

  return (
    <>
      <div className='md:flex'>
        <Sidebar />
        <main className='flex-1 h-screen overflow-y-scroll bg-gray-100 p-3'>
          <Outlet />
        </main>
        <Resumen />
      </div>

      {/* modal on/off cuando se clickea en btn.Agregar de cualquiera de los productos renderizados */}
      {/* { modal && ( // esto APARENTEMENTE es como un if(modal){ ... } (v281 - comentado en el v282) */}
      <Modal isOpen={modal} style={customStyles}> {/* componente de libreria react-modal */}
        <ModalProducto />
        {/* <button
          onClick={ handleClickModal } // v281
        >Cerrar</button> */}
      </Modal> {/* componente de libreria react-modal */}
      {/* )} (v281 - comentado en el v282) */}
      
      
      {/* aca colocamos el componente de react-toastify que va a renderizar el toast que se va a mandar a llamar de acuerdo a ciertas acciones (v291) */}
      <ToastContainer />
      
    </>
  )
}