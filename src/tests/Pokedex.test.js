import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes Pokedex.js', () => {
  it('Verifica se existe o título "Encountered pokémons"', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe um botão com o texto "Próximo pokémon"', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se os pokémons são exibidos um a um ao clicar no botão', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    const button = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(pokemon.innerHTML).toBe('Pikachu');

    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Charmander');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Caterpie');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Ekans');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Alakazam');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Mew');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Rapidash');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Snorlax');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Dragonair');
    userEvent.click(button);
    expect(pokemon.innerHTML).toBe('Pikachu');
  });

  it('Verifica se é mostrado somente um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });

  it('Testa se existem botões de filtro por tipo sem repetição', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const numberOfButtonTypes = 7;
    expect(typeButtons).toHaveLength(numberOfButtonTypes);
    expect(typeButtons[0].innerHTML).toBe('Electric');
    expect(typeButtons[1].innerHTML).toBe('Fire');
    expect(typeButtons[2].innerHTML).toBe('Bug');
    expect(typeButtons[3].innerHTML).toBe('Poison');
    expect(typeButtons[4].innerHTML).toBe('Psychic');
    expect(typeButtons[5].innerHTML).toBe('Normal');
    expect(typeButtons[6].innerHTML).toBe('Dragon');
  });

  it('ao clicar em um botão do tipo, é exibido somente pokemons daquele tipo', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const next = screen.getByTestId('next-pokemon');
    const allButton = screen.getByRole('button', { name: 'All' });

    userEvent.click(typeButtons[0]);
    const type = screen.getByTestId('pokemon-type');
    expect(type.innerHTML).toBe('Electric');
    expect(next.disabled).toBeTruthy();

    userEvent.click(typeButtons[1]);
    expect(type.innerHTML).toBe('Fire');
    userEvent.click(next);
    expect(type.innerHTML).toBe('Fire');

    userEvent.click(typeButtons[2]);
    expect(type.innerHTML).toBe('Bug');
    expect(next.disabled).toBeTruthy();

    userEvent.click(typeButtons[3]);
    expect(type.innerHTML).toBe('Poison');
    expect(next.disabled).toBeTruthy();

    userEvent.click(typeButtons[4]);
    expect(type.innerHTML).toBe('Psychic');
    userEvent.click(next);
    expect(type.innerHTML).toBe('Psychic');

    userEvent.click(typeButtons[5]);
    expect(type.innerHTML).toBe('Normal');
    expect(next.disabled).toBeTruthy();

    userEvent.click(typeButtons[6]);
    expect(type.innerHTML).toBe('Dragon');
    expect(next.disabled).toBeTruthy();

    expect(allButton).toBeVisible();
  });

  it('Testa se a funcionalidade do botão All está correta', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: 'All' });
    const nextButton = screen.getByTestId('next-pokemon');
    const type = screen.getByTestId('pokemon-type');
    expect(allButton).toBeInTheDocument();

    userEvent.click(allButton);
    expect(type.innerHTML).toBe('Electric');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Fire');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Bug');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Poison');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Psychic');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Psychic');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Fire');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Normal');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Dragon');
    userEvent.click(nextButton);
    expect(type.innerHTML).toBe('Electric');
  });
});
// Requisito feito com ajuda do Denilson Santuchi.
