import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const {isAuthenticated, loadUserData, user, logout } = useAuth();

  useEffect(() => {
    if(isAuthenticated) {
      loadUserData();
    }
  }, [isAuthenticated, loadUserData]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ): (
        <p>Carregando...</p>

      )}
    </div>
  );
}

export default Dashboard