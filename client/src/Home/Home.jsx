import React, { useState } from 'react'
import { useEffect, useRef } from 'react'

import './Home.css'

// import starts here 
import Terminal from '../Terminal/Terminal'
import FileTree from '../FileTree/FileTree'

const Home = () => {

    const [isTerminal, setIsTerminal] = useState(false);

    const handleClick = () => {
        setIsTerminal(!isTerminal);
    }

  return (
    <div className="HomeComponent">
        <div className="HomeComponent-in">
            <div className="Home-Navbar">
                <button onClick={handleClick}>Terminal</button>
            </div>
            <div className="Home-in">
                <div className="Home-one">
                    <div className="Home-one-in">
                        <FileTree />
                    </div>
                </div>
                <div className="Home-two">
                    <div className="Home-two-in">

                        <div className={`Home-editor ${isTerminal ? "Home-editor-expand" : ""}`}>
                            <div className="Home-editor-in">

                            </div>
                        </div>

                        <div className={`Home-terminal ${isTerminal ? "Home-terminal-hidden" : ""}`}>
                            <div className="Home-terminal-in">
                                <Terminal />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home