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

app.filter('defaultPhotoThumnail', function () {
  return function (url) {
    if (url) {
      var params = url.split('/');
      params.splice(params.length - 2, 0, 'w_100,h_100');
      url = params.join('/');
    }
    return url || 'https://www.us.aspjj.com/sites/aspjj.com.us/files/default_images/No_available_image_3.jpg';
  };
});
