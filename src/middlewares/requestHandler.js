module.exports = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (err) {
    console.error('ERROR!', { req, err });

    res.status(500).json({
      status: 'error',
      message: err.message,
    });
  }
};
