import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storedCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [currentUser, setCurrentUser_] = useState(storedCurrentUser);

  const setCurrentUser = (newCurrentUser) => {
    setCurrentUser_(newCurrentUser);
  };

  const axiosUnauthorized = () => !axios.defaults.headers.common['Authorization'];

  useEffect(() => {
    if (currentUser && currentUser.token) {
      axios.defaults.headers.common['Authorization'] = currentUser.token;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('currentUser')
    }
  }, [currentUser]);

  const contextValue = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      axiosUnauthorized,
    }),
    [currentUser]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
export {
  useAuth
};