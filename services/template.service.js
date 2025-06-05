// 📁 services/template.service.js
const repo = require('../repository/template.repository');
const { extractVariables, renderTemplate } = require('../utils/templateRenderer');

exports.createTemplate = async (organisationId, data) => {
  const variables = extractVariables(data.content);
  return repo.create({ ...data, organisation: organisationId, variables });
};

exports.getUserTemplates = (organisationId) => {
  return repo.findByOrganisationId(organisationId);
};

exports.getTemplateById = async (organisationId, id) => {
  console.log(organisationId, id)
  const template = await repo.findById(id);
  if (!template || template.organisation.toString() !== organisationId.toString()) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return template;
};

exports.updateTemplate = async (organisationId, id, data) => {
  const template = await repo.findById(id);
  if (!template || template.organisation.toString() !== organisationId.toString()) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  const variables = extractVariables(data.content);
  return repo.update(id, { ...data, variables });
};

exports.deleteTemplate = async (organisationId, id) => {
  const template = await repo.findById(id);
  if (!template || template.organisation.toString() !== organisationId.toString()) {
    const err = new Error('Template not found or unauthorized');
    err.status = 404;
    throw err;
  }
  return repo.remove(id);
};

exports.renderTemplateWithVariables = async (organisationId, id, variables) => {
  const template = await exports.getTemplateById(organisationId, id);
  return renderTemplate(template.content, variables);
};
