const database = require('../../database');
const requestHandler = require('../../middlewares/requestHandler');

// GET /api/users
module.exports = (route) => {
  route.get(
    '/',
    requestHandler(async (req, res) => {
      const users = await database.list(req.query.filterName);
      res.json(users);
    })
  );
};
