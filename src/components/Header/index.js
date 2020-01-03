import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="header-wrapper">
                <div className="header-button">
                    <div className="header-line"></div>
                    <div className="header-line"></div>
                    <div className="header-line"></div>
                </div>
                <h1 className="header-caption">
                    <span className="capitalized">code</span>
                    <span className="capitalized">jam</span>
                    <span className="capitalized">palette</span>
                </h1>
            </div>
            <p id="tools_visibility_trigger" className="header-dots">...</p>
        </header>
    )
}