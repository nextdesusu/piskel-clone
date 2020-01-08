import React from 'react';
import './ContextMenu.css';

export default function ContextMenu({ options, posX, posY }) {
    const style = {
        top: posY,
        left: posX,
    }
    return (
        <div style={style} className="menu">
            <ul className="menu-options">
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
                                className='menu-option'
                            >
                                {text}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}