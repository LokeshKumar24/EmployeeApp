sap.ui.define([
        "sap/ui/core/mvc/Controller",
        "sap/m/MessageBox",
        "sap/ui/model/FilterOperator",
        "sap/ui/model/Filter",
        	'sap/ui/export/Spreadsheet',
	'sap/m/MessageToast'
    
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller,MessageBox,FilterOperator,Filter,Spreadsheet,MessageToast) {
		"use strict";

		return Controller.extend("MT.MTable.controller.View1", {
			onInit: function () {

            },
           
            tUpdate:function(oEvent){
                debugger
                var token=oEvent.getSource().getTokens();
               var data= token.map(Element=>{ return Element.getText()});
             //  this.updateTable(data);
              var table= this.getView().byId("mTable")
                data.forEach(element=>{

                 this.oFilter.push( new Filter("empName", FilterOperator.Contains, element));
                })
                
      // apply filters
      var oBinding = table.getBinding('items');
             oBinding.filter(this.oFilter);

            },
            oFilter:[],
            updateTable:function(){
              //  debugger
                var aToken=this.getView().byId("multiInput1").getTokens();
                var sData = aToken.map( function(token){return token.getText()}).join(",");
               
                  var arr= [],aFilter=[];
                  arr=sData.split(",");

                  arr.forEach(element=>{
                      
                      aFilter.push( new Filter("empName", FilterOperator.Contains, element));
                    })
                    
                    var table= this.getView().byId("mTable");
      // apply filters
      var oBinding = table.getBinding('items');
             oBinding.filter(aFilter);
            },
           selectionChange:function(){
              debugger
           },
            	createColumnConfig: function() {
			return [
				{
					label: 'User ID',
					property: 'empId',
					
					scale: 0
				},
				{
					label: 'EmployeeName',
					property: 'empName',
					width: '25'
				},
				{
					label: 'Salary',
					property: 'empSal',
					width: '25'
				}];
		},

		onExport: function() {
			var aCols, aProducts, oSettings, oSheet;

			aCols = this.createColumnConfig();
			aProducts = this.getView().getModel().getProperty('/EmployeeList');

			oSettings = {
				workbook: { columns: aCols },
				dataSource: aProducts
			};

			oSheet = new Spreadsheet(oSettings);
			oSheet.build()
				.then( function() {
					MessageToast.show('Spreadsheet export has finished');
				})
				.finally(oSheet.destroy);
		}
 
           
		});
	});
