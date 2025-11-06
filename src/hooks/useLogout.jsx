import api from "../services/axios";

const useLogout = ()=>{


    async function logout() {
        console.log(
            "wrks"
        );
         
        const res = await api.delete('/logout')
         alert('logout successfull')
         console.log(res);
        //  navigate('/')
       }

       return {logout}
}

export default useLogout