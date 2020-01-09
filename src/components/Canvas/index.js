import React from 'react';
import './Canvas.css';
import { connect } from 'react-redux';
import { SButton } from '../Elements'; 
import UseTool from '../../utils/UseTool';
import { extractColor } from '../../utils/ColorFunctions';
import Frame from '../Frame';
import ContextMenu from '../ContextMenu';
import GIF from 'gif.js-upgrade';

import { changeColor } from '../../actions';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            width: 512,
            height: 512,
            fps: 1,
            contextMenuProps: {
                options: [],
                posX: 0,
                posY: 0,
                displayCM: false,
            },
            downLoadLink: null,
            frames: [],
        }
    }

    get MS() {
        const FPS = this.state.fps;
        const ms = 100;
        return Math.floor(ms / FPS);
    }

    createGif = () => {
        const {
            MS,
            state,
        } = this;
        const {
            frames,
        } = state;
        const gif = new GIF({
            workers: 2,
            quality: 10,
            debug: true,
            delay: MS,
            width: 512,
            height: 512,
            workerScript: './gif.worker.js',
        });
        for (let frameProp of frames) {
            const frame = frameProp.frameRef.current;
            gif.addFrame(frame);
        }
        gif.on('finished', (blob) => {
            //window.open(URL.createObjectURL(blob), 'blank');
            const obj = URL.createObjectURL(blob);
            this.setState({
                downLoadLink: <a href={obj} download={obj}>download!</a>
            })
        });
        gif.render();
    }

    addFrame = () => {
        const frames = this.state.frames;
        const {
            canvasRef,
        } = this.state;
        const canvas = canvasRef.current;
        const data = canvas.toDataURL("image/png")
        const frameRef = React.createRef();
        const newFrame = {
            data,
            frameRef,
        };
        this.setState({ frames: [...frames, newFrame] });
    }

    deleteFrame = (frameId) => {
        const frames = this.state.frames;
        const newData = frames.filter((frameProp) => {
            const frame = frameProp.frameRef.current;
            const currentId = Number(frame.getAttribute('data-id'));
            return currentId !== frameId
        });
        this.setState({ frames: newData });
    }

    duplicateFrame = (frameId) => {
        const { frames } = this.state;
        const frame = frames[frameId];
        const leftPart = frames.slice(0, frameId);
        const rightPart = frames.slice(frameId, frames.length);
        this.setState({ frames: [...leftPart, frame, ...rightPart] });
    }

    swapFrames = (frame1Id, frame2Id) => {
        const { frames } = this.state;
        const newframes = [...frames];
        const frame1 = frames[frame1Id];
        const frame2 = frames[frame2Id];
        newframes[frame1Id] = frame2;
        newframes[frame2Id] = frame1;
        this.setState({ frames: [...newframes] });
    }

    showContextMenu = (event) => {
        event.preventDefault();
        let id = event.target.getAttribute('data-id');
        const {
            deleteFrame,
            drawFrame,
            duplicateFrame,
        } = this;
        if (id === null) return;
        id = Number(id);
        const {
            pageX,
            pageY,
        } = event
        const contextMenuProps = {
            options: [
                {
                    text: 'redact',   
                    onClick: () => drawFrame(id),
                },
                {
                    text: 'delete',
                    onClick: () => deleteFrame(id),
                },
                {
                    text: 'duplicate',
                    onClick: () => duplicateFrame(id),
                }
            ],
            posX: pageX,
            posY: pageY,
            displayCM: true,
        }
        this.setState({ contextMenuProps });
    }

    drawFrame = (frameId) => {
        const {
            state,
            drawImage
        } = this;
        const frameProp = state.frames[frameId];
        const frame = frameProp.frameRef.current;
        drawImage(frame);
    }

    drawImage = (image) => {
        const {
            canvasRef,
            width,
            height,
        } = this.state;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(image, 0, 0);
    }

    animate = () => {
        const {
            state,
            MS,
            drawFrame
        } = this;
        const {
            frames,
        } = state;
        let currentFrame = 0;
        const animId = setInterval(() => {
            drawFrame(currentFrame)
            currentFrame += 1;
            if (currentFrame === frames.length) clearInterval(animId);
        }, MS);
    }

    getUseToolFunction = (event) => {
        const {
            width,
            height,
        } = this.state;
        const {
            setColor,
            currentColor,
            currentTool,
            resolution
        } = this.props;
        const {
            offsetX,
            offsetY,
        } = event.nativeEvent;
        const canvas = event.target;
        const pixelSizeX = Math.floor(width / resolution.width);
        const pixelSizeY = Math.floor(height / resolution.height);
        const options = {
            canvas: canvas,
            pixelSizeX: pixelSizeX,
            pixelSizeY: pixelSizeY,
            width: width,
            height: height,
            tool: currentTool,
            color: extractColor(currentColor),
            rawColor: currentColor,
            setColor: setColor,
            X: offsetX,
            Y: offsetY,
        }
        UseTool(options);
    }

    frameOnMouseDown = (event) => {
        if (event.button === 2) return;
        event.target.ondragstart = function() {
            return false;
          };
        let currentDroppable = null;
        const {
            clientX,
            clientY,
            pageX,
            pageY,
        } = event;
        const frame = event.target;
        const shiftX = clientX - frame.getBoundingClientRect().left;
        const shiftY = clientY - frame.getBoundingClientRect().top;
        frame.classList.add('dragging');

        const moveAt = (pageX, pageY) => {
            frame.style.left = `${pageX - shiftX}px`;
            frame.style.top = `${pageY - shiftY}px`;
        }

        const enterDroppable = (elem)=> {
            elem.classList.add('enter-droppable');
        }
      
        const leaveDroppable = (elem) => {
            elem.classList.remove('enter-droppable');
        }

        moveAt(frame, pageX, pageY);

        const onMouseMove = (event) => {
            moveAt(event.pageX, event.pageY);
    
            frame.hidden = true;
            const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            frame.hidden = false;
            if (!elemBelow) return;
    
            const droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) { // null when we were not over a droppable before this event
                    leaveDroppable(currentDroppable);
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) { // null if we're not coming over a droppable now
                    // (maybe just left the droppable)
                    enterDroppable(currentDroppable);
                }
            }
        }
        document.addEventListener('mousemove', onMouseMove);
        frame.onmouseup = (event) => {
            frame.hidden = true;
            const elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            frame.hidden = false;
            if (!elemBelow) return;
            const frameId = Number(frame.getAttribute('data-id'));
            const elemBelowId = Number(elemBelow.getAttribute('data-id'));
            elemBelow.classList.remove('enter-droppable');
            frame.classList.remove('dragging')
            document.removeEventListener('mousemove', onMouseMove);
            frame.onmouseup = null;
            this.swapFrames(frameId, elemBelowId);
        };
    }


    componentDidMount() {
        const {
            width,
            height,
            canvasRef,
        } = this.state;
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
    }

    render() {
        const {
            state,
            showContextMenu,
            animate,
            deleteLast,
            addFrame,
            createGif,
            getUseToolFunction,
        } = this;
        const {
            canvasRef,
            width,
            height,
            contextMenuProps,
            frames,
            downLoadLink
        } = state;
        const {
            options,
            posX,
            posY,
            displayCM
        } = contextMenuProps;
        return (
            <section className='canvas-section'>
                <div className='canvas-wrapper'>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={getUseToolFunction}
                        width={width}
                        height={height}
                        className='canvas'>
                    </canvas>
                </div>
                <SButton text='add frame' onClick={addFrame}/>
                <SButton text='animate' onClick={animate} />
                <SButton text='download gif' onClick={createGif} />
                {downLoadLink ? downLoadLink : null}
                <div onContextMenu={showContextMenu}>
                    {
                        displayCM ? <ContextMenu options={options} posX={posX} posY={posY} /> : null
                    }
                    {
                        frames.map((frameData, id) => {
                            const {
                                text,
                                data,
                                frameRef,
                            } = frameData;
                            return <Frame
                                id={id}
                                key={id}
                                text={text}
                                data={data}
                                onMouseDown={this.frameOnMouseDown}
                                frameRef={frameRef}
                                width={512}
                                height={512}
                            />
                        })
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = store => {
    return {
        resolution: store.resolution,
        currentTool: store.currentTool,
        currentColor: store.currentColor,
    }
}

const mapDispatchToProps = dispatch => ({
    setColor: newColor => dispatch(changeColor(newColor)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);