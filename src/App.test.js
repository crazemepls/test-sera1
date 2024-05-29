import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Home from './pages/Home';

jest.mock('axios');

// Note : I failed to install & setup jest on time. need too much troubleshooting
// Nonetheless, this is my unit test if the setup is successfull
// Obviously need some adjustment on the data mocked to match real data

it('Should render home page', async () => {
  render(<Home />);
  await waitFor(() => expect(screen.getByText('Pokedex')).toBeInTheDocument());
});

it('Should fetches and displays Pokemon', async () => {
  const pokemons = [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];

  axios.get.mockResolvedValueOnce({ data: { results: pokemons } });

  render(<Home />);

  await waitFor(() => expect(screen.getByText('Bulbasaur')).toBeInTheDocument());
  expect(screen.getByText('Ivysaur')).toBeInTheDocument();
});

it('Should fetches and displays Pokemon types', async () => {
  const pokemonTypes = [
    { name: 'normal', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'fighting', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ];
  imageNormalUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/legends-arceus/1.png"
  
  axios.get.mockResolvedValueOnce({ data: { results: pokemonTypes } });

  render(<Home />);

   const image = screen.getByAltText('Pokemon');
   expect(image).toBeInTheDocument();
   expect(image).toHaveAttribute('src', imageNormalUrl);
});