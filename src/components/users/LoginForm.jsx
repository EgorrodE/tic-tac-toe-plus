import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { useAuth } from '@providers/authProvider';
import { LoginRequest } from '@requests/users';


export default function LoginForm() {
  const [error, setError] = useState(' ');
  const { setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const onLogin = async (formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    LoginRequest(email, password).then((result) => {
      if (result.status) {
        setCurrentUser(result.user);
        navigate("/", { replace: true });
      } else {
        setError(result.message);
      }
    });
  };

  return (
    <Form action={onLogin}>
      <Form.Group className="mb-2">
        <Form.Control name="email" type="email" className="form-control" placeholder="Email" required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control name="password" type="password" className="form-control" placeholder="Password" required />
      </Form.Group>
      <div>
        <span className="text-danger">{error}</span>
      </div>
      <Button type="submit" className="btn btn-primary">Log in</Button>
    </Form>
  );
};
