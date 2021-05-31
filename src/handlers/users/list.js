const database = require('../../database');
const requestHandler = require('../../middlewares/requestHandler');

// GET /api/users
module.exports = (route) => {
  route.get(
    '/',
    requestHandler(async (req, res) => {
      const filterName = req.query.filterName;
      const users = await database.list(filterName);
      res.json(users);
    })
  );
};
