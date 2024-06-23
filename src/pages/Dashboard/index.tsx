import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  useEffect(() => {
    if(user) {
      console.log('Dados do usuário: ', user);
    } else {
      console.log(('Nenhum usuário autenticado'));
      
    }
  }, [user]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Nome: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard