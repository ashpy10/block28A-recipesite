function getFavoritesKey(user) {
    return `favorites_${user?.email || 'guest'}`;
  }
  
  export function getFavorites(user) {
    const key = getFavoritesKey(user);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }
  
  export function saveToFavorites(user, recipe) {
    const key = getFavoritesKey(user);
    const current = getFavorites(user);
    const exists = current.find((r) => r.idMeal === recipe.idMeal);
    if (!exists) {
      const updated = [...current, recipe];
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }
  
  export function removeFromFavorites(user, idMeal) {
    const key = getFavoritesKey(user);
    const current = getFavorites(user);
    const updated = current.filter((r) => r.idMeal !== idMeal);
    localStorage.setItem(key, JSON.stringify(updated));
  }
  