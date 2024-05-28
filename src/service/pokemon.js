// import axiosInstance from "../helper/interceptor";
// import { BASE_URL } from "./books";
import axios from "axios";

const BASE_URL = 'https://pokeapi.co/api/v2/'
const limit = 200

const getAllPokemon = ( offset) => {
    return axios.get(BASE_URL + `pokemon?limit=${limit}&offset=${limit*offset}`,
    )
};

const getAllPokemonTypes = () => {
        return axios.get(BASE_URL + 'type/',
    )
};

const getPokemonsBasedOnType = (param) =>{
    return axios.get(BASE_URL + `type/${param}`,
    )
}

const getPokemonDetail = (param) =>{
    return axios.get(BASE_URL + `pokemon/${param}`,
    )
}

const getPokemonSpeciesDetail = (param) =>{
    return axios.get(BASE_URL + `pokemon-species/${param}`,
    )
}

const getPokemonEvoDetail = (url) =>{
    const parts = url?.split('/');
    const evoChainId = parts[parts.length - 2];
    return axios.get(BASE_URL + `evolution-chain/${evoChainId}`,
    )
}

const PokemonService = {
    getAllPokemon,
    getAllPokemonTypes,
    getPokemonsBasedOnType,
    getPokemonDetail,
    getPokemonSpeciesDetail,
    getPokemonEvoDetail
};

export default PokemonService;