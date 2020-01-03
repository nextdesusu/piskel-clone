import React from 'react';
import './ToolsPaint.css';
import { ToolsItem, ColorItem } from '../Items';
import { COLORS } from '../../consts';
import { connect } from 'react-redux';
import {
    changeTool,
    changeColor,
} from '../../actions';

import BucketIcon from '../../images/bucket.svg';
import ColorPickerIcon from '../../images/color-picker.svg';
import PencilIcon from '../../images/pencil.svg';

class ToolsPaint extends React.Component {
    render(){
        const {
            currentColor,
            previousColor,
            setTool,
            setColor
        } = this.props;
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
                    <ColorItem onClick={() => {}} text='current color' colorName={currentColor}/>
                    <ColorItem onClick={() => {setColor(previousColor)}} text='previous color' colorName={previousColor}/>
                    {
                        COLORS.map((color, id) => {
                            return<ColorItem onClick={() => {setColor(color)}} colorName={color} key={id}/>
                        })
                    }
                </ul>
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