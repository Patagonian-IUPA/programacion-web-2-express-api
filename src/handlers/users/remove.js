const database = require('../../database');

// DELETE /api/users/:userId
module.exports = (route) => {
  route.delete('/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    database.remove(userId);

    res.json({
      message: 'User deleted!',
    });
  });
};
