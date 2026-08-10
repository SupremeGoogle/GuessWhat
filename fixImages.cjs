const fs = require('fs');
const path = require('path');
const dataDir = '/Users/a12345/Desktop/GuessWhat/src/data';

const files = fs.readdirSync(dataDir).filter(f => f.startsWith('level') && f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace all imageUri that contain 'unsplash' with an empty string or null.
  // Actually, we can just replace the URL string with ''
  content = content.replace(/imageUri:\s*['"]https:\/\/images\.unsplash\.com[^'"]+['"]/g, "imageUri: ''");
  
  fs.writeFileSync(filePath, content);
});
console.log('Removed broken Unsplash URLs from data files');
