import axios from '../api/axios';
// import axios from 'axios';
import useAuth from './useAuth';
import Cookies from 'universal-cookie';
const useRefreshToken =  () => {
    const {auth, setAuth } = useAuth();
     const cookies = new Cookies();
    //  cookies.get("refreshToken")
    const refresh = async () => {
       let refreshTok = {
        refreshToken: cookies.get("refreshToken"),
      };

     const response = await axios.post('/refresh-token',refreshTok );
    //  console.log(response)
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token);
            return { ...prev, token: response.data.token }
        });
        return response.data.token;
    }
    
    return refresh;
};

export default useRefreshToken;