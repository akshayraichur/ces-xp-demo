module.exports = (req, res, next) => {
  if (!req.user) {
    return res.json({ err: "You are not authorized" });
  }

  if (req.user.role === 2) {
    next();
  } else {
    return res.json({ err: "You are not an admin" });
  }
};
