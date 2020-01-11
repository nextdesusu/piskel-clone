import React from 'react';
import { SButton } from '../Elements';
import './Frames.css';

export default class Frames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: null,
            focusedFrameId: null,
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
        const id = target.getAttribute('data-id');
        if (id === null) return;
        target.classList.add('highlited');
        console.log('highliting id:', Number(id));
        this.setState({ focusedFrameId: Number(id) });
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
            deleteFrame,
            duplicateFrame,
            drawFrame,
            getImageFromFrame,
            addFrame
        } = props;
        const { focusedFrameId } = state;
        const useFrameFunction = (func) => () => {
            this.setState({ focusedFrameId: null});
            func(focusedFrameId);
        }
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
                <div className='frames-buttons'>
                    <SButton text='add' onClick={addFrame}/>
                    <SButton text='delete' onClick={useFrameFunction(deleteFrame)}/>
                    <SButton text='duplicate' onClick={useFrameFunction(duplicateFrame)}/>
                    <SButton text='redact' onClick={useFrameFunction(drawFrame)}/>
                    <SButton text='get image' onClick={useFrameFunction(getImageFromFrame)}/>
                </div>
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