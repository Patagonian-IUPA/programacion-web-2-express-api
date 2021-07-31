const { getClusterId } = require('../../utils/cluster');

/**
 * @see http://localhost:3000/api/utils/id
 */
module.exports = (req, res) => {
  res.json({
    id: getClusterId(),
  });
};
