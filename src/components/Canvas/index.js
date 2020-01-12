import React from 'react';
import './Canvas.css'; 
import UseTool from '../../utils/UseTool';
import ExtractColor from '../../utils/ExtractColor';
import { SButton } from '../Elements';
import Frames from '../Frames';
import GIF from 'gif.js-upgrade';

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        const {
            width,
            height,
            fps,
        } = props;
        this.state = {
            canvasRef: React.createRef(),
            width,
            height,
            fps,
            downLoadLink: null,
            inAnimation: false,
            focusedFrameId: null,
            frames: [],
        }
    }

    changeFps = (event) => {
        const newFps = event.target.value;
        this.setState({ fps: newFps });
    }

    get MS() {
        const FPS = this.state.fps;
        const second = 1000;
        return Math.floor(second / FPS);
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
            width,
            height,
        } = this.state;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const data = canvas.toDataURL("image/png")
        const frameRef = React.createRef();
        const newFrame = {
            data,
            frameRef,
        };
        this.setState({ frames: [...frames, newFrame] });
        ctx.clearRect(0, 0, width, height);
    }

    deleteFrame = (frameId) => {
        if (frameId === null || frameId === undefined) return;
        const frames = this.state.frames;
        const newData = frames.filter((frameProp) => {
            const frame = frameProp.frameRef.current;
            const currentId = Number(frame.getAttribute('data-id'));
            return currentId !== frameId
        });
        this.setState({ frames: newData });
    }

    duplicateFrame = (frameId) => {
        if (frameId === null || frameId === undefined) return;
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

    getImageFromFrame = (frameId) => {
        if (frameId === null || frameId === undefined) return;
        const { frames } = this.state;
        const frame = frames[frameId].frameRef.current;
        console.log('getting image from:', frame);
        //window.open(frame);
    }

    drawFrame = (frameId) => {
        if (frameId === null || frameId === undefined) return;
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
            inAnimation
        } = state;
        if (inAnimation) return;
        let currentFrame = 0;
        this.setState({ inAnimation: true });
        const animId = setInterval(() => {
            drawFrame(currentFrame);
            currentFrame += 1;
            if (currentFrame === frames.length){
                clearInterval(animId);
                this.setState({ inAnimation: false });
            }
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
        const canvasRect = canvas.getBoundingClientRect();
        const pixelSizeX = Math.floor(width / resolution.width);
        const pixelSizeY = Math.floor(height / resolution.height);
        const delX = Math.floor(canvasRect.width / resolution.width);
        const delY = Math.floor(canvasRect.height / resolution.height);
        const options = {
            canvas: canvas,
            pixelSizeX: pixelSizeX,
            pixelSizeY: pixelSizeY,
            width: width,
            height: height,
            tool: currentTool,
            color: ExtractColor(currentColor),
            rawColor: currentColor,
            setColor: setColor,
            canvasHeight: canvasRect.height,
            canvasWidth: canvasRect.width,
            delX: delX,
            delY: delY,
            X: offsetX,
            Y: offsetY,
        }
        UseTool(options);
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

    focusFrame = (id) => {
        this.setState({ focusedFrameId: parseInt(id) });
    }

    render() {
        const {
            state,
            showContextMenu,
            deleteFrame,
            changeFps,
            addFrame,
            drawFrame,
            createGif,
            getUseToolFunction,
            swapFrames,
            closeContextMenu,
            duplicateFrame,
            getImageFromFrame,
            focusFrame,
            animate,
        } = this;
        const {
            canvasRef,
            width,
            height,
            frames,
            fps,
            downLoadLink,
            focusedFrameId
        } = state;
        const useFrameFunction = (func) => () => {
            this.setState({ focusedFrameId: null});
            func(focusedFrameId);
        }
        return (
            <section className='canvas-section'>
                <div className='canvas-main'>
                    <div className='canvas-wrapper'>
                        <canvas
                            ref={canvasRef}
                            onMouseDown={getUseToolFunction}
                            width={width}
                            height={height}
                            className='canvas'>
                        </canvas>
                    </div>
                </div>
                <div className='canvas-buttons-wrapper'>
                    <div className='canvas-buttons1'>
                        <SButton text='add' onClick={addFrame}/>
                        <SButton text='animate' onClick={animate}/>
                        <div className='canvas-fps-wrapper'>
                            <input
                                onChange={changeFps}
                                value={fps}
                                type='range'
                                min='1'
                                max='30'
                                step='1'>
                            </input>
                            <label>current fps: {fps}</label>
                        </div>
                        <div className='get-image'>
                            <SButton text='get gif' onClick={createGif} />
                            {
                                downLoadLink
                            }
                        </div>
                    </div>
                    <div className='canvas-buttons2'>
                        <SButton text='delete' onClick={useFrameFunction(deleteFrame)}/>
                        <SButton text='duplicate' onClick={useFrameFunction(duplicateFrame)}/>
                        <SButton text='redact' onClick={useFrameFunction(drawFrame)}/>
                        <SButton text='get image' onClick={useFrameFunction(getImageFromFrame)}/>
                    </div>
                </div>
                <div className='canvas-frames'>
                        <Frames
                            showContextMenu={showContextMenu}
                            closeContextMenu={closeContextMenu}
                            swapFrames={swapFrames}
                            frames={frames}
                            focusFrame={focusFrame}
                        />
                    </div>
            </section>
        )
    }
}