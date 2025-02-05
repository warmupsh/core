import React from 'react';
import { Separator } from '@/components/ui/separator'; // Asegúrate de tener este componente disponible
import { Input } from '@/components/ui/input'; // Asegúrate de tener este componente disponible
import Layout from '@/components/Layout';
import { Star, ExternalLink } from 'lucide-react'; // Asegúrate de tener estos íconos disponibles
import { Card, CardContent } from "@/components/ui/card"; // Asegúrate de tener estos componentes disponibles
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

interface ListPageProps {
  title: string;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  favorites: { [key: string]: boolean };
  toggleFavorite: (id: string | number) => void;
  items: { id: number | string, name: string, team?: string, team_id?: string }[];
}

export default function ListPage({ title, searchTerm, setSearchTerm, favorites, toggleFavorite, items }: ListPageProps) {
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    const isAFavorite = favorites[a.id] ? -1 : 1;
    const isBFavorite = favorites[b.id] ? -1 : 1;
    if (isAFavorite !== isBFavorite) {
      return isAFavorite - isBFavorite;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <Input
        type="text"
        placeholder={`Search ${title.toLowerCase()}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Separator className="mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => toggleFavorite(item.id)}>
                      {favorites[item.id] ? (
                        <Star className="text-yellow-500 w-6 h-6" />
                      ) : (
                        <Star className="text-gray-400 w-6 h-6" />
                      )}
                    </button>
                  </div>
                  <Link to={`/${title.toLowerCase()}/${item.id}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="text-gray-400 w-4 h-4" />
                  </Link>
                </div>
                <Link to={`/${title.toLowerCase()}/${item.id}`} className="font-medium">
                  {item.name}
                </Link>
                {item.team && item.team_id && (
                  <Link to={`/teams/${item.team_id}`} className="text-sm text-blue-500">
                    {item.team}
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
