const Organisation = require("../Models/Organisation");
const User = require("../Models/User");


exports.createOrganisation = async (data, userId) => {
    const session = await Organisation.startSession();
    session.startTransaction();
  
    try {
      const { email, ...orgData } = data;
  
      // Step 1: Create Organisation
      const organisation = new Organisation({ ...orgData, email, createdBy: userId });
      await organisation.save({ session });
  
      // Step 2: Generate random password
      const randomPassword =  "adminBhai" //crypto.randomBytes(8).toString('hex'); // 16 char random
     
  
      // Step 3: Create Admin User
      const adminUser = new User({
        firstName: organisation.name,
        lastName: 'last',
        email,
        password: randomPassword,
        role: 'admin',
        organisation: organisation._id,
      });
      await adminUser.save({ session });
  
      await session.commitTransaction();
      session.endSession();
  
      return {
        organisation,
        adminUser: {
          email: adminUser.email,
          password: randomPassword, // send plaintext only once (e.g., via email)
        },
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  };

exports.getAllOrganisations = async () => {
  return await Organisation.find();
};

exports.getOrganisationById = async (id) => {
  return await Organisation.findById(id);
};

exports.updateOrganisation = async (id, updateData) => {
  return await Organisation.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

exports.deleteOrganisation = async (id) => {
  return await Organisation.findByIdAndDelete(id);
};
