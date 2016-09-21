'use strict';

app.factory('ContributeService', function($http, __env){
	var ContributeService = {};

	// sUrl refers to server URL
	var sUrl = __env.apiUrl;
	var getResponseData = function(response){
		return response.data;
	}


	// Gets all contributions associated with a gift
	ContributeService.getContributions = function(giftId){
		$http.get(sUrl + '/api/v1/gifts/' + giftId + '/contributions')
		.then(getResponseData);
	}


	// Gets a single contribution, requires contrId
	ContributeService.getContribution = function(contrId){
		$http.get(sUrl + '/api/v1/contributions/' + contrId)
		.then(getResponseData);
	}


	// Adds a contribution to a gift, requires giftId and amt
	ContributeService.addContribution = function(giftId, amount){
		return $http.post(sUrl + '/api/v1/gifts/' + giftId + '/contributions', {amount: amount})
		.then(getResponseData);
	}


	// Updates a contribution, requires contrId and amt
	ContributeService.updateContribution = function(contrId, amount){
		return $http.patch(sUrl + '/api/v1/contributions/' + contrId, {amount: amount})
		.then(getResponseData);
	}


	// Deletes a contribution, requires contrId
	ContributeService.deleteContribution = function(contrId){
		return $http.delete(sUrl + '/api/v1/contributions/' + contrId)
		.then(getResponseData);
	}


	return ContributeService;

})
