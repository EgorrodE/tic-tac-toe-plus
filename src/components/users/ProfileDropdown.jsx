import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '@providers/authProvider';
import LogoutLink from './LogoutLink';

export default function ProfileDropdown() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Link to="/login" className="btn btn-link">Log in</Link>;
  }

  return (
    <DropdownButton
      align="start"
      title={(
        <FontAwesomeIcon icon={faCircleUser} />
      )}
      id="dropdown-menu-align-end"
    >
      <Dropdown.ItemText>{currentUser.email}</Dropdown.ItemText>
      <Dropdown.ItemText>id: {currentUser.id}</Dropdown.ItemText>
      <Dropdown.Divider />
      <Dropdown.ItemText><LogoutLink /></Dropdown.ItemText>
    </DropdownButton>
  )
}