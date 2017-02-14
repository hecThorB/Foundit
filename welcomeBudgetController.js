// Mens Budgets Javascript
(function () {
    "use strict";

    // Controller for the Budgets Enums
    angular.module(APPNAME).controller('MensBudgetController', MensBudgetController);

    MensBudgetController.$inject = ['$scope', '$baseController', 'mensBudgetEnums'
        , 'profileMensBudgetsService', 'consumerNotifications', 'model'];

    function MensBudgetController(
        $scope
        , $baseController
        , mensBudgetEnums
        , profileMensBudgetsService
        , consumerNotifications
        , model) {

        var vm = this;

        $baseController.merge(vm, $baseController); //simulate inheritance

        vm.$scope = $scope;

        // Services
        vm.profileMensBudgetsService = profileMensBudgetsService;
        vm.notify = vm.profileMensBudgetsService.getNotifier($scope); //Don't forget to do this for Ajax calls
        vm.mensBudgetEnums = mensBudgetEnums;
        vm.consumerNotifications = consumerNotifications;
        vm.model = model;

        //Drop Down Enums
        vm.accessoriesDropDown = vm.mensBudgetEnums.accessoriesKindEnum;
        vm.suitsDropDown = vm.mensBudgetEnums.suitsKindEnum;
        vm.outerwearDropDown = vm.mensBudgetEnums.outerwearKindEnum;
        vm.shirtsDropDown = vm.mensBudgetEnums.shirtsKindEnum;
        vm.sweatersDropDown = vm.mensBudgetEnums.sweatersKindEnum;
        vm.activewearDropDown = vm.mensBudgetEnums.activewearKindEnum;
        vm.swimwearDropDown = vm.mensBudgetEnums.swimwearKindEnum;
        vm.shortsDropDown = vm.mensBudgetEnums.shortsKindEnum;
        vm.bagsDropDown = vm.mensBudgetEnums.bagsKindEnum;
        vm.pantsDropDown = vm.mensBudgetEnums.pantsKindEnum;
        vm.tiesDropDown = vm.mensBudgetEnums.tiesKindEnum;
        vm.shoesDropDown = vm.mensBudgetEnums.shoesKindEnum;
        vm.firstMensFindDropDown = vm.mensBudgetEnums.firstMensFindKindEnumm;

        // Variablles
        vm.showNewBudgetFormErrors = false;
        vm.submitButton = "Submit";
        vm.resetButton = "New Budget";
        vm.budgetId = vm.model.budgetId;
        vm.budgetUserId = vm.model.userId;
        vm.data = {}; // You have to define this as an object so it can be read when you getById
        vm.editMode = null;
        vm.editedBudget = null;

        // Functions
        vm.onBudgetFormSubmit = _onBudgetFormSubmit;
        vm.onBudgetFormReset = _onBudgetFormReset;

        render(); //This Function is like Start Up

        function render() {

            var isAdmin = false;
            vm.profileMensBudgetsService.setPrefix(isAdmin);

            vm.$log.debug("Angular Ready");

            vm.profileMensBudgetsService.get(_onBudgetGetByIdSuccess, _onBudgetGetByIdError);

        }


        function _onBudgetFormSubmit() {
            vm.showNewBudgetFormErrors = true;

            if (vm.budgetForm.$valid) {

                vm.profileMensBudgetsService.upsert(vm.data, _onBudgetCreateSuccess, _onBudgetCreateError);
            } else {
                vm.consumerNotifications.error("Did you choose all fields?", "Error");
            }
        }

        function _onBudgetFormReset() {
            if (vm.editMode == "active") {
                vm.showNewBudgetFormErrors = false;
                vm.data.accessoriesType = vm.editedBudget.accessoriesType;
                vm.data.suitsType = vm.editedBudget.suitsType;
                vm.data.outerwearType = vm.editedBudget.outerwearrType;
                vm.data.shirtsType = vm.editedBudget.shirtsType;
                vm.data.sweatersType = vm.editedBudget.sweatersType;
                vm.data.activewearType = vm.editedBudget.activewearType;
                vm.data.swimwearType = vm.editedBudget.swimwearType;
                vm.data.shortsType = vm.editedBudget.shortsType;
                vm.data.bagsType = vm.editedBudget.bagsType;
                vm.data.pantsType = vm.editedBudget.pantsType;
                vm.data.tiesType = vm.editedBudget.tiesType;
                vm.data.shoesType = vm.editedBudget.shoesType;
                vm.data.firstMensFind1Type = vm.editedBudget.firstMensFind1Type;
                vm.data.firstMensFind2Type = vm.editedBudget.firstMensFind2Type;
                vm.data.firstMensFind3Type = vm.editedBudget.firstMensFind3Type;

                resetEnums();
            } else {
                vm.consumerNotifications.prompt("Are you sure you want to make a new budget profile?", _onOkCallBack);
            }
        }

        function _onBudgetCreateError() {
            vm.consumerNotifications.error("Failed to create new budget", "Error");
        }

        function _onBudgetCreateSuccess(data) {

            vm.notify(function () { // Notify is only used if we're updating the html template
                vm.$log.debug(data);
                vm.budgetId = data.item;
                vm.data.id = data.item;
                vm.profileMensBudgetsService.$window.location.href = "/profiles#/address";
                
                //vm.showNewBudgetFormErrors = false;
            });
            window.location.href = '/profiles#/address';
        }

        function _onBudgetUpdateError() {
            vm.consumerNotifications.error("Failed to update budget", "Error");
        }

        function _onBudgetUpdateSuccess(data) {

            vm.notify(function () {
                setLastVersion(vm.data);

                vm.profileMensBudgetsService.$window.location.href = "/profiles#/address";
                vm.showNewBudgetFormErrors = false;
            });
            window.location.href = '/profiles#/address';
        }

        function _onBudgetGetByIdError() {
            vm.consumerNotifications.error("Failed to retrieve budget information", "Error");
        }


        function _onBudgetGetByIdSuccess(data) {

            if (!data.item) {
                return;
            }

            vm.notify(function () {
                vm.$log.debug(data);
                vm.submitButton = "Update";
                vm.resetButton = "Reset";
                vm.editMode = "active";

                vm.data = data.item;

                vm.data.accessoriesType = data.item.accessoriesType;
                vm.data.suitsType = data.item.suitsType;
                vm.data.outerwearType = data.item.outerwearType;
                vm.data.shirtsType = data.item.shirtsType;
                vm.data.sweatersType = data.item.sweatersType;
                vm.data.activewearType = data.item.activewearType;
                vm.data.swimwearType = data.item.swimwearType;
                vm.data.shortsType = data.item.shortsType;
                vm.data.bagsType = data.item.bagsType;
                vm.data.pantsType = data.item.pantsType;
                vm.data.tiesType = data.item.tiesType;
                vm.data.shoesType = data.item.shoesType;
                vm.data.firstMensFind1Type = data.item.firstMensFind1Type;
                vm.data.firstMensFind2Type = data.item.firstMensFind2Type;
                vm.data.firstMensFind3Type = data.item.firstMensFind3Type;
                setLastVersion(data.item);

            });
        }

        function setLastVersion(item) {
            vm.editedBudget = {
                accessoriesType: item.accessoriesType,
                suitsType: item.suitsType,
                outerwearType: item.outerwearType,
                shirtsType: item.shirtsType,
                sweatersType: item.sweatersType,
                activewearType: item.activewearType,
                swimwearType: item.swimwearType,
                shortsType: item.shortsType,
                bagsType: item.bagsType,
                pantsType: item.pantsType,
                tiesType: item.tiesType,
                shoesType: item.shoesType,
                firstMensFind1Type: item.firstMensFind1Type,
                firstMensFind2Type: item.firstMensFind2Type,
                firstMensFind3Type: item.firstMensFind3Type
            };
        }

        function _onOkCallBack() {
            vm.notify(function () {
                vm.budgetId = null;
                vm.showNewBudgetFormErrors = false;
                vm.submitButton = "Submit";

                resetEnums();
            });
        }

        function resetEnums() {
            vm.data.accessoriesType = "";
            vm.data.suitsType = "";
            vm.data.outerwearType = "";
            vm.data.shirtsType = "";
            vm.data.sweatersType = "";
            vm.data.activewearType = "";
            vm.data.swimwearType = "";
            vm.data.shortsType = "";
            vm.data.bagsType = "";
            vm.data.pantsType = "";
            vm.data.tiesType = "";
            vm.data.shoesType = "";
            vm.data.firstMensFind1Type = "";
            vm.data.firstMensFind2Type = "";
            vm.data.firstMensFind3Type = "";
        }
    }
}
)();



