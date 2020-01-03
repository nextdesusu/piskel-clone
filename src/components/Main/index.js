import React from 'react';
import './Main.css';
import ToolsPaint from '../ToolsPaint';
import Canvas from '../Canvas';
import ToolsResolution from '../ToolsResolution';

export default function Main() {
    return (
        <main className='main'>
            <ToolsPaint />
            <Canvas />
            <ToolsResolution />
        </main>
    )
}