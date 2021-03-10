const checkAuth = (req, res, next) => {
  console.log('CHECKING USER AUTH.......');
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    throw new Error('Authentication Failed!');
  }
};

const checkAdmin = (req, res, next) => {
  console.log('CHECKING ADMIN AUTH...');
  if (req.isAuthenticated()) {
    if (req.user.is_admin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized user!');
    }
  } else {
    res.status(401);
    throw new Error('Authentication Failed!');
  }
};

module.exports = { checkAuth, checkAdmin };
