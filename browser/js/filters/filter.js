app.filter('facebookPhoto', function () {
  return function (fbId) {
    return "http://res.cloudinary.com/demo/image/facebook/" + fbId + ".jpg";
  };
});
