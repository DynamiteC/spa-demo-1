/*jshint esversion: 6 */
const crypto = require('crypto');
const secret = 'SpaceMomLore';
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function (req, res) {
  let message = '';
  if (req.method == "POST") {
    let post = req.body;
    let pass = post.password;
    let fname = post.first_name;
    let lname = post.last_name;
    let email = post.email;
    db.collection('users').findOne({
        email: email
      },
      function (err, user) {
        if (err) {
          message = err.message;

          res.send({
            flag: false,
            msg: message
          });
          return;
        }
        if (user === null) {
          let hash = crypto.createHmac('md5', secret).update(pass).digest('hex');
          let userObj = {
            first_name: fname,
            last_name: lname,
            email: email,
            password: hash
          };
          db.collection('users').insertOne(userObj, function (err, result) {
            if (err) {
              message = err.message;
              console.log(message);
              res.send({
                flag: false,
                msg: message
              });
              return;
            }
            res.send({
              flag: true,
              msg: "Account Created Successfully"
            });
          });
        } else {
          message = "Email has been already used.";
          res.send({
            flag: false,
            msg: message
          });
          return;
        }
      });
  } else {
    res.render('signup.ejs');
  }
};

//-----------------------------------------------login page call------------------------------------------------------
exports.login = function (req, res) {
  var message = '';
  if (req.method == "POST") {
    let post = req.body;
    let email = post.user_name;
    let pass = post.password;
    db.collection('users').findOne({
      email: email
    }, function (err, result) {
      if (err) {
        res.render('login.ejs', {
          message: err.message,
          type: 'is-danger'
        });
        return;
      }

      if (result === null) {
        message = "Email Address Doesn't Exist.";
        res.render('login.ejs', {
          message: message,
          type: 'is-danger'
        });
        return -1;
      }
      let tempHash = crypto.createHmac('md5', secret).update(pass).digest('hex');
      let resX = false;
      if (tempHash == result.password) {
        resX = true;
      }
      if (resX) {
        req.session.userId = result._id;
        req.session.user = result;
        res.redirect('/home');
      } else {
        message = 'Incorrect Credentials.';
        res.render('login.ejs', {
          message: message,
          type: 'is-danger'
        });
      };
    });
  } else {
    res.render('login.ejs', {
      message: message
    });
  }
};
//------------------------------------logout functionality----------------------------------------------
exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/login");
  });
};