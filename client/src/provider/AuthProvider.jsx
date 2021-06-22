import React from 'react';
import axios from 'axios';


const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {

    const [isLogged, setIsLogged] = React.useState(false);

    const getLogged = async() => {
        if(localStorage.getItem("token") === null || localStorage.getItem("token").length === 0) return setIsLogged(false);

        const data = {
            token: localStorage.getItem("token")
        }

        await axios.post("http://localhost:4000/api/auth",data)
            .then(res=>setIsLogged(res.data))
            .catch(err=>console.log(err))
        

    }
    
    React.useEffect(()=>{
        getLogged();
    })

    return (
        <AuthContext.Provider value={{isLogged, getLogged}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthProvider }