const User = require('../models/users');

module.exports.get = function (req, res) {
  if (req.session.isAdmin) {
    res.redirect('/admin');
  } else {
    res.render('login', {
      title: 'Авторизация',
      msg: req.query.msg,
    });
  }
};

module.exports.post = async (req, res) => {
  const user = await User.findUser(req.body);

  if (user.length !== 0) {
    req.session.isAdmin = true;
    res.redirect('/admin');
  } else {
    res.redirect('/login?msg=Не найден пользователь с такими данными');
  }
};
