const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const configDir = './src/app/core/configs/product-forms';
const interfaceDir = './src/app/core/interfaces/specs';

function readTsConfig(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const result = ts.transpileModule(fileContent, {
        compilerOptions: { module: ts.ModuleKind.CommonJS }
    });
    const tempFile = path.join(__dirname, '_temp.js');
    fs.writeFileSync(tempFile, result.outputText);

    try {
        const config = require(tempFile);
        delete require.cache[require.resolve(tempFile)]; // Prevent caching
        return config;
    } catch (error) {
        console.error(`Error loading config from file ${filePath}:`, error);
        throw error;
    } finally {
        fs.unlinkSync(tempFile);
    }
}

function generateInterface(configContent: any, filename: string) {
    const interfaceName = filename.replace('.config.ts', 'Specs');

    let interfaceContent = `export interface ${interfaceName} {\n`;

    configContent.fields.forEach((field: any) => {
        const type = getTypeFromField(field);
        const optional = field.required ? '' : '?';
        interfaceContent += `  ${field.name}${optional}: ${type};\n`;
    });

    interfaceContent += '}\n';
    return interfaceContent;
}

function getTypeFromField(field: any) {
    switch (field.type) {
        case 'text': return 'string';
        case 'number': return 'number';
        case 'select': return field.options ? `'${field.options.join("' | '")}'` : 'string';
        case 'multiselect': return 'string[]';
        case 'checkbox': return 'boolean';
        default: return 'any';
    }
}

// Create interfaces directory if it doesn't exist
if (!fs.existsSync(interfaceDir)) {
    fs.mkdirSync(interfaceDir, { recursive: true });
}

// Read and process each config file
fs.readdirSync(configDir)
    .filter((file: string) => file.endsWith('.config.ts'))
    .forEach((file: string) => {
        console.log(`Processing file: ${file}`);
        const configPath = path.join(configDir, file);

        try {
            const config = readTsConfig(configPath);
            if (!config || !Array.isArray(config.fields)) {
                console.error(`Invalid or missing fields in ${file}`);
                return;
            }

            const interfaceContent = generateInterface(config, file);
            const interfaceFile = path.join(
                interfaceDir,
                file.replace('.config.ts', '.interface.ts')
            );

            fs.writeFileSync(interfaceFile, interfaceContent);
            console.log(`Generated interface file: ${interfaceFile}`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });

console.log('Interfaces generated successfully!');
