// Addresses Javascript
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('AddressesController', AddressesController);

    AddressesController.$inject = ['$scope', '$baseController', 'statesAndTerritoriesService', 'addressesService', 'consumerNotifications', 'model'];

    function AddressesController(
        $scope
        , $baseController
        , statesAndTerritoriesService
        , addressesService
        , consumerNotifications
        , model) {

        var vm = this;

        $baseController.merge(vm, $baseController);

        vm.$scope = $scope;

        //Services
        vm.statesAndTerritoriesService = statesAndTerritoriesService;
        vm.statesAndTerritoriesService.names = null;
        vm.notify = vm.statesAndTerritoriesService.getNotifier($scope); //for Ajax calls
        vm.addressesService = addressesService;
        vm.consumerNotifications = consumerNotifications;
        vm.model = model;
            
        //Variables
        vm.showAddressesFormErrors = false;
        vm.resetButton = "New Address";
        vm.submitButton = "Submit";
        vm.addressesId = null;
        vm.address = {}; // You have to define this as an object so it can be read when you getById
        vm.editMode = null;

        //Functions
        vm.onAddressesFormSubmit = _onAddressesFormSubmit;

        render();

        function render() {
            vm.$log.debug("Angular ready");
            vm.addressesService.getByUserId(_onGetByUserIdSuccess, _onGetByUserIdError);
        }


        // state Render Function
        function stateRender() {
            foundIt.services.statesAndTerritories.getAll(_statesAndTerritoriesGetAllSuccess, _statesAndTerritoriesGetAllError);
        }

        function _onAddressesFormSubmit() {
            vm.showAddressesFormErrors = true;
            if (vm.addressesForm.$valid) {
                var address = {};
                address = vm.address;
                vm.address.stateId = vm.stateId;

                if (vm.address.id == null) {
                    vm.addressesService.create(address, _onAddressesCreateSuccess, _onAddressesCreateError);
                    console.log(vm.address);
                } else {
                    vm.address.id = vm.addressesId;
                    vm.address.stateId = vm.stateId;

                    vm.addressesService.update(vm.address, _onAddressesUpdateSuccess, _onAddressesUpdateError);
                }
            } else {
                vm.consumerNotifications.error("Please fill in all fields?", "Error");
            }
        }


        function _onAddressesCreateError() {
            vm.consumerNotifications.error("Failed to submit address", "Error");
        }

        function _onAddressesCreateSuccess(data) {
            vm.notify(function () { // Notify is only used if we're updating the html template
                vm.$log.debug(data);
                vm.addressesId = data.item;
                vm.address.id = data.item;
                vm.consumerNotifications.success("Address successfully submitted!", "Success");
                vm.submitButton = "Update";
            });
            vm.addressesService.$window.location.href = "/requests";
        }

        function _onAddressesUpdateError() {
            vm.consumerNotifications.error("Failed to update address", "Error");
        }

        function _onAddressesUpdateSuccess(data) {

            vm.notify(function () {
                vm.consumerNotifications.success("Address successfully updated!", "Success");
                vm.showNewAddressesFormErrors = false;
            });
            window.location.href = '/requests';
        }

        function _onAddressesGetByIdError() {
            vm.consumerNotifications.error("Failed to retrieve address information", "Error");
        }


        function _populateAddressOnForm(address) {
            vm.address = address; // originalAddress
            vm.stateId = address.state.id;
        }


        function _statesAndTerritoriesGetAllSuccess(data) {
            vm.notify(function () {
                vm.provinces = data.items;
            });
        }

        function _statesAndTerritoriesGetAllError() {
            console.log("Get States Error");
        }

        function _onGetByUserIdSuccess(data) {
            stateRender();

            if (data.item) {
                _populateAddressOnForm(data.item);
            }

        }

        function _onGetByUserIdError() {
            console.log("Something went wrong with getByUserId");
        }
    }
})();
