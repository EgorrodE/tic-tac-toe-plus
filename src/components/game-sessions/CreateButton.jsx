import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';

import { CreateRequest } from '@requests/game-sessions';
import Spinner from '@components/Spinner';

export default function LoginForm() {
  const navigate = useNavigate();
  const [error, setError] = useState(' ');
  const [loading, setLoading] = useState(false);

  const onCreate = async () => {
    setLoading(true);
    CreateRequest().then((result) => {
      if (result.status) {
        navigate('/online-game', { state: { secret: result.secret }, replace: true });
      } else {
        setError(result.message);
      }
      setLoading(false);
    })
  };

  return (
    <>
      <Button disabled={loading} onClick={onCreate} variant="success" size="lg" className="w-100">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <FontAwesomeIcon icon={faDice} />
            {' '}
            Create new game
          </>
        )}
      </Button>
      <div>
        <span className="text-danger">{error}</span>
      </div>
    </>
  );
};
