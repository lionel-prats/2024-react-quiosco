// custom hook creado en el v319

import clienteAxios from '../config/axios' // v319

export const useAuth = ({middleware, url}) => {

    const login = async (datos, setErrorres) => {
        try {
            const {data} = await clienteAxios.post("/api/login", datos)
            localStorage.setItem("AUTH_TOKEN", data.token) // v318
            setErrorres([])
        } catch (error) {
            setErrorres(Object.values(error.response.data.errors))
        }
    }
    
    const registro = () => {

    }
    
    const logout = () => {

    }
    
    return {
        login,
        registro,
        logout
    }
} 

// const useAuth = ({middleware, url}) => {
// ...
// }
// export default useAuth