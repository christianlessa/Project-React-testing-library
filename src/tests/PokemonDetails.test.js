import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes PokemonDetails.js', () => {
  it('Verifica se as informações dos Pokémons selecionados são exibidas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    userEvent.click(moreDetails);
    const title = screen.getByText('Pikachu Details');
    expect(title).toBeInTheDocument();

    const links = screen.getAllByRole('link');
    const THREE = 3;
    expect(links).toHaveLength(THREE);
    const sumary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(sumary).toBeInTheDocument();
    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Verifica se existe uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const gameLocation = screen.getByRole('heading', { name: /Game Loca/i, level: 2 });
    expect(gameLocation).toBeInTheDocument();
    const firstLocation = screen.getByText('Kanto Viridian Forest');
    expect(firstLocation).toBeInTheDocument();
    const secondLocation = screen.getByText('Kanto Power Plant');
    expect(secondLocation).toBeInTheDocument();

    const img = screen.getAllByAltText('Pikachu location');
    img.forEach((element) => expect(element).toBeInTheDocument());
    img.forEach((element) => expect(element.alt).toBe('Pikachu location'));
    img.forEach((element) => expect(element.src).toBeTruthy());
    const checkBox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkBox).toBeInTheDocument();
    userEvent.click(checkBox);
    const pokemonIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokemonIcon).toBeInTheDocument();
    userEvent.click(checkBox);
    expect(pokemonIcon).not.toBeInTheDocument();
  });
});
// Requisito 7 feito com ajuda do Denilson Santuchi.
