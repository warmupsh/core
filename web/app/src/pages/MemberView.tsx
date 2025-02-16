import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ViewPage from '@/components/ViewPage';
import { memberDetails } from '@/data/members';
import { getFavorites, toggleFavorite } from '@/utils/favorites';

const MemberView = () => {
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const { id } = useParams<{ id: string }>();
  const member = memberDetails[id as keyof typeof memberDetails];

  if (!member) {
    return <Navigate to="/404" />;
  }

  useEffect(() => {
    setFavorites(getFavorites('member'));
  }, []);

  const handleToggleFavorite = (memberId: string) => {
    toggleFavorite('member', memberId);
    setFavorites(getFavorites('member'));
  };

  return (
    <ViewPage itemId={id as string} collection="member" favorites={favorites} toggleFavorite={handleToggleFavorite}>
      <h1 className="text-2xl font-bold mb-6">{member.name}</h1>
      <p className="mb-4">
        Team: <Link to={`/teams/${member.team_id}`} className="text-blue-500">{member.team}</Link>
      </p>
      <p>{member.description}</p>
    </ViewPage>
  );
};

export default MemberView;