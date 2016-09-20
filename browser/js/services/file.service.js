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
