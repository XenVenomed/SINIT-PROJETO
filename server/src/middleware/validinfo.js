module.exports = function (req, res, next) {
  const { name: nomeutilizador, password } = req.body;

  if (req.path === "/register") {
    console.log(!email.length);
    if (![nomeutilizador, password].every(Boolean)) {
      return res.json("Missing Credentials");
    }
  } else if (req.path === "/login") {
    if (![password].every(Boolean)) {
      return res.json("Missing Credentials");
    }
  }

  next();
};
