import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes Pokemon.js', () => {
  it('Verifica se é renderizado um card com informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    const averageWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const img = screen.getByRole('img', { alt: /pikachu sprite/i });
    expect(pokemonName).toBeInTheDocument();
    expect(type.innerHTML).toEqual('Electric');
    expect(averageWeight).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  it('Verifica se existe um link para ver detalhes do pokemon', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link.href).toBe('http://localhost/pokemons/25');
  });

  it('Verifica se ao clicar no link detalhes, redireciona para a page correta', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('Verifica se existe um ícone de estrela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const icon = screen.getAllByRole('img');
    expect(icon[2]).toBeInTheDocument();
  });
});
// Requisito feito com ajuda do Denilson Santuchi.
