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

  var MAX_IMAGE_SIZE = 200;
  var ImageReader = {};
  var canvas = document.createElement('canvas');

  function resizeImage(srcWidth, srcHeight, maxImageSize) {
    if (srcWidth * srcHeight > maxImageSize * maxImageSize) {
      var ratio = Math.sqrt(srcWidth * srcHeight / (maxImageSize * maxImageSize));
      srcWidth /= ratio;
      srcHeight /= ratio;
      console.log(srcWidth, srcHeight);
    }
    return {
      width: srcWidth,
      height: srcHeight,
      x: 0,
      y: 0,
      srcWidth: srcWidth,
      srcHeight: srcHeight
    };
  }

  ImageReader.readFile = function(file) {
    var deferred = $q.defer();
    var fileReader = new FileReader();
    fileReader.onload = function (e){
      var img = new Image();
      var imageDataUrl = e.target.result;
      img.onload = function (e) {
        var cropRegion = resizeImage(img.width, img.height, MAX_IMAGE_SIZE);
        canvas.width = cropRegion.width;
        canvas.height = cropRegion.height;
        var context = canvas.getContext('2d');
        context.drawImage(img, -cropRegion.x, -cropRegion.y, cropRegion.srcWidth, cropRegion.srcHeight);

        deferred.resolve(canvas.toDataURL('image/png'));
      };
      img.src = imageDataUrl;
    };
    fileReader.readAsDataURL(file);

    return deferred.promise;
  }

  return ImageReader;
});
