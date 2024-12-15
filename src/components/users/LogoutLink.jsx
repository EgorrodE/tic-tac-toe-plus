import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { LogoutRequest } from '@requests/users';
import { useAuth } from '@providers/authProvider';

export default function LogoutLink() {
  const { setCurrentUser } = useAuth();

  const onLogout = () => LogoutRequest().then(() => setCurrentUser());

  return (
    <Button variant="link" onClick={onLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
      {' '}
      Log out
    </Button>
  )
}