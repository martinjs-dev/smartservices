import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getTokenFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('token');
    };

    const token = getTokenFromUrl();

    if (token) {
      localStorage.setItem('smart_access', token);

      navigate('/dashboard');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <p>Redirection en cours...</p>
    </div>
  );
};

export default AuthCallback;
