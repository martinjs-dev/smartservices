import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = "https://api-smartservices.onrender.com";

const EmailVerification: React.FC = () => {
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [alreadyVerified, setAlreadyVerified] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      verifyEmail(token);
    } else {
      setError('Token non trouvé.');
      setIsLoading(false);
    }
  }, [location.search]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.get(`${backendUrl}/auth/email-verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.alreadyVerified) {
        setVerificationMessage(response.data.message);
        setAlreadyVerified(true);
      } else {
        setVerificationMessage(response.data.message);
        setAlreadyVerified(false);
      }
    } catch (err) {
      setError('Erreur lors de la vérification de l\'email.');
    } finally {
      setIsLoading(false);
    }
  };

 
    navigate('/login');
 

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md text-center">
        {isLoading ? (
          <p className="text-gray-600">Vérification de votre email en cours...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <p className="text-green-500">{verificationMessage}</p>
            {alreadyVerified && (
              <button 
                onClick={handleLogin} 
                className="bg-orange-500 text-white py-2 px-4 mt-4 rounded hover:bg-orange-600">
                Se connecter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
