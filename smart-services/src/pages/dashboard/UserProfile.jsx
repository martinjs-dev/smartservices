// src/pages/UserProfile.jsx
import { useState } from 'react';

const servicesList = [
  { id: 1, name: 'Service A', description: 'Description du Service A' },
  { id: 2, name: 'Service B', description: 'Description du Service B' },
  { id: 3, name: 'Service C', description: 'Description du Service C' },
];

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedServices, setSelectedServices] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-heading mb-4 text-primary">Profil Utilisateur</h1>
      
      <div className="flex items-center space-x-6 mb-6">
        <img 
          src="/path/to/profile-pic.jpg" 
          alt="Profile" 
          className="w-24 h-24 rounded-full border-2 border-primary"
        />
        <div>
          <h2 className="text-xl font-heading text-textPrimary">Nom d&apos;Utilisateur</h2>
          <p className="text-textSecondary">email@example.com</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={() => handleTabChange('personal')} 
            className={`py-2 px-4 rounded-md ${activeTab === 'personal' ? 'bg-primary text-white' : 'bg-gray-200 text-textPrimary'}`}
          >
            Informations Personnelles
          </button>
          <button 
            onClick={() => handleTabChange('services')} 
            className={`py-2 px-4 rounded-md ${activeTab === 'services' ? 'bg-primary text-white' : 'bg-gray-200 text-textPrimary'}`}
          >
            Services Disponibles
          </button>
        </div>

        {activeTab === 'personal' && (
          <div>
            <h3 className="text-xl font-heading text-primary mb-4">Informations Personnelles</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-textPrimary font-medium mb-1">Nom</label>
                <input 
                  id="name" 
                  type="text" 
                  className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
                  placeholder="Nom complet"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-textPrimary font-medium mb-1">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label htmlFor="bio" className="block text-textPrimary font-medium mb-1">Bio</label>
                <textarea 
                  id="bio" 
                  rows="4" 
                  className="w-full bg-gray-100 text-textPrimary border border-gray-300 py-2 px-3 rounded-md"
                  placeholder="Parlez-nous un peu de vous"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-700"
              >
                Enregistrer les Modifications
              </button>
            </form>
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <h3 className="text-xl font-heading text-primary mb-4">Services Disponibles</h3>
            <div className="space-y-4">
              {servicesList.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
                  <div>
                    <h4 className="text-lg font-heading text-textPrimary">{service.name}</h4>
                    <p className="text-textSecondary">{service.description}</p>
                  </div>
                  <button 
                    onClick={() => handleServiceToggle(service.id)} 
                    className={`py-2 px-4 rounded-md ${selectedServices.includes(service.id) ? 'bg-primary text-white' : 'bg-gray-200 text-textPrimary'}`}
                  >
                    {selectedServices.includes(service.id) ? 'Désactiver' : 'Activer'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
