const database = require('../../database');

// GET /api/users
module.exports = (route) => {
  route.get('/', async (req, res) => {
    const users = await database.list(req.query.filterName);
    res.json(users);
  });
};
