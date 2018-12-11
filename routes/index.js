exports.index = function (req, res) {
  var user = req.session.user,
    userId = req.session.userId;
  if (userId == null) {
    res.redirect("/login");
    return;
  }

  db.collection('users').findOne({
    "_id": ObjectId(userId)
  }, function (err, result) {
    console.log(result);
    res.render('index.ejs', {
      data: result,
    });
  });
};

exports.login = function (req, res) {
  const message = '';
  res.render('login.ejs', {
    message: message
  });
};

exports.fourohfourG = function (req, res) {
  let userId = req.session.userId;
  if (userId == null) {
    res.redirect("/");
    return;
  }
  res.render('no-page-exists.ejs');
};

exports.fourohfourP = function (req, res) {
  res.send("Time to 420", 420);
}