import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  beforeEach(() => renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite showDetailsLink />,
  ));

  it('Verifica se é renderizado um card com informações de determinado pokémon', () => {
    const name = screen.getByText(/pikachu/i);
    expect(name).toHaveTextContent(/Pikachu/i);

    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/Electric/i);

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/average weight: 6.0 kg/i);

    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(img).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  it('Verifica se na Pokédex possui um link de detalhes do Pokémon.', () => {
    const moreDetails = screen.getByText(/More Details/i);
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    const favoritePokemon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
  });
});
