import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes NotFound', () => {
  it('verifica se existe um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(title).toBeInTheDocument();
  });

  it('Verifica se a página possui a imagem correta', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', { name: /Pikachu crying because the page/i });

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
