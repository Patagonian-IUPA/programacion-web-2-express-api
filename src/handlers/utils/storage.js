const { getClusterId } = require('../../utils/cluster');
const storage = require('../../utils/storage');

/**
 * @see http://localhost:3000/api/utils/storage
 */
module.exports = (req, res) => {
  res.json({
    id: getClusterId(),
    storage,
  });
};
