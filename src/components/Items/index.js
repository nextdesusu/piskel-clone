import React from 'react';
import './Items.css';



export function ToolsItem(props){
    const {
        onClick,
        text,
        iconSrc,
        highlighted,
    } = props;
    return (
        <li onClick={onClick} className={`tools-item ${highlighted ? 'tools-item-highlighted' : ''}`}>
            <img src={iconSrc} alt='' className='tools-icon--picture'></img>
            <p className='tools-text'>{text}</p>
        </li>
    )
}

export function ColorItem(props){
    const {
        text,
        colorName,
        onClick
    } = props;
    const colorStyle = {
        backgroundColor: colorName,
    }
    return (
        <li onClick={onClick} className='tools-item'>
            <div style={colorStyle} className='tools-icon--color'></div>
            <p className='tools-text'>{text || colorName}</p>
        </li>
    )
}