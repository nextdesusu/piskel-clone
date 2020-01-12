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
        const { dragged } = this.state;
        target.classList.remove('enter-droppable');
        const elemBelowId = target.getAttribute('data-id');
        if (elemBelowId !== null) {
            const { swapFrames } = this.props;
            target.classList.remove('enter-droppable');
            const frameId = Number(dragged.getAttribute('data-id'));
            swapFrames(frameId, Number(elemBelowId));
        }
    }

    highliteFrame = (event) => {
        const { target } = event;
        const { focusFrame } = this.props;
        const id = target.getAttribute('data-id');
        if (id === null) return;
        target.classList.add('highlited');
        focusFrame(id);
    }

    unhighliteFrame = (event) => {
        const { target } = event;
        if (target.getAttribute('data-id') === null) return;
        target.classList.remove('highlited');
    }

    render() {
        const {
            props,
            state,
            onDragStart,
            onDragOver,
            onDragEnter,
            onDragLeave,
            onDrop,
            focusFrame,
            highliteFrame,
            unhighliteFrame,
        } = this;
        const {
            frames,
            showContextMenu,
        } = props;
        return (
            <div
                onClick={focusFrame}
                onFocus={highliteFrame}
                onBlur={unhighliteFrame}
                onContextMenu={showContextMenu}
                onDragStart={onDragStart}
                onDragEnd={()=>{}}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className='frames-wrapper'
            >
                <div className='frames-items'>
                    {
                        frames.map((frameData, id) => {
                            const {
                                data,
                                frameRef,
                            } = frameData;
                            return (
                                <div key={id} className='frame-wrapper'>
                                    <img
                                        tabIndex={id + 1}
                                        data-id={id}
                                        alt={`frame:${id}`}
                                        src={data}
                                        ref={frameRef}
                                        className='frame droppable'>
                                    </img>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}