import AuthProvider from '@providers/authProvider';
import Routes from './routes';

export default function App() {
  return (
    <div>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}
