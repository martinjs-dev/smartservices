import axios from "axios";

const backendUrl = "http://localhost:3000";

const CheckEmail = () => {
  const resendEmailVerificationToken = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("smart_access");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(
        backendUrl + "/auth/email-verify",
        config
      );
      console.log("Email de vérification renvoyé", response.data);
    } catch (error) {
      console.error(
        `Erreur lors du renvoie de l'email`,
        error.response ? error.response.data : error.message
      );
    }

    window.location.reload();

  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Vérifiez vos emails
        </h2>
        <p className="text-textPrimary text-center">
          Un email de confirmation vous a été envoyé. Veuillez vérifier votre
          boîte de réception et cliquer sur le lien qui vous a été envoyé.
        </p>
        <p className="text-center text-textSecondary mt-4">
          Vous n'avez pas reçu l'email ?{" "}
          <span
            onClick={resendEmailVerificationToken}
            className="text-secondary hover:text-orange-600 cursor-pointer"
          >
            Renvoyer l'email
          </span>
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
