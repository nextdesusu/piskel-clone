import React from 'react';
import './Canvas.css';
import { connect } from 'react-redux';
import { SButton } from '../Elements'; 
import UseTool from '../../utils/UseTool';

import { changeColor } from '../../actions';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 512,
            height: 512
        }
    }

    getUseToolFunction = (event) => {
        const {
            canvasRef,
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
        console.log(width, resolution)
        const canvas = event.target;
        const options = {
            canvas: canvas,
            pixelSize: width / 128,
            width: width,
            height: height,
            tool: currentTool,
            color: currentColor,
            setColor: setColor,
            X: offsetX,
            Y: offsetY,
        }
        UseTool(options);
    }

    render() {
        const { width, height } = this.state;
        return (
            <section className="canvas-section">
                <div className="canvas-wrapper">
                    <canvas
                        onMouseDown={this.getUseToolFunction}
                        width={width}
                        height={height}
                        className='canvas'>
                    </canvas>
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