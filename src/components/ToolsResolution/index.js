import React from 'react';
import './ToolsResolution.css';
import { SButton, SInput } from '../Elements';
import { ToolsItem } from '../Items';

export default class ToolsResolution extends React.Component {
    constructor(props) {
        super(props);
        const {
            width,
            height,
        } = props.resolution;
        this.state = {
            inputWidth: width,
            inputHeight: height,
        }
    }

    get widthChangeId() {
        return 'inputWidth'
    }

    get heightChangeId() {
        return 'inputHeight'
    }

    onResChange = (event) => {
        const input = event.target
        const key = input.id;
        const value = Number(input.value);
        this.setState({ [key]: value });
    }

    onResSubmit = () => {
        const {
            inputWidth,
            inputHeight,
        } = this.state;
        this.props.setResolution(inputWidth, inputHeight);
    }

    render(){
        const {
            ToolItems,
            props,
            onResChange,
            widthChangeId,
            heightChangeId,
            onResSubmit,
            state,
        } = this;
        const {
            inputWidth,
            inputHeight,
        } = state;
        const {
            resolution,
            setResolution
        } = props;
        const {
            width,
            height,
        } = resolution;
        const maxRes = 512;
        const minRes = 4;
        const resX4 = 4;
        const resX32 = 32;
        const resX128 = 128;
        const resToStr = (res) => `${res}x${res};`
        return (
            <section className='tools'>
                <div className='tools-list-wrapper'>
                    <ul className='tools-list' id='tools_list'>
                        <ToolsItem
                            onClick={() => setResolution(resX4, resX4)}
                            text={resToStr(resX4)}
                            iconSrc={null}
                            highlighted={resX4 === width && resX4 === height}
                        />
                        <ToolsItem
                            onClick={() => setResolution(resX32, resX32)}
                            text={resToStr(resX32)}
                            iconSrc={null}
                            highlighted={resX32 === width && resX32 === height}
                        />
                        <ToolsItem
                            onClick={() => setResolution(resX128, resX128)}
                            text={resToStr(resX128)}
                            iconSrc={null}
                            highlighted={resX128 === width && resX128 === height}
                        />
                    </ul>
                </div>
                <div className='tools-inputs'>
                    <SInput
                        value={inputWidth}
                        step='4'
                        type='range'
                        max={maxRes}
                        min={minRes}
                        onChange={onResChange}
                        id={widthChangeId}
                        placeholder='set width'
                        name='custom-reslotuion'
                    />
                    <label className='input-header' htmlFor='custom-reslotuion'>width: {inputWidth}</label>
                    <br></br>
                    <SInput
                        value={inputHeight}
                        step='4'
                        type='range'
                        max={maxRes}
                        min={minRes}
                        onChange={onResChange}
                        id={heightChangeId}
                        name='custom-reslotuion'
                    />
                    <label className='input-header' htmlFor='custom-reslotuion'>height: {inputHeight}</label>
                    <br></br>
                    <SButton text='set resolution' onClick={onResSubmit}/>
                </div>
            </section>
        )
    }
}