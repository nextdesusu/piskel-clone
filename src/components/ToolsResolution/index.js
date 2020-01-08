import React from 'react';
import { ToolsItem } from '../Items';
import { connect } from 'react-redux';
import { changeResolution } from '../../actions';


class ToolsResolution extends React.Component {
    state = {
        inputWidth: 4,
        inputHeight: 4,
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

    get ToolItems() {
        const { setResolution } = this.props;
        const resX4 = 4;
        const resX32 = 32;
        const resX128 = 128;
        const resToStr = (res) => `${res}x${res};`
        return [
            {
                resSize: resX4,
                onClick: () => setResolution(resX4, resX4),
                text: resToStr(resX4),
            },
            {
                resSize: resX32,
                onClick: () => setResolution(resX32, resX32),
                text: resToStr(resX32),
            },
            {
                resSize: resX128,
                onClick: () => setResolution(resX128, resX128),
                text: resToStr(resX128),
            },
        ]
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
        const { resolution } = props;
        const maxRes = 512;
        const minRes = 4;
        return (
            <section className='tools'>
                <h2>Resolutions</h2>
                <ul className='tools-list' id='tools_list'>
                    {
                        ToolItems.map((item, key) => {
                            const {
                                resSize,
                                onClick,
                                text
                            } = item
                            const highlighted = resSize === resolution;
                            return <ToolsItem
                                key={key}
                                onClick={onClick}
                                text={text}
                                highlighted={highlighted}
                            />
                        })
                    }
                </ul>
                <div>
                    <label htmlFor='custom-reslotuion'>custom resolution</label>
                    <input
                        type='number'
                        max={maxRes}
                        min={minRes}
                        value={inputWidth}
                        onChange={onResChange}
                        id={widthChangeId}
                        placeholder='set width'
                        name='custom-reslotuion'>
                    </input>
                    <input
                        type='number'
                        max={maxRes}
                        min={minRes}
                        value={inputHeight}
                        onChange={onResChange}
                        id={heightChangeId}
                        placeholder='set height'
                        name='custom-reslotuion'>
                    </input>
                    <button onClick={onResSubmit}>set resolution</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = store => {
    return {
        resolution: store.resolution,
    }
}
  
const mapDispatchToProps = dispatch => ({
    setResolution: (newX, newY) => dispatch(changeResolution(newX, newY)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ToolsResolution);