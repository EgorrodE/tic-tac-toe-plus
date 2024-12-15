import { useNavigate } from 'react-router-dom';
import { useAuth } from '@providers/authProvider';

const Logout = () => {
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser();
    navigate("/", { replace: true });
  };

  return <>Logout Page</>;
};

export default Logout;
