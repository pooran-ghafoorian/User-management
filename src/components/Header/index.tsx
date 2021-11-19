import React from 'react';
import './style.css';
import user from '../../assets/image/1.png';


export const Header: React.FC = () => {
    return (
        <header className='header'>
            <img src={user}  />
            <span>پنل مدیریتی تدبیر</span>
        </header>

    )
}