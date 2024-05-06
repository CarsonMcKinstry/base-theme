const { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve, join } = require('path');

const buildConfig = () => {
    return {
        postcssPlugin: 'combine-css',
        Once(root, { result }) {
            // Directory containing CSS files to be combined
            const srcDir = './src';

            // Combined CSS file name
            const combinedFileName = 'index.css';

            // Resolve the absolute path of the source directory
            const srcPath = resolve(srcDir);

            // Get a list of CSS files in the source directory
            const cssFiles = readdirSync(srcPath).filter(file => file.endsWith('.css'));

            // Combine content of all CSS files
            let combinedContent = '';
            cssFiles.forEach(file => {
                const filePath = join(srcPath, file);
                const fileContent = readFileSync(filePath, 'utf8');
                combinedContent += fileContent + '\n';
            });

            // Write the combined content to a new file
            writeFileSync(combinedFileName, combinedContent);

            // Log success message
            console.log(`Combined ${cssFiles.length} CSS files into ${combinedFileName}`);
        }
    };
};

buildConfig.postcss = true;

const config = {
    plugins: [
        buildConfig
    ]
};

module.exports = config;