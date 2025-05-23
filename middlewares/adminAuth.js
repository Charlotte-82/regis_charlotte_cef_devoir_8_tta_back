const adminKey = process.env.ADMIN_KEY || "maCleAdminUltraSecrete";

exports.isAdmin = (req, res, next) => {
  const userKey = req.headers["x-admin-key"];

  if (!userKey || userKey !== adminKey) {
    return res
      .status(403)
      .json({
        message: "Accès interdit : seul les administrateurs sont autorisés.",
      });
  }

  next();
};
