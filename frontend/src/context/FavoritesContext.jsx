"use client";

import { createContext, useContext, useEffect, useState } from "react";

import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "@/services/favoriteService";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {

  const [favorites, setFavorites] = useState([]);

  async function loadFavorites() {

    try {

      const movies = await getFavorites();

      setFavorites(movies);

    } catch (err) {

      console.log(err);

    }

  }

  useEffect(() => {

    loadFavorites();

  }, []);

  async function toggleFavorite(movie) {

    if (isFavorite(movie.id)) {

      await removeFavorite(movie.id);

    } else {

      await addFavorite(movie);

    }

    await loadFavorites();

  }

  function isFavorite(id) {

    return favorites.some(
      (movie) => movie.id === id
    );

  }

  return (

    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >

      {children}

    </FavoritesContext.Provider>

  );

}

export function useFavoritesContext() {

  return useContext(FavoritesContext);

}