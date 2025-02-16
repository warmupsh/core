export const getFavorites = (type: string): { [key: string]: boolean } => {
  const favorites = localStorage.getItem(`favorites_${type}`);
  return favorites ? JSON.parse(favorites) : {};
};

export const toggleFavorite = (type: string, id: string): { [key: string]: boolean } => {
  const favorites = getFavorites(type);
  if (favorites[id]) {
    delete favorites[id];
  } else {
    favorites[id] = true;
  }
  localStorage.setItem(`favorites_${type}`, JSON.stringify(favorites));
  return favorites;
};
