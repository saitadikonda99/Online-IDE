import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileTree.css'; 

import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { FaFolder } from "react-icons/fa6";
import { FaFile } from "react-icons/fa6";

const FileTree = ({ onFileSelected }) => {
    const [fileTree, setFileTree] = useState([]);

    useEffect(() => {
        const fetchFileTree = async () => {
            try {
                const response = await axios.get('http://localhost:3001/fileTree');
                setFileTree(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFileTree();
    }, []);

    return (
        <div className="FileTreeComponent">
            <div className="FileTreeComponent-in">
                <div className="FileTree-one">
                    <h1>Explorer</h1>
                </div>
                {renderTree(fileTree, onFileSelected)}
            </div>
        </div>
    );
};

const renderTree = (nodes, onFileSelected) => {
    return (
        <div className='tree'>
            {nodes.map((node) => (
                <TreeNode key={node.name} node={node} onFileSelected={onFileSelected}/>
            ))}
        </div>
    );
};

const TreeNode = ({ node, onFileSelected}) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleClick = (node) => {
        if (node.type === 'file') {
            onFileSelected(node.name);
        }
    }

    return (
        <div className='tree-node' onClick={() => handleClick(node)}>
            <div onClick={handleToggle} className={node.type === 'directory' ? 'directory' : 'file'}>
                {node.type === 'directory' && (expanded ? <MdOutlineKeyboardArrowDown /> : <MdOutlineKeyboardArrowUp />)}
                {node.type === 'directory' ? <FaFolder className='directory-icon' /> : <FaFile className='file-icon'/>}
                {node.name}
            </div>
            {node.type === 'directory' && expanded && node.children && (
                <div className='children'>
                    {node.children.map((child) => (
                        <TreeNode key={child.name} node={child} onFileSelected={onFileSelected}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileTree;
