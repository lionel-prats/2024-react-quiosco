// custom hook creado en el v319

import { useEffect } from 'react' // v321
import useSWR from "swr" // 320
import { useNavigate } from 'react-router-dom' // v321
import clienteAxios from '../config/axios' // v319

// el parametro middleware va a ser para indentificar en que parte de nuestra aplicacion estamos utilizando este hook
// en caso que el usuario se autentique correctamente, queremos redireccionarlo hacia la pagina principal, esa redireccion la seteamos en el parametro url
export const useAuth = ({middleware, url}) => { // v319

    // bloque v320
    const token = localStorage.getItem("AUTH_TOKEN") // "51|vS4fQDPUWRG0DzCe93227G5l4nUEYKmSW3989SnM9c9897f0"

    const navigate = useNavigate() // v321

    const { data: user, error, mutate } = useSWR(
        '/api/user', 
        () => 
            clienteAxios(
                "/api/user", 
                {
                    headers: {
                        Authorization: `Bearer ${token}` // "Bearer 51|vS4fQDPUWRG0DzCe93227G5l4nUEYKmSW3989SnM9c9897f0"
                    }
                }
            )
            .then(res => res.data)
            .catch(error => { throw Error(error?.response?.data?.errors)})
    )
    // fin bloque v320

    const login = async (datos, setErrorres) => {
        try {
            const {data} = await clienteAxios.post("/api/login", datos)
            localStorage.setItem("AUTH_TOKEN", data.token) // v318
            setErrorres([])

            // ejecutando la funcion mutate() de SWR en esta linea, forzamos a que se haga la peticion a /api/user luego de que el usuario submitea el form de login y se autentica correctamente en el back (v320)
            await mutate()
        
        } catch (error) {
            setErrorres(Object.values(error.response.data.errors))
        }
    }
    
    const registro = async (datos, setErrorres) => { // v324
        try {
            const {data} = await clienteAxios.post("/api/registro", datos)
            localStorage.setItem("AUTH_TOKEN", data.token)
            setErrorres([])
            await mutate()
        } catch (error) {
            setErrorres(Object.values(error.response.data.errors))
        }
    }
    
    const logout = async () => { // v323
        try {
            await clienteAxios.post("/api/logout", null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem("AUTH_TOKEN")

            // entiendo que con esta linea seteo como undefined la variable user de useSWR a partir de cerrar la sesion en el cliente con el click en "btn.Cancelar Orden" (v323)
            await mutate(undefined)
        
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }
    
    // este useEffect va a estar escuchando por user o por error (variables de useSWR) (v321)
    // sus dependencias (en el arreglo de dependencias) van a ser user y error (v321)
    useEffect(()=>{ 
        if(middleware == "guest" && url && user){
            navigate(url)
        }
        if(middleware == "guest" && user && user.admin){ // v334
            navigate("/admin")
        }
        if(middleware === "admin" && user && !user.admin){ // v334
            navigate("/")
        }
        if(middleware == "auth" && error){ // v322
            // navigate(url)
            navigate("/auth/login")
        }
    }, [user, error]) 

    // console.log(user)
    // console.log(error)
    // console.log(middleware);
    // console.log(url);

    return {
        login,
        registro,
        logout,
        user,
        error
    }
} 

// const useAuth = ({middleware, url}) => {
// ...
// }
// export default useAuth