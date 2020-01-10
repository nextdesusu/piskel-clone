import React from 'react';
import { connect } from 'react-redux';
import {
    changeColor,
    changeTool,
    changeResolution,
} from '../../actions';
import './Main.css';
import ToolsPaint from '../ToolsPaint';
import Canvas from '../Canvas';
import ToolsResolution from '../ToolsResolution';

function Main(props) {
    const {
        resolution,
        currentTool,
        currentColor,
        previousColor,
        setColor,
        setTool,
        setResolution,
    } = props;
    const canvasWidth = 512;
    const canvasHeight = 512;
    const fps = 1;
    return (
        <main className='main'>
            <ToolsPaint
                currentColor={currentColor}
                previousColor={previousColor}
                currentTool={currentTool}
                setColor={setColor}
                setTool={setTool}
            />
            <Canvas
                resolution={resolution}
                currentTool={currentTool}
                currentColor={currentColor}
                setColor={setColor}
                width={canvasWidth}
                height={canvasHeight}
                fps={fps}
            />
            <ToolsResolution
                resolution={resolution}
                setResolution={setResolution}
            />
        </main>
    )
}

const mapStateToProps = store => {
    return {
        resolution: store.resolution,
        currentTool: store.currentTool,
        currentColor: store.currentColor,
        previousColor: store.previousColor,
    }
}

const mapDispatchToProps = dispatch => ({
    setTool: tool => dispatch(changeTool(tool)),
    setColor: newColor => dispatch(changeColor(newColor)),
    setResolution: (newX, newY) => dispatch(changeResolution(newX, newY)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);