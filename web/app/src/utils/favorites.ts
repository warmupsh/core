export function getFavorites(collection: string): { [key: string]: boolean } {
    const favorites = sessionStorage.getItem(`favorites_${collection}`);
    return favorites ? JSON.parse(favorites) : {};
}

export function toggleFavorite(collection: string, id: string): { [key: string]: boolean } {
    const favorites = getFavorites(collection);

    if (favorites[id]) {
        delete favorites[id];
    } else {
        favorites[id] = true;
    }

    sessionStorage.setItem(`favorites_${collection}`, JSON.stringify(favorites));
    return favorites;
}
