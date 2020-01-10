import React from 'react';
import './Frames.css';

export default class Frames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: null,
        }
    }

    onDragStart = (event) => {
        const frame = event.target;
        this.setState({ dragged: frame });
    }

    onDragEnd = (event) => {
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDragEnter = (event) => {
        const { target } = event;
        if (!target) return;
        if (target.classList.contains('droppable')) {
            target.classList.add('enter-droppable');
        }
    }

    onDragLeave = (event) => {
        const { target } = event; 
        if (!target) return;
        if (target.classList.contains('droppable')) {
            target.classList.remove('enter-droppable');
        } 
    }

    onDrop = (event) => {
        event.preventDefault();
        const  { target } = event;
        if (target.classList.contains('droppable')) {
            const { swapFrames } = this.props;
            const { dragged } = this.state;
            target.classList.remove('enter-droppable');
            const frameId = Number(dragged.getAttribute('data-id'));
            const elemBelowId = Number(event.target.getAttribute('data-id'));
            swapFrames(frameId, elemBelowId);
        }
    }

    render() {
        const {
            props,
            state,
            onDragStart,
            onDragEnd,
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop,
        } = this;
        const {
            frames,
        } = props;
        return (
            <div
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className='frames-wrapper'
            >
                {
                    frames.map((frameData, id) => {
                        const {
                            text,
                            data,
                            frameRef,
                        } = frameData;
                        return (
                            <div key={id} className='frame-wrapper'>
                                <img
                                    alt={`frame:${id}`}
                                    src={data}
                                    data-id={id}
                                    ref={frameRef}
                                    className='frame droppable'>
                                </img>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}