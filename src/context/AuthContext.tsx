import { authApi } from "@/api/authApi";
import { LoginCredentials, LoginResponse, Role } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";


interface AuthContextType {

  user: LoginResponse | null;

  userRole: Role | null;

  loading: boolean;

  login: (
    credentials: LoginCredentials
  ) => Promise<void>;

  logout: () => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);



export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children
}) => {


  const [user, setUser] = useState<LoginResponse | null>(null);

  const [userRole, setUserRole] = useState<Role | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const restoreSession = async () => {

      try {

        const savedUser =
          await AsyncStorage.getItem("user_data");


        if(savedUser){

          const userData: LoginResponse =
              JSON.parse(savedUser);


          setUser(userData);

          setUserRole(userData.role);

        }


      } catch(error){

        console.error(
          "Erreur restauration session :",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    restoreSession();

  }, []);




  const login = async (
    credentials: LoginCredentials
  ) => {


    setLoading(true);


    try {


      const data: LoginResponse =
        await authApi.login(credentials);



      await AsyncStorage.setItem(
        "user_data",
        JSON.stringify(data)
      );


      setUser(data);

      setUserRole(data.role);



    } catch(error){

      console.error(
        "Erreur login :",
        error
      );

      throw error;


    } finally {

      setLoading(false);

    }

  };




 const logout = async () => {
    setLoading(true);

    try {
        await AsyncStorage.removeItem('user_token');
        await AsyncStorage.removeItem('user_role');
        await AsyncStorage.removeItem('user_data');

        setUser(null);
        setUserRole(null);

    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);

    } finally {
        setLoading(false);
    }
};


  return (

    <AuthContext.Provider
      value={{
        user,
        userRole,
        loading,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};



export const useAuth = () => {


  const context = useContext(AuthContext);


  if(!context){

    throw new Error(
      "useAuth doit être utilisé dans AuthProvider"
    );

  }


  return context;

};