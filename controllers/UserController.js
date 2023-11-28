exports.getUser =  (req, res) => {
  const { userId } = req.params;

  res.send(`Get user route ${userId}`);
}

exports.updateUser =  (req, res) => {
  const { userId } = req.params;
  const { name, age } = req.body;

  res.send(`Update user route ${userId} ${name} ${age}`);
}