const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Product = require('../models/products');
const Skill = require('../models/skills');
const mailConf = require('../config');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: mailConf.api_key,
    },
  })
);

module.exports.get = async (req, res) => {
  const products = await Product.readData();
  const skills = await Skill.readData();
  res.render('index', {
    title: 'Личная страница Архипова',
    products,
    skills,
    msg: req.query.msg,
  });
};

module.exports.post = async (req, res) => {
  try {
    await transporter.sendMail({
      to: mailConf.mail_to,
      from: mailConf.mail_from,
      subject: `Message from ${req.body.name}, email: ${req.body.email}`,
      html: `Message: ${req.body.message}`,
    });
    res.redirect('/?msg=Ваше сообщение успешно отправлено');
  } catch (err) {
    console.log(err);
    res.redirect('/?msg=Возникли ошибки при отправлении сообщения');
  }
};
