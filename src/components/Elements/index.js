import React from 'react';
import './Elements.css';

export function SButton(props) {
    return (
        <button onClick={props.onClick} className='standart-button'>{props.text}</button>
    );
}

export function SSubmit(props) {
    return (
        <input type='submit' onClick={props.onClick} className='standart-button'></input>
    );
}