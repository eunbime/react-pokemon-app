import axios from "axios";
import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import { Link } from "react-router-dom";

export const PokeCard = ({ url, name }) => {
  const [pokemon, setPokemon] = useState("");

  // 처음 불러올 때만 동작
  useEffect(() => {
    fetchPokeDetailData();
  }, []);

  const fetchPokeDetailData = async () => {
    try {
      const response = await axios.get(url);
      const pokemonData = formatPokemonData(response.data);
      setPokemon(pokemonData);
    } catch (error) {
      console.error(error);
    }
  };

  // params에서 사용할 특정한 데이터를 가져온다.
  function formatPokemonData(params) {
    const { id, types, name } = params;
    const pokeData = {
      id,
      type: types[0].type.name,
      name,
    };
    return pokeData;
  }

  console.log(pokemon);

  const bg = `bg-${pokemon?.type}`; // pokemon이 있으면 값을 가져옴
  const border = `border-${pokemon?.type}`;
  const text = `text-${pokemon?.type}`;

  const img = `https://raw.githubusercontent.com/pokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`;

  return (
    <>
      {pokemon && (
        <Link
          to={`/pokemon/${name}`}
          className={`box-border rounded-lg ${border} w-[8.5rem] h-[8.5rem] z-0 bg-slate-800 justify-between items-center`}
        >
          <div
            className={`${text} h-[1.5rem] text-xs w-full pt-1 px-2 text-right rounded-t-lg`}
          >
            #{pokemon.id.toString().padStart(3, "00")}
          </div>
          <div className={`w-full f-6 flex items-center`}>
            <div
              className={`box-border relative flex w-full h-[5.5rem] basis justify-center items-center`}
            >
              <LazyImage url={img} alt={name} />
            </div>
          </div>
          <div
            className={`${bg} text-center text-xs text-zinc-100 h-[1.5rem] rounded-b-lg uppercase font-medium pt-1`}
          >
            {pokemon.name}
          </div>
        </Link>
      )}
    </>
  );
};
