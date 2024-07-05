import React, { useEffect, useRef } from 'react'

import { Terminal as XTerminal } from '@xterm/xterm'
import '@xterm/xterm/css/xterm.css'
import socket from '../socket'

const Terminal = () => {

    const terRef = useRef();
    const isRender = useRef(false);

    useEffect(() => {

        if(isRender.current) return;
        isRender.current = true;

        const terminal = new XTerminal({
            rows: 40,
            cols: 50,
        });

        terminal.open(terRef.current);

        terminal.onData((data) => {
            socket.emit("terminal:data", data);
        });

        socket.on("terminal:data", (data) => {
            terminal.write(data);
        })
        
    },[]);

  return (
        <div ref={terRef} className="TerminalComponent" />
   )
}

export default Terminal