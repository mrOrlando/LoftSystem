const db = require('../models/db');

module.exports.saveNewUser = async function(req, res) {
  try {
    const user = await db.addUser(req.body);
    console.log(`User ${user.username} is saved with id ${user.id}`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: err.message });
  }
};
