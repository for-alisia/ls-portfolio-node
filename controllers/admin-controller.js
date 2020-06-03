const fs = require('fs');
const path = require('path');

const formidable = require('formidable');

const Product = require('../models/products');
const Skill = require('../models/skills');

module.exports.get = function (req, res) {
  if (req.session.isAdmin) {
    res.render('admin', { title: 'Admin Panel', msg: req.query.msg });
  } else {
    res.redirect('/login');
  }
};

module.exports.upload = async (req, res, next) => {
  const form = new formidable.IncomingForm();
  const upload = path.join('./public', 'upload');

  if (!fs.existsSync(upload)) {
    fs.mkdirSync(upload);
  }

  form.uploadDir = path.join(process.cwd(), upload);

  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }

    const valid = validation(fields, files);

    if (valid.err) {
      fs.unlinkSync(files.photo.path);
      return res.redirect(`/?msg=${valid.status}`);
    }

    const fileName = path.join(upload, files.photo.name);

    fs.rename(files.photo.path, fileName, async (err) => {
      if (err) {
        console.error(err.message);
        return;
      }

      const dir = fileName.substr(fileName.indexOf('\\'));

      const productData = {
        name: fields.name,
        price: fields.price,
        src: dir,
      };
      const product = new Product(productData);
      await product.save();

      res.redirect('/admin?msg=Новый товар успешно загружен');
    });
  });
};

module.exports.skills = async (req, res) => {
  const skill = new Skill(req.body);

  await skill.save();

  res.redirect('/admin?msg=Данные успешно изменены');
};

const validation = (fields, files) => {
  if (files.photo.name === '' || files.photo.size === 0) {
    return { status: 'Не загружено изображение товара', err: true };
  }
  if (!fields.name) {
    return { status: 'Не указано наименование товара', err: true };
  }
  if (!fields.price) {
    return { status: 'Не указана цена товара', err: true };
  }
  return { status: 'Ok', err: false };
};
