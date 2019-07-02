const router = require('express').Router()
const User = require('../models/User')
const passport = require('../config/passport')
const { isLoggedIn, isAdmin, isAuth } = require('../middlewares/auth')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/signup', (req, res, next) => {
  const config = {
    title: 'Sign Up',
    action: '/signup',
    button: 'Sign up',
    signup: true
  }
  res.render('auth/auth', config)
})

router.post('/signup', (req, res, next) => {
  User.register({ ...req.body, role: 'admin' }, req.body.password)
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
})

router.get('/login', isLoggedIn, (req, res, next) => {
  const config = {
    title: 'Login',
    action: '/login',
    button: 'Log in'
  }
  res.render('auth/auth', config)
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.send(info)
    if (!user) {
      const config = {
        title: 'Login',
        action: '/login',
        button: 'Log in',
        err: info
      }
      return res.render('auth/auth', config)
    }

    req.login(user, err => {
      if (err) return res.send('😎', err)
      req.app.locals.user = user
      if (user.role === 'admin') return res.redirect('/admin')
      else return res.redirect('/profile')
    })
  })(req, res, next)
})

router.get('/profile', isAuth, (req, res, next) => {
  res.render('auth/profile')
})

router.get('/admin', isAdmin, (req, res, next) => {
  res.send('info secreta')
})

router.get('/logout', (req, res, next) => {
  req.logout()
  res.redirect('/login')
})

router.get('/admin/create', (req, res, next) => {
  res.render('admin/create')
})

module.exports = router
