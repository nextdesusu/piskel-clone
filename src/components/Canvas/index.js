import React from 'react';
import './Canvas.css';
import { connect } from 'react-redux';
import { SButton } from '../Elements'; 
import UseTool from '../../utils/UseTool';
import { extractColor } from '../../utils/ColorFunctions';
import Frame from '../Frame';

import { changeColor } from '../../actions';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasRef: React.createRef(),
            width: 512,
            height: 512,
            initialColor: 'gray',
            frames: [],
        }
    }

    addFrame = () => {
        const frames = this.state.frames;
        const newFrame = <Frame />;
        this.setState({ frames: [...frames, newFrame]});
    }

    componentDidMount() {
        const {
            width,
            height,
            canvasRef,
            initialColor,
        } = this.state;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = initialColor;
        ctx.fillRect(0, 0, width, height);
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
        //console.log('res:', resolution)
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
            canvasRef,
            width,
            height,
            frames
        } = this.state;
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
                <SButton text='add frame' onClick={this.addFrame}/>
                <ul>
                    {
                        frames.map((frame) => <li>{frame}</li>)
                    }
                </ul>
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