"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const token = localStorage.getItem("access");

    if (!token) {
      toast.info("Please sign in or register to add favorites ❤️");
      return;
    }

    try {

      if (isFavorite(movie.id)) {

        await removeFavorite(movie.id);
        toast.success("Removed from Favorites");

      } else {

        await addFavorite(movie);
        toast.success("Added to Favorites ❤️");

      }

      await loadFavorites();

    } catch (err) {

      console.error(err);
      toast.error("Something went wrong.");

    }

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