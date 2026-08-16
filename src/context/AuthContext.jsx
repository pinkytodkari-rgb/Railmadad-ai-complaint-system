import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Default demo user: Passenger
  const [user, setUser] = useState({
    name: 'Citizen Passenger',
    email: 'demo@passenger.com',
    role: 'PASSENGER',
    id: 'PSG-9042'
  });

  const login = (role, credentials) => {
    if (role === 'PASSENGER') {
      setUser({
        name: 'Citizen Passenger',
        email: credentials?.id || 'demo@passenger.com',
        role: 'PASSENGER',
        id: 'PSG-9042'
      });
    } else if (role === 'STAFF') {
      setUser({
        name: 'Ramesh Kumar',
        role: 'STAFF',
        id: credentials?.id || 'STAFF001',
        designation: 'Coach Maintenance Officer',
        station: 'Surat'
      });
    } else if (role === 'ADMIN') {
      setUser({
        name: 'Rajesh Verma',
        role: 'ADMIN',
        id: credentials?.id || 'ADMIN001',
        designation: 'System Administrator (Northern Zone)'
      });
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, role: user?.role || null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
