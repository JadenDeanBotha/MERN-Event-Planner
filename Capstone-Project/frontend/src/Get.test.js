import React from "react";
import { render, screen } from '@testing-library/react'
import Header from "./components/Header";

it('Renders Header component', function(){
    render(<Header />);
    let headerElement = screen.getByTestId('navbar-test')
})


