import React from 'react';
import './ToolsPaint.css';
import { ToolsItem, ColorItem } from '../Items';
import { COLORS } from '../../consts';
import { connect } from 'react-redux';
import {
    changeTool,
    changeColor,
} from '../../actions';
import { COLOR_PICKER_SIZE } from '../../consts'
import { extractColor } from '../../utils/ColorFunctions';

import BucketIcon from '../../images/bucket.svg';
import ColorPickerIcon from '../../images/color-picker.svg';
import PencilIcon from '../../images/pencil.svg';

class ToolsPaint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPickerSize: COLOR_PICKER_SIZE,
            colorPickerRef: React.createRef(),
        }
    }

    drawColors(blueMixin) {
        const {
            colorPickerSize,
            colorPickerRef,
        } = this.state;
        const colorPicker = colorPickerRef.current;
        const ctx = colorPicker.getContext('2d');
        colorPicker.width = colorPickerSize;
        colorPicker.height = colorPickerSize;
        for (let x = 0; x < colorPickerSize; x += 1) {
            for (let y = 0; y < colorPickerSize; y += 1) {
                ctx.fillStyle = `rgb(${x}, ${y}, ${blueMixin})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    silderOnChange = (event) => {
        const value = Number(event.nativeEvent.target.value);
        this.drawColors(value);
    }

    componentDidMount() {
        this.drawColors(0);
    }

    chooseColor = (event) => {
        const {
            offsetX,
            offsetY,
        } = event.nativeEvent;
        const {
            setColor
        } = this.props;
        const colorPicker = this.state.colorPickerRef.current;
        const ctx = colorPicker.getContext('2d');
        const color = ctx.getImageData(offsetX, offsetY, 1, 1).data;
        setColor(color);
        //console.log('color', color);
    }

    render(){
        const {
            currentColor,
            previousColor,
            setTool,
            setColor
        } = this.props;
        const {
            colorPickerRef
        } = this.state;
        const extractedCurrent = extractColor(currentColor);
        const extractedPrevious = extractColor(previousColor);
        return (
            <section className="tools">
                <h2>Painting tools</h2>
                <ul className="tools-list" id="tools_list">
                    <ToolsItem
                        onClick={() => {setTool(0)}}
                        text='bucket' iconSrc={BucketIcon}
                    />
                    <ToolsItem
                        onClick={() => {setTool(1)}}
                        text='color picker'
                        iconSrc={ColorPickerIcon}
                    />
                    <ToolsItem
                        onClick={() => {setTool(2)}}
                        text='pencil'
                        iconSrc={PencilIcon}
                    />
                    <ToolsItem
                        onClick={() => {setTool(3)}}
                        text='stroke'
                        iconSrc={null}
                    />
                </ul>
                <ul className="tools-list" id="colors_list">
                    <ColorItem onClick={() => {}} text='current color' colorName={extractedCurrent}/>
                    <ColorItem onClick={() => {setColor(previousColor)}} text='previous color' colorName={extractedPrevious}/>
                </ul>
                <div className='color-wrapper'>
                    <canvas
                        ref={colorPickerRef}
                        onClick={this.chooseColor}
                        className='color-picker'
                    >
                    </canvas>
                    <input
                        className='color-slider'
                        onMouseUp={this.silderOnChange}
                        min='0'
                        max='255'
                        step='1'
                        type='range'
                    >    
                    </input>
                </div>
            </section>
        )
    }
}

const mapStateToProps = store => {
    return {
        currentColor: store.currentColor,
        previousColor: store.previousColor,
    }
}
  
const mapDispatchToProps = dispatch => ({
    setTool: toolId => dispatch(changeTool(toolId)),
    setColor: newColor => dispatch(changeColor(newColor)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsPaint);