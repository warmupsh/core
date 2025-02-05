import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ViewPage from '@/components/ViewPage'; // Asegúrate de tener este componente disponible
import { teamDetails } from '@/data/teams'; // Importa teamDetails del datasource mokeado
import { projectList } from '@/data/projects'; // Importa projectList del datasource mokeado
import { memberList } from '@/data/members'; // Importa memberList del datasource mokeado
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'; // Asegúrate de tener estos componentes disponibles
import { Button } from '@/components/ui/button'; // Asegúrate de tener este componente disponible
import { getFavorites, toggleFavorite } from '@/utils/favorites'; // Importa las funciones de utilidades
import { Star } from 'lucide-react';

export default function TeamView() {
  const { id } = useParams();
  const team = teamDetails[id as keyof typeof teamDetails];
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setFavorites(getFavorites('project'));
  }, []);

  if (!team) {
    return <Navigate to="/404" />;
  }

  const assignedProjects = projectList.filter(project => project.team_id === id);
  const assignedMembers = memberList.filter(member => member.team_id === id);
  const totalPages = Math.ceil(assignedProjects.length / itemsPerPage);
  const paginatedProjects = assignedProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleToggleFavorite = (projectId: string) => {
    toggleFavorite('team', projectId);
    setFavorites(getFavorites('team'));
  };

  const handleToggleProjectFavorite = (projectId: string) => {
    toggleFavorite('project', projectId);
    setFavorites(getFavorites('project'));
  };

  return (
    <ViewPage itemId={id as string} collection="team" favorites={favorites} toggleFavorite={handleToggleFavorite}>
      <h1 className="text-2xl font-bold mb-6">{team.name}</h1>
      <p>{team.description}</p>
      <h2 className="text-xl font-bold mt-6">Assigned Projects</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Favorite</TableHead>
            <TableHead>Project Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProjects.map(project => (
            <TableRow key={`project_${project.id}`}>
              <TableCell>
                <button onClick={() => handleToggleProjectFavorite(project.id)}>
                  {favorites[project.id] ? (
                    <Star className="text-yellow-500" />
                  ) : (
                    <Star className="text-gray-400" />
                  )}
                </button>
              </TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`} className="text-blue-500">
                  {project.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/projects/${project.id}`} className="text-blue-500">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4">
        <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </Button>
      </div>
      <h2 className="text-xl font-bold mt-6">Team Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignedMembers.map(member => (
            <TableRow key={`member_${member.id}`}>
              <TableCell>
                <Link to={`/members/${member.id}`} className="text-blue-500">
                  {member.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link to={`/members/${member.id}`} className="text-blue-500">
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ViewPage>
  );
}
