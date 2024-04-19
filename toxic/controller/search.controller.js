// controllers/searchController.js

const UserModel = require('../models/user.model');

exports.searchUsers = async (req, res) => {
  try {
    const { keyword } = req.query;

    const query = {
      $or: [
        { username: { $regex: keyword, $options: 'i' } },
        { name: { $regex: keyword, $options: 'i' } },
      ],
    };

    const searchResults = await UserModel.find(query);

    res.json(searchResults);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
