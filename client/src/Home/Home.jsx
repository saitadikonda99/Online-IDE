import React, { useState } from 'react'
import { useEffect, useRef } from 'react'

import './Home.css'

// import starts here 
import Terminal from '../components/Terminal/Terminal'
import FileTree from '../components/FileTree/FileTree'
import Output from '../components/output/Output'
import Editor from '../components/Editor/Editor'

import { MdTerminal } from "react-icons/md";

const Home = () => {

    const [isTerminal, setIsTerminal] = useState(false);
    const [isOutput, setIsOutput] = useState(false);

    let SelectedFile = null;

    const handleFileSelected = (fileName) => {
        SelectedFile = fileName;
    };

    const handleClick = () => {
        setIsTerminal(!isTerminal);
    }

    const handleOutput = () => {
        setIsOutput(!isOutput);
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
                        <FileTree onFileSelected={handleFileSelected} />
                    </div>
                </div>
                <div className="Home-two">
                    <div className="Home-two-in">

                        <div className={`Home-editor ${isTerminal ? "Home-editor-expand" : ""}`}>
                            <div className="Home-editor-in">
                                <Editor FileName = {SelectedFile}/>
                            </div>
                        </div>

                        <div className={`Home-terminal ${isTerminal ? "Home-terminal-hidden" : ""}`}>
                            <div className="Home-terminal-in">
                                <div className="Home-terminal-one">
                                    <p><MdTerminal className='terminal-icon'/> Terminal</p>
                                    <button onClick={handleClick} >Close</button>
                                    <button onClick={handleOutput} >Show Output</button>
                                </div>
                                <div className="Home-terminal-two">
                                    <Terminal />
                                </div>
                            </div>
                            <div className={`Home-Output ${isOutput ? "Home-terminal-hidden" : ""}`}>
                                <Output />
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