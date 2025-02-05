import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '@/components/ui/separator'; // Asegúrate de tener este componente disponible
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button'; // Asegúrate de tener este componente disponible
import { ArrowLeft, Star } from 'lucide-react'; // Asegúrate de tener estos íconos disponibles
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbEllipsis, BreadcrumbPage } from '@/components/ui/breadcrumb'; // Asegúrate de tener estos componentes disponibles
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface ViewPageProps {
  children: React.ReactNode;
  itemId: string;
  collection: string;
  toggleFavorite: (id: string) => void;
  favorites: { [key: string]: boolean };
}

export default function ViewPage({ children, itemId, collection, toggleFavorite, favorites }: ViewPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <button onClick={() => toggleFavorite(itemId)}>
          {favorites[itemId] ? (
            <Star className="text-yellow-500" />
          ) : (
            <Star className="text-gray-400" />
          )}
        </button>
      </div>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1">
                <BreadcrumbEllipsis className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem>Documentation</DropdownMenuItem>
                <DropdownMenuItem>Themes</DropdownMenuItem>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            return (
              <BreadcrumbItem key={`item_${index}`}>
                {index < pathnames.length - 1 && <BreadcrumbLink href={to}>
                  {value}
                </BreadcrumbLink>}
                {index < pathnames.length - 1 && <BreadcrumbSeparator/>}
                {index === pathnames.length - 1 && <BreadcrumbItem >
                  <BreadcrumbPage>{value}</BreadcrumbPage>
                </BreadcrumbItem>}
              </BreadcrumbItem>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <Separator className="mb-6" />
      {children}
    </Layout>
  );
}
