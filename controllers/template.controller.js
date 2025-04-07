// 📁 controllers/template.controller.js
const service = require('../services/template.service');

exports.create = async (req, res, next) => {
  try {
    const template = await service.createTemplate(req.user.id, req.body);
    res.status(201).json(template);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const templates = await service.getUserTemplates(req.user.id);
    res.json(templates);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const template = await service.getTemplateById(req.user.id, req.params.id);
    res.json(template);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await service.updateTemplate(req.user.id, req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await service.deleteTemplate(req.user.id, req.params.id);
    res.json({ message: 'Template deleted', id: deleted._id });
  } catch (err) {
    next(err);
  }
};

exports.renderPreview = async (req, res, next) => {
  try {
    const rendered = await service.renderTemplateWithVariables(req.user.id, req.params.id, req.body);
    res.json({ rendered });
  } catch (err) {
    next(err);
  }
};