import React from 'react';
import '../Main/style.css';

export const Main: React.FC = ({children}) => {
    return (
        <main className='main'>
            {children}
        </main>
    )
}