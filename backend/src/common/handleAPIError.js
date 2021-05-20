function handleAPIError(err, res) {
  console.log(err);
  if (err.statusCode && err.code) {
    return res.status(err.statusCode).json({ success: false, err, message: 'Error AWS' });
  }
  res.status(500).json({ success: false, err, msg: 'Internal Server Error' });
}

module.exports = handleAPIError;
