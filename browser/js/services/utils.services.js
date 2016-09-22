app.factory('InternetService', function() {
  var InternetService = {};
  InternetService.isOnline = function() {
    return navigator.onLine;
  }
  return InternetService;
});

app.factory('ToastService', function() {
  var ToastService = {};
  ToastService.showToast = function($mdToast, message) {
    if (!message) return;
    var pinTo = {
			top: false,
			left: false,
			bottom: true,
			right: true
		}
    $mdToast.show(
      $mdToast.simple()
        .textContent(message)
        .position(pinTo)
        .hideDelay(500)
    );
  }
  return ToastService;
});
