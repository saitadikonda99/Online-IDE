const fs = require('fs');
const path = require('path');

const getFileTree = (dirPath) => {
    const result = [];
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            result.push({
                name: file,
                type: 'directory',
                children: getFileTree(filePath)
            });
        } else {
            result.push({
                type: 'file',
                name: file
            });
        }
    });
    
    return result;
}

const fileTreeController = async (req, res) => {
    try {

        const directory = path.resolve(__dirname, '../IDE');
        const fileTree = getFileTree(directory);
        return res.status(200).json(fileTree);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve file tree' });
    }
}

module.exports = fileTreeController;