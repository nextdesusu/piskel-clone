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
            framesProps: [],
        }
    }

    get MS() {
        const FPS = this.state.fps;
        const ms = 100;
        return Math.floor(ms / FPS);
    }

    fillCanvas = (data) => {
        const {
            canvasRef,
        } = this.state;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.putImageData(data, 0, 0);
    }

    addFrame = () => {
        const framesProps = this.state.framesProps;
        const id = framesProps.length;
        const {
            canvasRef,
            width,
            height
        } = this.state;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const data = ctx.getImageData(0, 0, width, height);
        const frameRef = React.createRef();
        const newFrame = {
            id,
            data,
            frameRef,
        };
        this.setState({ framesProps: [...framesProps, newFrame] });
    }

    createGif = () => {
        const {
            MS,
            state,
        } = this;
        const {
            framesProps,
            fps,
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
        for (let frameProp of framesProps) {
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

    drawData = (frameId) => {
        const {
            fillCanvas,
            state,
        } = this;
        const frame = state.framesProps[frameId];
        const { data } = frame;
        fillCanvas(data);
    }

    deleteFrame = (frameId) => {
        console.log('deleteing frameid', frameId);
        const framesProps = this.state.framesProps;
        const newData = framesProps.filter((frame) => frame.id !== frameId);
        this.setState({ framesProps: newData });
    }

    showContextMenu = (event) => {
        event.preventDefault();
        const id = Number(event.target.getAttribute('data-id'));
        const {
            deleteFrame,
            drawData,
        } = this;
        if (id === null) return;
        const {
            pageX,
            pageY,
        } = event
        const contextMenuProps = {
            options: [
                {
                    text: 'redact',   
                    onClick: () => drawData(id),
                },
                {
                    text: 'delete frame',
                    onClick: () => deleteFrame(id),
                },
            ],
            posX: pageX,
            posY: pageY,
            displayCM: true,
        }
        this.setState({ contextMenuProps });
    }

    animate = () => {
        const {
            fillCanvas,
            state,
            MS,
        } = this;
        const {
            framesProps
        } = state;
        let currentFrame = 0;
        const animId = setInterval(() => {
            const frame = framesProps[currentFrame];
            const { data } = frame;
            fillCanvas(data);
            currentFrame += 1;
            if (currentFrame === framesProps.length) clearInterval(animId);
        }, MS);
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
        const options = {
            canvas: canvas,
            pixelSize: width / resolution,
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
            framesProps,
            downLoadLink
        } = state;
        const {
            options,
            posX,
            posY,
            displayCM
        } = contextMenuProps;
        return (
            <section className="canvas-section">
                <div className="canvas-wrapper">
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
                        framesProps.map((frameData, key) => {
                            const {
                                text,
                                data,
                                id,
                                frameRef,
                            } = frameData;
                            return <Frame
                                id={id}
                                key={key}
                                text={text}
                                data={data}
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