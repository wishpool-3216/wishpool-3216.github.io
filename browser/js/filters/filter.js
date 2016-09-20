app.filter('facebookPhoto', function () {
  return function (fbId) {
    if (!fbId) return null;
    return "http://res.cloudinary.com/demo/image/facebook/" + fbId + ".jpg";
  };
});

app.filter('defaultPhoto', function () {
  return function (url) {
    return url || 'https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg';
  };
});
