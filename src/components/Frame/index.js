import React from 'react';
import './Frame.css';

export default class Frame extends React.Component {
    constructor(props) {
        super(props);
        const {
            id,
            data
        } = props;
        this.state = {
            id,
            data,
            frameRef: React.createRef(),
            width: 512,
            height: 512,
        }
    }

    componentDidMount() {
        const {
            data,
            frameRef,
            width,
            height
        } = this.state;
        const frame = frameRef.current;
        frame.width = width;
        frame.height = height;
        const ctx = frame.getContext('2d');
        ctx.putImageData(data, 0, 0);
        console.log('loaded');
    }

    render() {
        const {
            frameRef,
            id
        } = this.state;
        return (<canvas data-id={id} ref={frameRef} className='frame'></canvas>);
    }
}