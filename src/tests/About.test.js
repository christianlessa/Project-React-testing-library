import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testando o componente "About.js"', () => {
  it('Verifica se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const titleInH2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titleInH2).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex,/i);
    expect(paragraphOne).toBeInTheDocument();

    const paragraphTwo = screen.getByText(/One can filter Pokémons by type,/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
