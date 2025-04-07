// 📁 services/template.service.js
const repo = require('../repository/template.repository');
const { extractVariables, renderTemplate } = require('../utils/templateRenderer');

exports.createTemplate = async (userId, data) => {
  const variables = extractVariables(data.content);
  return repo.create({ ...data, userId, variables });
};

exports.getUserTemplates = (userId) => {
  return repo.findByUserId(userId);
};

exports.getTemplateById = async (userId, id) => {
  const template = await repo.findById(id);
  if (!template || template.userId.toString() !== userId) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return template;
};

exports.updateTemplate = async (userId, id, data) => {
  const template = await repo.findById(id);
  if (!template || template.userId.toString() !== userId) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  const variables = extractVariables(data.content);
  return repo.update(id, { ...data, variables });
};

exports.deleteTemplate = async (userId, id) => {
  const template = await repo.findById(id);
  if (!template || template.userId.toString() !== userId) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.remove(id);
};

exports.renderTemplateWithVariables = async (userId, id, variables) => {
  const template = await exports.getTemplateById(userId, id);
  return renderTemplate(template.content, variables);
};
