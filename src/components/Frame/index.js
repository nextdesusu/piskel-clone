import React from 'react';
import './Frame.css';

export default class Frame extends React.Component {
    componentDidMount() {
        const {
            data,
            frameRef,
            width,
            height
        } = this.props;
        const frame = frameRef.current;
        frame.width = width;
        frame.height = height;
        const ctx = frame.getContext('2d');
        ctx.putImageData(data, 0, 0);
    }

    render() {
        const {
            frameRef,
            id
        } = this.props;
        return (<canvas data-id={id} ref={frameRef} className='frame'></canvas>);
    }
}