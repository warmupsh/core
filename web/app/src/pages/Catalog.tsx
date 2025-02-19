import React, { useState, useEffect } from 'react';
import ListPage from '@/components/ListPage';
import { projectList } from '@/data/projects';
import { getFavorites, toggleFavorite } from '@/utils/favorites';

export default function Catalog() {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFavorites(getFavorites('project'));
  }, []);

  const handleToggleFavorite = (projectId: string) => {
    setFavorites(toggleFavorite('project', projectId));
  };

  return (
    <ListPage
      title="Projects"
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      favorites={favorites}
      toggleFavorite={handleToggleFavorite}
      items={projectList}
    />
  );
}