// Womens Budgets Javascript
(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('womensBudgetsController', WomensBudgetsController);

    WomensBudgetsController.$inject = ['$scope', '$baseController', 'womensBudgetEnums', 'profileWomensBudgetsService', 'consumerNotifications', 'womensBudgetsModel'];

    function WomensBudgetsController(
        $scope
        , $baseController
        , womensBudgetEnums
        , profileWomensBudgetsService
        , consumerNotifications
        , womensBudgetsModel) {

        var vm = this;

        $baseController.merge(vm, $baseController); //simulate inheritance

        vm.$scope = $scope;

        //Services
        vm.profileWomensBudgetsService = profileWomensBudgetsService;
        vm.notify = vm.profileWomensBudgetsService.getNotifier($scope); //Don't forget to do this for Ajax calls
        vm.enums = womensBudgetEnums;
        vm.consumerNotifications = consumerNotifications;
        vm.model = womensBudgetsModel;

        //DropDownEnums
        vm.accessoriesDropDown = vm.enums.accessoriesKindEnum;
        vm.topsDropDown = vm.enums.topsKindEnum;
        vm.outerwearDropDown = vm.enums.outerwearKindEnum;
        vm.dressesDropDown = vm.enums.dressesKindEnum;
        vm.sweatersDropDown = vm.enums.sweatersKindEnum;
        vm.activewearDropDown = vm.enums.activewearKindEnum;
        vm.jacketsDropDown = vm.enums.jacketsKindEnum;
        vm.shortsDropDown = vm.enums.shortsKindEnum;
        vm.shoesDropDown = vm.enums.shoesKindEnum;
        vm.pantsDropDown = vm.enums.pantsKindEnum;
        vm.jewelryDropDown = vm.enums.jewelryKindEnum;
        vm.skirtsDropDown = vm.enums.skirtsKindEnum;
        vm.suitsDropDown = vm.enums.suitsKindEnum;
        vm.swimwearDropDown = vm.enums.swimwearKindEnum;
        vm.bagsDropDown = vm.enums.bagsKindEnum;
        vm.maternityDropDown = vm.enums.maternityKindEnum;
        vm.firstFindDropDown = vm.enums.firstFindKindEnum;

        //Variables
        vm.showNewBudgetFormErrors = false;
        vm.submitButton = "Submit";
        vm.resetButton = "New Budget";
        vm.budgetId = vm.model.budgetId;
        vm.data = {}; //have to define this as an object so it can be read when you getById
        vm.editMode = null;
        vm.editedBudget = null;

        //Functions
        vm.onBudgetFormSubmit = _onBudgetFormSubmit;
        vm.onBudgetFormReset = _onBudgetFormReset;

        render(); //Like Startup
        function render() {
            vm.$log.debug("Angular ready");

            var isAdmin = false;

            vm.profileWomensBudgetsService.setPrefix(isAdmin);


            vm.profileWomensBudgetsService.get(_onBudgetGetByIdSuccess, _onBudgetGetByIdError);

        }

        function _onBudgetFormSubmit() {
            vm.showNewBudgetFormErrors = true;
            if (vm.budgetForm.$valid) {
                vm.profileWomensBudgetsService.upsert(vm.data, _onBudgetCreateSuccess, _onBudgetCreateError);
            } else {
                vm.consumerNotifications.error("Did you choose all fields?", "Error");
            }
        }

        function _onBudgetFormReset() {
            if (vm.editMode == "active") {
                vm.showNewBudgetFormErrors = false;
                vm.data.accessoriesType = vm.editedBudget.accessoriesType;
                vm.data.topsType = vm.editedBudget.topsType;
                vm.data.outerwearType = vm.editedBudget.outerwearType;
                vm.data.dressesType = vm.editedBudget.dressesType;
                vm.data.sweatersType = vm.editedBudget.sweatersType;
                vm.data.activewearType = vm.editedBudget.activewearType;
                vm.data.jacketsType = vm.editedBudget.jacketsType;
                vm.data.shortsType = vm.editedBudget.shortsType;
                vm.data.shoesType = vm.editedBudget.shoesType;
                vm.data.pantsType = vm.editedBudget.pantsType;
                vm.data.jewelryType = vm.editedBudget.jewelryType;
                vm.data.skirtsType = vm.editedBudget.skirtsType;
                vm.data.suitsType = vm.editedBudget.suitsType;
                vm.data.swimwearType = vm.editedBudget.swimwearType;
                vm.data.bagsType = vm.editedBudget.bagsType;
                vm.data.maternityType = vm.editedBudget.maternityType;
                vm.data.firstWomensFind1Type = vm.editedBudget.firstWomensFind1Type;
                vm.data.firstWomensFind2Type = vm.editedBudget.firstWomensFind2Type;
                vm.data.firstWomensFind3Type = vm.editedBudget.firstWomensFind3Type;
            } else {
                vm.consumerNotifications.prompt("Are you sure you want to make a new budget profile?", _onOkCallBack);
            }
        }

        function _onBudgetCreateError() {
            vm.consumerNotifications.error("Failed to create new budget", "Error");
        }

        function _onBudgetCreateSuccess(data) {
            vm.notify(function () { //Notify is only used if we're updating the html template
                vm.$log.debug(data);
                vm.budgetId = data.item;
                vm.profileWomensBudgetsService.$window.location.href = "/profiles#/address";
                vm.showNewBudgetFormErrors = false;
            });
            window.location.href = '/profiles#/address';
        }

        function _onBudgetUpdateError() {
            vm.consumerNotifications.error("Failed to update budget", "Error");
        }

        function _onBudgetUpdateSuccess(data) {
            vm.notify(function () {
                vm.editedBudget = {
                    accessoriesType: vm.data.accessoriesType,
                    topsType: vm.data.topsType,
                    outerwearType: vm.data.outerwearType,
                    dressesType: vm.data.dressesType,
                    sweatersType: vm.data.sweatersType,
                    activewearType: vm.data.activewearType,
                    jacketsType: vm.data.jacketsType,
                    shortsType: vm.data.shortsType,
                    shoesType: vm.data.shoesType,
                    pantsType: vm.data.pantsType,
                    jewelryType: vm.data.jewelryType,
                    skirtsType: vm.data.skirtsType,
                    suitsType: vm.data.suitsType,
                    swimwearType: vm.data.swimwearType,
                    bagsType: vm.data.bagsType,
                    maternityType: vm.data.maternityType,
                    firstWomensFind1Type: vm.data.firstWomensFind1Type,
                    firstWomensFind2Type: vm.data.firstWomensFind2Type,
                    firstWomensFind3Type: vm.data.firstWomensFind3Type
                };
                vm.profileWomensBudgetsService.$window.location.href = "/profiles#/address";
                vm.showNewBudgetFormErrors = false;
            });
            window.location.href = '/profiles#/address';
        }

        function _onBudgetGetByIdError() {
            vm.consumerNotifications.error("Failed to retrieve budget information", "Error");
        }

        function _onBudgetGetByIdSuccess(data) {
            if (!data.item) {
                return;
            }
            vm.notify(function () {
                vm.$log.debug(data);
                vm.submitButton = "Update";
                vm.resetButton = "Reset";

                vm.data = data.item;

                vm.data.accessoriesType = data.item.accessoriesType;
                vm.data.topsType = data.item.topsType;
                vm.data.outerwearType = data.item.outerwearType;
                vm.data.dressesType = data.item.dressesType;
                vm.data.sweatersType = data.item.sweatersType;
                vm.data.activewearType = data.item.activewearType;
                vm.data.jacketsType = data.item.jacketsType;
                vm.data.shortsType = data.item.shortsType;
                vm.data.shoesType = data.item.shoesType;
                vm.data.pantsType = data.item.pantsType;
                vm.data.jewelryType = data.item.jewelryType;
                vm.data.skirtsType = data.item.skirtsType;
                vm.data.suitsType = data.item.suitsType;
                vm.data.swimwearType = data.item.swimwearType;
                vm.data.bagsType = data.item.bagsType;
                vm.data.maternityType = data.item.maternityType;
                vm.data.firstWomensFind1Type = data.item.firstWomensFind1Type;
                vm.data.firstWomensFind2Type = data.item.firstWomensFind2Type;
                vm.data.firstWomensFind3Type = data.item.firstWomensFind3Type;

                vm.editedBudget = {
                    accessoriesType: data.item.accessoriesType,
                    topsType: data.item.topsType,
                    outerwearType: data.item.outerwearType,
                    dressesType: data.item.dressesType,
                    sweatersType: data.item.sweatersType,
                    activewearType: data.item.activewearType,
                    jacketsType: data.item.jacketsType,
                    shortsType: data.item.shortsType,
                    shoesType: data.item.shoesType,
                    pantsType: data.item.pantsType,
                    jewelryType: data.item.jewelryType,
                    skirtsType: data.item.skirtsType,
                    suitsType: data.item.suitsType,
                    swimwearType: data.item.swimwearType,
                    bagsType: data.item.bagsType,
                    maternityType: data.item.maternityType,
                    firstWomensFind1Type: data.item.firstWomensFind1Type,
                    firstWomensFind2Type: data.item.firstWomensFind2Type,
                    firstWomensFind3Type: data.item.firstWomensFind3Type
                };
            });
        }

        function _onOkCallBack() {
            vm.notify(function () {
                vm.budgetId = null;
                vm.showNewBudgetFormErrors = false;
                vm.submitButton = "Submit";
                vm.data.accessoriesType = "";
                vm.data.topsType = "";
                vm.data.outerwearType = "";
                vm.data.dressesType = "";
                vm.data.sweatersType = "";
                vm.data.activewearType = "";
                vm.data.jacketsType = "";
                vm.data.shortsType = "";
                vm.data.shoesType = "";
                vm.data.pantsType = "";
                vm.data.jewelryType = "";
                vm.data.skirtsType = "";
                vm.data.suitsType = "";
                vm.data.swimwearType = "";
                vm.data.bagsType = "";
                vm.data.maternityType = "";
                vm.data.firstWomensFind1Type = "";
                vm.data.firstWomensFind2Type = "";
                vm.data.firstWomensFind3Type = "";
            });
        }
    }

})();
