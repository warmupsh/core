import { useState, useEffect } from 'react';
import ListPage from '@/components/ListPage'; // Use ListPage component for consistent layout
import { memberList } from '@/data/members'; // Importa memberList del datasource mokeado
import { getFavorites, toggleFavorite } from '@/utils/favorites'; // Importa las funciones de utilidades

const Member = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setFavorites(getFavorites('member'));
  }, []);

  const handleToggleFavorite = (memberId: string) => {
    setFavorites(toggleFavorite('member', memberId));
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
