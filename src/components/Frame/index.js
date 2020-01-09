import React from 'react';
import './Frame.css';

export default function Frame(props) {
    const  {
        frameRef,
        id,
        onMouseDown,
        data,
    } = props;
    return (
        <div>
            <img
                alt={`img:${id}`}
                src={data}
                onMouseDown={onMouseDown}
                data-id={id}
                ref={frameRef}
                className='frame droppable'>
            </img>
        </div>
    );
}