const logout = (req, res, next) => {
  try {
    req.logout();
    res.status(200).json({
      message: 'logout success'
    });
  } catch (error) {
    next(error);
  }
};

export { logout };
