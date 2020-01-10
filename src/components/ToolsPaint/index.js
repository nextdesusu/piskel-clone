import React from 'react';
import './ToolsPaint.css';
import { ToolsItem, ColorItem } from '../Items';
import {
    COLOR_PICKER_SIZE,
    BUCKET_TOOL,
    COLOR_PICKER_TOOL,
    PENCIL_TOOL,
    STROKE_TOOL,
    ERASE_TOOL,
} from '../../consts'
import { extractColor } from '../../utils/ColorFunctions';

import BucketIcon from '../../images/bucket.svg';
import ColorPickerIcon from '../../images/color-picker.svg';
import PencilIcon from '../../images/pencil.svg';

export default class ToolsPaint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            colorPickerSize: COLOR_PICKER_SIZE,
            colorPickerRef: React.createRef(),
        }
    }

    drawColors(hue) {
        const {
            colorPickerSize,
            colorPickerRef,
        } = this.state;
        const colorPicker = colorPickerRef.current;
        const ctx = colorPicker.getContext('2d');
        const maxHslValue = 100;
        colorPicker.width = colorPickerSize;
        colorPicker.height = colorPickerSize;
        for(let row = 0; row < colorPickerSize; row += 1){
            const grad = ctx.createLinearGradient(0, 0, colorPickerSize, colorPickerSize);
            grad.addColorStop(0, `hsl(${hue}, 100%, ${row / colorPickerSize * maxHslValue}%)`);
            grad.addColorStop(1, `hsl(${hue}, 0%, ${row / colorPickerSize * maxHslValue}%)`);
            ctx.fillStyle = grad;
            ctx.fillRect(0, row, colorPickerSize, 1);
        }
    }

    silderOnChange = (event) => {
        const value = Number(event.nativeEvent.target.value);
        this.drawColors(value);
    }

    componentDidMount() {
        const initialHue = 0;
        this.drawColors(initialHue);
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
    }

    render(){
        const {
            props,
            state,
            chooseColor,
            silderOnChange,
        } = this;
        const {
            currentColor,
            previousColor,
            currentTool,
            setTool,
            setColor
        } = props;
        const {
            colorPickerRef
        } = state;
        const extractedCurrent = extractColor(currentColor);
        const extractedPrevious = extractColor(previousColor);
        return (
            <section className='tools'>
                <div className='tools-list-wrapper'>
                    <ul className='tools-list' id='tools_list'>
                        <ToolsItem 
                            id={BUCKET_TOOL}
                            onClick={() => setTool(BUCKET_TOOL)}
                            text={'bucket'}
                            iconSrc={BucketIcon}
                            highlighted={BUCKET_TOOL === currentTool}
                        />
                        <ToolsItem 
                            id={COLOR_PICKER_TOOL}
                            onClick={() => setTool(COLOR_PICKER_TOOL)}
                            text={'color picker'}
                            iconSrc={ColorPickerIcon}
                            highlighted={COLOR_PICKER_TOOL === currentTool}
                        />
                        <ToolsItem 
                            id={PENCIL_TOOL}
                            onClick={() => setTool(PENCIL_TOOL)}
                            text={'pencil'}
                            iconSrc={PencilIcon}
                            highlighted={PENCIL_TOOL === currentTool}
                        />
                        <ToolsItem 
                            id={STROKE_TOOL}
                            onClick={() => setTool(STROKE_TOOL)}
                            text={'stroke'}
                            iconSrc={null}
                            highlighted={STROKE_TOOL === currentTool}
                        />
                        <ToolsItem 
                            id={ERASE_TOOL}
                            onClick={() => setTool(ERASE_TOOL)}
                            text={'erase'}
                            iconSrc={null}
                            highlighted={ERASE_TOOL === currentTool}
                        />
                    </ul>
                </div>
                <div className='tools-list-wrapper'>
                    <ul className='tools-list' id='colors_list'>
                        <ColorItem
                            onClick={() => {}}
                            text='current color'
                            colorName={extractedCurrent}
                        />
                        <ColorItem
                            onClick={() => {setColor(previousColor)}}
                            text='previous color'
                            colorName={extractedPrevious}
                        />
                    </ul>
                    <div className='color-wrapper'>
                        <canvas
                            ref={colorPickerRef}
                            onClick={chooseColor}
                            className='color-picker'
                        >
                        </canvas>
                        <input
                            className='color-slider'
                            onMouseUp={silderOnChange}
                            min='0'
                            max='359'
                            step='1'
                            type='range'
                        >    
                        </input>
                    </div>
                </div>
            </section>
        )
    }
}