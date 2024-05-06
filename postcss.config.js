const { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } = require('fs');
const { resolve, join } = require('path');
const { Root } = require('postcss/lib/postcss');

const buildConfig = () => {



    return {
        postcssPlugin: 'combine-css',
        // AtRule: {
        //     import: rule => {
        //         
        //     }
        // },

        Once(css, { result }) {

            const combinedFileName = "index.css";
            const srcPath = resolve(__dirname, "./src");

            let combinedContent = '';

            css.walkAtRules(/import/, rule => {
                const importPath = resolve(srcPath, rule.params.replaceAll("\"", ""));
                if (existsSync(importPath)) {
                    const fileContent = readFileSync(importPath, 'utf8');
                    combinedContent += fileContent + '\n';
                } else {
                    combinedContent = `@import ${rule.params};\n\n` + combinedContent;
                }
            });

            writeFileSync(combinedFileName, combinedContent);
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