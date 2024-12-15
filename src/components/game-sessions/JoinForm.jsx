import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';


export default function LoginForm() {
  const navigate = useNavigate();

  const onJoin = async (formData) => {
    const secret = formData.get('secret');
    navigate('/online-game', { state: { secret }, replace: true });
  };

  return (
    <Form action={onJoin}>
      <Form.Group className="">
        <Form.Control name="secret" type="text" className="form-control" placeholder="Game secret" required />
      </Form.Group>
      <Button type="submit" className="btn btn-primary w-100 btn-lg">
        <FontAwesomeIcon icon={faSquarePlus} />
        {' '}
        Join existing game
      </Button>
    </Form>
  );
};
