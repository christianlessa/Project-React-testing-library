import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testando os componentes App.js', () => {
  test('Verifica se contém na tela os links Home, About e Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorites).toBeInTheDocument();
  });

  test('Ao clicar no link "Home" é redirecionada para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  test('Ao clicar no link "About" é redirecionada para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  test('Ao clicar no link "Favorite Pokémons" redireciona para rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);
    const favorites = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favorites);
    expect(history.location.pathname).toBe('/favorites');
  });
});
