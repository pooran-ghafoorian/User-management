import React from 'react';
import { Main } from '../Main/index';
import { Header } from '../Header';


export const Layout: React.FC = ({ children }) => {
    return (
        <section>
            <Header />
            <Main>{children}</Main>
        </section>

    )
}