import React from 'react';
import './ContextMenu.css';

export default function ContextMenu({ options, posX, posY }) {
    const styleUl = {
        top: posY,
        left: posX,
    }
    console.log('coords:', posX, posY)
    return (
        <ul style={styleUl} className='context-menu'>
        {
            options.map((option, key) => {
                const {
                    onClick,
                    text
                } = option;
                return (
                    <li
                        key={key}
                        onClick={onClick}
                        className='context-menu-item'
                    >
                        <span>{text}</span>
                    </li>
                )
            })
        }
        </ul>
    )
}