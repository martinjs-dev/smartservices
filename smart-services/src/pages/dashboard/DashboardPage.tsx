import React from "react";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button className="bg-primary text-white py-3 px-6 rounded-md hover:bg-orange-700">
        Bouton Principal
      </button>
      <button className="bg-white text-primary border border-primary py-3 px-6 rounded-md hover:shadow-md">
        Bouton Secondaire
      </button>
      {/* Contenu du dashboard */}
    </div>
  );
};

export default DashboardPage;
