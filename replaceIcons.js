const fs = require('fs');

function toPascalCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function replaceIconsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let icons = new Set();
  
  // Find all matches
  let match;
  const regex = /<i\s+data-lucide="([^"]+)"([^>]*)><\/i>/g;
  
  let newContent = content.replace(regex, (m, iconName, attributes) => {
    icons.add(toPascalCase(iconName));
    
    // Convert attributes to JSX format (class -> className, remove suppressHydrationWarning as it's not needed for pure React components usually, etc)
    // Wait, the file already has JSX attributes like className="text-white"
    
    return `<${toPascalCase(iconName)}${attributes} />`;
  });
  
  if (icons.size > 0) {
    // Add import statement at the top
    const importStmt = `import { ${Array.from(icons).join(', ')} } from 'lucide-react';\n`;
    newContent = importStmt + newContent;
  }
  
  fs.writeFileSync(filePath, newContent);
  console.log(`Updated ${filePath} with imports:`, Array.from(icons));
}

replaceIconsInFile('app/training/page.js');
replaceIconsInFile('app/register/page.js');
