sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.incture.odataapp.controller.home", {
            onInit: function () {
                this.getOdataService();
                this.getOdataServiceCustomers();
                this.getOdataServiceInvoices();
            },
            getOdataService: function () {
                let oDataModel = this.getOwnerComponent().getModel(),
                    oJsonModel = this.getOwnerComponent().getModel("oJsonModel"),
                    sPath = "/Employees";
                oDataModel.read(sPath, {
                    success: function (res) {
                        // debugger ;
                        oJsonModel.setProperty("/listData", res.results)
                    },
                    error: function (err) {
                        console.log("error")
                    }
                })
            },
            getOdataServiceCustomers: function () {
                let oDataModel = this.getOwnerComponent().getModel(),
                    oJsonFilterModel = this.getOwnerComponent().getModel("oJsonFilterModel"),
                    sPath = "/Customers";
                oDataModel.read(sPath, {
                    success: function (res) {
                        console.log(res)
                        oJsonFilterModel.setProperty("/listData", res.results)
                    },
                    error: function (err) {
                        console.log("error")
                    }
                })
            },
            getOdataServiceInvoices: function () {
                let oDataModel = this.getOwnerComponent().getModel(),
                    oJsonModelInvoices = this.getOwnerComponent().getModel("oJsonModelInvoices"),
                    sPath = "/Invoices";
                oDataModel.read(sPath, {
                    success: function (res) {
                        console.log(res)
                        oJsonModelInvoices.setProperty("/listData", res.results)
                    },
                    error: function (err) {
                        console.log("error")
                    }
                })
            },
            filterThroughSearch: function (event) {
                var searchValue = event.getParameter("newValue");
                var list = this.byId("list");
                var binding = list.getBinding("items");

                if (searchValue.trim()) {
                    binding.filter([new Filter("CustomerID", FilterOperator.Contains, searchValue)]);
                } else {
                    binding.filter([]);
                }
            }
        });
    });
