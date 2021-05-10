const database = require('../../database');

// GET /api/users
module.exports = (route) => {
  route.get('/', (req, res) => {
    const filterName = req.query.filterName;
    const users = database.list(filterName);
    res.json(users);
  });
};
