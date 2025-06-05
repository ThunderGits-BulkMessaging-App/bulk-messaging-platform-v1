const { createOrganisation, getAllOrganisations, getOrganisationById, updateOrganisation, deleteOrganisation } = require("../services/organisation.service");


// CREATE
exports.createOrganisation = async (req, res) => {
  try {
    const organisation = await createOrganisation(req.body, req.user._id);
    res.status(201).json({
      success: true,
      message: 'Organisation created successfully',
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create organisation',
      error: error.message,
    });
  }
};

// READ ALL
exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = (await getAllOrganisations());
    res.status(200).json({
      success: true,
      message: 'Organisations fetched successfully',
      data: organisations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organisations',
      error: error.message,
    });
  }
};

// READ ONE
exports.getOrganisationById = async (req, res) => {
  try {
    const organisation = await getOrganisationById(req.params.id);
    if (!organisation) {
      return res.status(404).json({
        success: false,
        message: 'Organisation not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Organisation fetched successfully',
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch organisation',
      error: error.message,
    });
  }
};

// UPDATE
exports.updateOrganisation = async (req, res) => {
  try {
    const organisation = await updateOrganisation(req.params.id, req.body);
    if (!organisation) {
      return res.status(404).json({
        success: false,
        message: 'Organisation not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Organisation updated successfully',
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update organisation',
      error: error.message,
    });
  }
};

// DELETE
exports.deleteOrganisation = async (req, res) => {
  try {
    const organisation = await deleteOrganisation(req.params.id);
    if (!organisation) {
      return res.status(404).json({
        success: false,
        message: 'Organisation not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Organisation deleted successfully',
      data: organisation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete organisation',
      error: error.message,
    });
  }
};
