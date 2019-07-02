exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return res.redirect('/profile')
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') return next()
  return res.send('epale putito 😎')
}

exports.isAuth = (req, res, next) => {
  if (!req.isAuthenticated()) return res.redirect('/login')
  next()
}
