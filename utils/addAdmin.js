const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const User = require('../models/users');
const psw = require('./password');

let email = '';
let hash = '';
let salt = '';
let password = {};

rl.question('Email: ', (answer) => {
  email = answer;
  rl.question('Password: ', (answer) => {
    password = psw.setPassword(answer);
    hash = password.hash;
    salt = password.salt;
    rl.close();
  });
});

rl.on('close', async () => {
  const newUser = new User({ email, hash, salt });

  await newUser.save();
});
