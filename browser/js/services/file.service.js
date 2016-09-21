app.service('FileUpload', ['$http', function ($http) {
  this.uploadFileToUrl = function(file){
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'aanzim7l');
    return $http.post('https://api.cloudinary.com/v1_1/buidohiep/upload', formData, {
      transformRequest: angular.identity,
      headers: {
        'Content-Type': undefined,
      }
    })
  }
}]);

app.factory('ImageReader', function($q) {

  var ImageReader = {};

  var canvas = document.createElement('canvas');

  ImageReader.readFile = function(file) {
    var deferred = $q.defer();
    var fileReader = new FileReader();
    fileReader.onload = function (e){
      var img = new Image();
      var imageDataUrl = e.target.result;
      img.onload = function (e){
        canvas.width = img.width;
        canvas.height = img.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, img.width, img.height);

        deferred.resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageDataUrl;
    };
    fileReader.readAsDataURL(file);

    return deferred.promise;
  }

  return ImageReader;
});
