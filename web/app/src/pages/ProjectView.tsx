import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ViewPage from '@/components/ViewPage';
import { projectDetails } from '@/data/projects';
import { getFavorites, toggleFavorite } from '@/utils/favorites';
import { Star } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';

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
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <p>{project.description}</p>
        </div>
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold mb-4">Teams:</h2>
            <div className="grid grid-cols-1 gap-4">
              {project.teams.map((team, index) => (
                <React.Fragment key={team.team_id}>
                  <div className="flex items-center p-2">
                    <button onClick={() => handleToggleTeamFavorite(team.team_id)} className="mr-2">
                      {teamFavorites[team.team_id] ? (
                        <Star className="text-yellow-500 w-4 h-4" />
                      ) : (
                        <Star className="text-gray-400 w-4 h-4" />
                      )}
                    </button>
                    <Link to={`/teams/${team.team_id}`} className="text-blue-500 ml-1">
                      {team.name}
                    </Link>
                  </div>
                  {index < project.teams.length - 1 && <Separator />}
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ViewPage>
  );
}
