import React from 'react';
import './Canvas.css';
import { connect } from 'react-redux';
import { SButton } from '../Elements'; 
import UseTool from '../../utils/UseTool';
import { extractColor } from '../../utils/ColorFunctions';
import Frame from '../Frame';
import ContextMenu from '../ContextMenu';

import { changeColor } from '../../actions';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            width: 512,
            height: 512,
            fps: 30,
            contextMenuProps: {
                options: [],
                posX: 0,
                posY: 0,
                displayCM: false,
            },
            framesProps: [],
        }
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
        const newFrame = {id, data};
        this.setState({ framesProps: [...framesProps, newFrame] });
    }

    drawData = (event) => {
        const target = event.target;
        const id = Number(target.getAttribute('data-id'));
        const frame = this.state.framesProps[id];
        const { data } = frame.props;
        this.fillCanvas(data);
    }

    showContextMenu = (event) => {
        event.preventDefault();
        const {
            pageX,
            pageY,
        } = event
        const contextMenuProps = {
            options: [
                {
                    text: 'delete frame',
                    onClick: () => console.log('clicked'),
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
        } = this;
        const {
            framesProps,
            fps,
        } = state;
        let currentFrame = 0;
        const time = 1000 / fps;
        const animId = setInterval(() => {
            const frame = framesProps[currentFrame];
            const { data } = frame;
            fillCanvas(data);
            currentFrame += 1;
            if (currentFrame === framesProps.length) clearInterval(animId);
        }, time);
    }

    deleteLast = () => {
        const framesProps = this.state.framesProps;
        const newFrames = framesProps.slice(0, framesProps.length - 1);
        this.setState({ framesProps: newFrames });
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
        } = this;
        const {
            canvasRef,
            width,
            height,
            contextMenuProps,
            framesProps,
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
                        onMouseDown={this.getUseToolFunction}
                        width={width}
                        height={height}
                        className='canvas'>
                    </canvas>
                </div>
                <SButton text='add frame' onClick={addFrame}/>
                <SButton text='delete last' onClick={deleteLast} />
                <SButton text='animate' onClick={animate} />
                <div onContextMenu={showContextMenu}>
                    {
                        displayCM ? <ContextMenu options={options} posX={posX} posY={posY} /> : null
                    }
                    {
                        framesProps.map((frameData, key) => {
                            const {
                                text,
                                data
                            } = frameData;
                            return <Frame key={key} text={text} data={data} />
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