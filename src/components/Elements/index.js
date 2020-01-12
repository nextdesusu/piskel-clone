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

export function SInput(props) {
    const {
        id,
        name,
        value,
        onChange,
        min,
        max,
        step,
    } = props;
    return (
        <input
            name={name && name}
            id={id && id}
            value={value && value}
            className='standart-slider'
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            type='range'
        >
        </input> 
    )
}