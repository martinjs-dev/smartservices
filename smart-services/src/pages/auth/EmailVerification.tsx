import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = "http://localhost:3000";

interface VerifyEmailResponse {
  success: boolean;
  message?: string;
}

const EmailVerification: React.FC = () => {
  const [verificationMessage, setVerificationMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
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
      const response = await axios.get<VerifyEmailResponse>(backendUrl + '/auth/verify-email', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setVerificationMessage('Votre email a été vérifié avec succès.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.data.message || 'Échec de la vérification de l\'email.');
      }
    } catch (err) {
      setError('Erreur lors de la vérification de l\'email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-md w-full max-w-md text-center">
        {isLoading ? (
          <p className="text-gray-600">Vérification de votre email en cours...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-green-500">{verificationMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;
