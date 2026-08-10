const fs = require('fs');
const path = require('path');

const dataDir = '/Users/a12345/Desktop/GuessWhat/src/data';
const imagesDir = '/Users/a12345/Desktop/GuessWhat/public/images';

const imageFiles = fs.readdirSync(imagesDir);

function findMatchingImage(nameToMatch) {
    nameToMatch = nameToMatch.toLowerCase().replace('.jpg', '').replace('-', '_');
    
    // Special cases
    if (nameToMatch === 'orca') nameToMatch = 'orca_whale';
    
    for (const file of imageFiles) {
        if (file.startsWith(nameToMatch + '_')) {
            return '/images/' + file;
        }
    }
    return null;
}

const tsFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

for (const file of tsFiles) {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find all imageUri: '/animals/xxx.jpg' or '/level11/xxx.jpg'
    content = content.replace(/imageUri:\s*['"]\/(animals|level11)\/([^'"]+)['"]/g, (match, folder, filename) => {
        const newPath = findMatchingImage(filename);
        if (newPath) {
            console.log(`Mapped ${filename} -> ${newPath}`);
            return `imageUri: '${newPath}'`;
        }
        console.log(`Not found for ${filename}, returning original`);
        return match;
    });
    
    fs.writeFileSync(filePath, content);
}
console.log('Done mapping images.');
