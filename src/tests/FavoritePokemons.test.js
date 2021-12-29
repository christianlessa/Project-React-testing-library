import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes FavoritePokémons.js', () => {
  it('Exibe mensagem "No favorite pokemon found" caso não haja favoritados', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    const title = screen.getByText(/No favorite pokemon found/i);

    expect(title).toBeInTheDocument();
  });

  it('Verifica se é exibido os cards dos pokemons favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /More details/i });
    userEvent.click(moreDetails);
    const checkBox = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(checkBox);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    const title = screen.getByText(/Pikachu/i);
    expect(title).toBeInTheDocument();
  });
});
