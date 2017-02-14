sabio.services.addresses = sabio.services.addresses || {};

sabio.services.addresses.create = function (data, onSuccess, onError) {
    var url ="/api/addresses/";

    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: data
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "POST"
    };
    $.ajax(url, settings);
};

sabio.services.addresses.update = function (data, onSuccess, onError) {

    var url ="/api/addresses/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , data: data
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "PUT"
    };
    $.ajax(url, settings);
};

sabio.services.addresses.getAll = function (onAjaxSuccess, onAjaxError) {
    var url = "/api/addresses/";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onAjaxSuccess
        , error: onAjaxError
        , type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.addresses.getById = function (id, onSuccess, onError) {
    var url = "/api/addresses/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "GET"
    };
    $.ajax(url, settings);
};

sabio.services.addresses.delete = function (id, onSuccess, onError) {
    var url = "/api/addresses/" + id;
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onSuccess
        , error: onError
        , type: "DELETE"
    };
    $.ajax(url, settings);
};

sabio.services.addresses.getByUserId = function (onAjaxSuccess, onAjaxError) {
    var url = "/api/addresses/user";
    var settings = {
        cache: false
        , contentType: "application/x-www-form-urlencoded; charset=UTF-8"
        , dataType: "json"
        , success: onAjaxSuccess
        , error: onAjaxError
        , type: "GET"
    };
    $.ajax(url, settings);
};


(function () {
    if (angular) {
        angular.module(APPNAME).factory("addressesService", addressesService);

        addressesService.$inject = ["$baseService", "$sabio"];
        function addressesService($baseService, $sabio) {
            var serviceObject = sabio.services.addresses;
            var service = $baseService.merge(true, {}, serviceObject, $baseService);
            return service;
        }
    }
})();
