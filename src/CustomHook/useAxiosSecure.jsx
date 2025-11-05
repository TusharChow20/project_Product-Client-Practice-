import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user,logOut } = useAuth();
  const navigate = useNavigate()
  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use((config) => {
      console.log(config);
      config.headers.authorization = `Bearer ${user.accessToken}`;
      return config;
    });

    instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if(err.status === 401 || err.status===403){
          logOut().then(()=>{navigate('/login')})
        }
      },[user,logOut, navigate]
    );
    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(reqInterceptor);
    };
  }, [user]);
};
export default useAxiosSecure;
