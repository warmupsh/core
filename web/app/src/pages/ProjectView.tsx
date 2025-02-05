import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ViewPage from '@/components/ViewPage'; // Asegúrate de tener este componente disponible
import { projectDetails } from '@/data/projects'; // Importa projectDetails del datasource mokeado
import { getFavorites, toggleFavorite } from '@/utils/favorites'; // Importa las funciones de utilidades
import { Star } from 'lucide-react';

export default function ProjectView() {
  const { id } = useParams();
  const project = projectDetails[id as keyof typeof projectDetails];
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [teamFavorites, setTeamFavorites] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setFavorites(getFavorites('project'));
    setTeamFavorites(getFavorites('team'));
  }, []);

  const handleToggleFavorite = (projectId: string) => {
    toggleFavorite('project', projectId);
    setFavorites(getFavorites('project'));
  };

  const handleToggleTeamFavorite = (teamId: string) => {
    toggleFavorite('team', teamId);
    setTeamFavorites(getFavorites('team'));
  };

  if (!project) {
    return <Navigate to="/404" />;
  }

  return (
    <ViewPage itemId={id as string} collection="project" favorites={favorites} toggleFavorite={handleToggleFavorite}>
      <h1 className="text-2xl font-bold mb-6">{project.name}</h1>
      <p>{project.description}</p>
      <p className="flex items-center">
        Team: 

        <button onClick={() => handleToggleTeamFavorite(project.team_id)} className="mr-2">
          {teamFavorites[project.team_id] ? (
            <Star className="text-yellow-500 w-4 h-4" />
          ) : (
            <Star className="text-gray-400 w-4 h-4" />
          )}
        </button>
        <Link to={`/teams/${project.team_id}`} className="text-blue-500 ml-1">
          {project.team}
        </Link>
      </p>
    </ViewPage>
  );
}
