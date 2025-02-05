import React, { useState } from 'react';
import ListPage from '@/components/ListPage'; // Use ListPage component for consistent layout
import { memberList } from '@/data/members'; // Importa memberList del datasource mokeado

const Member = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  const toggleFavorite = (id: string) => {
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <ListPage
      title="Members"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      items={memberList}
    />
  );
};

export default Member;
