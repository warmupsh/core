import { useState, useEffect } from 'react';
import ListPage from '@/components/ListPage'; // Asegúrate de tener este componente disponible
import { useNavigate } from 'react-router-dom';
import { teamList } from '@/data/teams'; // Importa teamList del datasource mokeado
import { getFavorites, toggleFavorite } from '@/utils/favorites'; // Importa las funciones de utilidades

export default function Teams() {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFavorites(getFavorites('team'));
  }, []);

  const handleToggleFavorite = (teamId: string) => {
    setFavorites(toggleFavorite('team', teamId));
  };

  return (
    <ListPage
      title="Teams"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      favorites={favorites}
      toggleFavorite={handleToggleFavorite}
      items={teamList}
    />
  );
}
