import axios from "axios";  // libreria descargada para hacer peticiones a la API laravel-quiosco (v300) e importada en este archivo en el v302

// creo el cliente Axios (v302)
const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
}) 

export default clienteAxios