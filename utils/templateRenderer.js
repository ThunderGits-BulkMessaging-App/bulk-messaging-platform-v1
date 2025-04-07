
// 📁 utils/templateRenderer.js
exports.renderTemplate = (content, variables = {}) => {
    return content.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      return variables[key] || '';
    });
  };
  
  exports.extractVariables = (content) => {
    const matches = content.match(/{{\s*(\w+)\s*}}/g) || [];
    return [...new Set(matches.map(v => v.replace(/{{\s*|\s*}}/g, '')))]
  };