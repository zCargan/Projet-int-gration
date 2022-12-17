import ButtonFollow from "../components/BoutonFollow";
import { render } from '@testing-library/react';
import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { screen } from "@testing-library/react";




describe('Test function boutonFollow', () => {
    it('Devrait renvoyer le bouton follow sans crash',() => {
        render(<Router><ButtonFollow/></Router>)

    })
})





