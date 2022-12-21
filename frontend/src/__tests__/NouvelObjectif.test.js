import NouvelObjectif from "../pages/NouvelObjectif";
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'
import React from 'react';

it ('should render the form ', async () =>{
  render (<NouvelObjectif/>)

  const titreForm = await screen.findByText(/Créer un objectif :/i)
  const titreObj = await screen.findByText(/Titre de l'objectif :/i)
  const recurenceObj = await screen.findByText(/Récurence :/i)
  const typeObj = await screen.findByText(/Type d'objectif/i)
  const priveObj = await screen.findByText(/Rendre l'objectif privé/i)
  const accessObj = await screen.findByText(/Rendre l'objectif accesible à tout le monde/i)
  const descriptionObj = await screen.findByText(/Description de l'objectif :/i)
  const validerObj = await screen.findByText(/Valider/i)

  expect(titreForm).toBeInTheDocument();
  expect(titreObj).toBeInTheDocument();
  expect(recurenceObj).toBeInTheDocument();
  expect(typeObj).toBeInTheDocument();
  expect(priveObj).toBeInTheDocument();
  expect(accessObj).toBeInTheDocument();
  expect(descriptionObj).toBeInTheDocument();
  expect(validerObj).toBeInTheDocument();
})

