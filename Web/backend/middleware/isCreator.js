module.exports = (req, res, next) => {
  if (!req.user) {
    return res.json({ err: "There is some problem with Authorization" });
  }

  if (req.user.role === 1) {
    next();
  } else {
    return res.json({ err: "You are not a Creator! You cant edit or create" });
  }
};
