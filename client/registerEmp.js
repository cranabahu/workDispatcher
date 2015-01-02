/**
 * Created by cranabahu on 11/26/14.
 */

Meteor.subscribe('theEmployees');

Template.registerEmp.rendered = function () {
    $('#empRegForm').parsley({trigger: 'change'});
};

Template.editEmp.rendered = function () {
    $('#empEditForm').parsley({trigger: 'change'});
};


Template.registerEmp.helpers({
    'employee':function(){
        return EmployeeList.find({},{sort: {empNo: -1}});
    },
    'empInsertInfo': function () {
        return Session.get('taskInsertInfo');
    }
});

Template.registerEmp.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var empFullName = event.target.empFullName.value;
        var empNameVar = event.target.empName.value;
        var empAgeVar = Number(event.target.empAge.value);
        var empIsM = Session.get("MaleChecked");
        var empIsF = Session.get("FemaleChecked");
        var empGenderVar = empIsF == true? "Female" : "Male";
        var empHomeTownVar = event.target.empAddr.value;
        var empContactVar = event.target.empContact.value;
        var empLatVar = Session.get("Lat");
        var empLngVar = Session.get("Lng");
        Session.set("Lat",'');
        Session.set("Lng",'');
        Meteor.call('insertEmployee',empFullName,empNameVar,empAgeVar,empGenderVar,empHomeTownVar,empContactVar,empLatVar,empLngVar,function(error,result) {
            if (error) {
                console.log(error.result);
            }
            else {
                Session.set('taskInsertInfo', result);
                event.target.empName.value = null;
                event.target.empAge.value = null;
                event.target.empAddr.value = null;
                gmap.clearMapDiv();
            }
        });
        //event.target.cbMale.removeAttribute('checked');
        //event.target.cbFemale.removeAttribute('checked');
    },

    'reset #page-wrapper': function (events) {
        gmap.clearMapDiv();
        Session.set("Lat",'');
        Session.set("Lng",'');
    },

    'change .cbMale':function(event){
        Session.set("MaleChecked", event.target.checked);
        Session.set("FemaleChecked", false);

        if(document.getElementById("addr").value !== "") {
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },

    'change .cbFemale':function(event){
        Session.set("FemaleChecked", event.target.checked);
        Session.set("MaleChecked", false);

        if(document.getElementById("addr").value !== "") {
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    }
});

//##################################################################

Template.viewEmp.helpers({
    'employee':function(){
        return EmployeeList.find({},{sort: {empNo: -1}});
    },
    'selectedClass':function(){
        var empNo = this.empNo;
        var selectedEmpNo = Session.get('selectedEmpNo');
        if (empNo === selectedEmpNo) {
            return "selected"
        }
    }
});

Template.viewEmp.events({
    'click .empRow': function() {
        var empNo = this.empNo;
        Session.set('selectedEmpNo',empNo);
        document.getElementById("lblInfo").innerHTML = '';
    },
    'click .editLink': function () {
        var empNo = Session.get('selectedEmpNo');
        if(empNo){
            Session.set('editEmpNo',empNo);
            Router.go('/employee/EditEmp');
        }else{
            document.getElementById("lblInfo").innerHTML = 'Please select an employee';
        }
    },
    'click .deleteLink': function () {
        var empNo = Session.get('selectedEmpNo');
        if(empNo){
            Meteor.call('deleteEmp',empNo);
            document.getElementById("lblInfo").innerHTML = 'Employee '+empNo+' deleted.';
        }else{
            document.getElementById("lblInfo").innerHTML = 'Please select an employee';
        }
    }
});

//######################################################################################
Template.editEmp.helpers({
    'employee': function () {
        console.log(Session.get('editEmpNo'));
        var empNoVar = Session.get('editEmpNo');
        return EmployeeList.find({empNo:empNoVar});
    },
    'empUpdatedInfo': function () {
        return Session.get('empUpdatedInfo');
    }
});

Template.editEmp.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var empNoVar = Session.get('editEmpNo');
        var empFullName = event.target.empFullName.value;
        var empAgeVar = Number(event.target.empAge.value);
        var empIsM = Session.get("MaleChecked");
        var empIsF = Session.get("FemaleChecked");
        var empGenderVar = empIsF == true? "Female" : "Male";
        var empHomeTownVar = event.target.empAddr.value;
        var empContactVar = event.target.empContact.value;
        var empLatVar = Session.get("Lat");
        var empLngVar = Session.get("Lng");
        Session.set("Lat",'');
        Session.set("Lng",'');
        Meteor.call('updateEmp',empNoVar,empFullName,empAgeVar,empGenderVar,empHomeTownVar,empContactVar,empLatVar,empLngVar,function(error,result){
                if (error){
                    console.log(error.result);
                }
                else{
                    Session.set('empUpdatedInfo',result);
                    //gmap.clearMapDiv();
                }
        });
        //event.target.cbMale.removeAttribute('checked');
        //event.target.cbFemale.removeAttribute('checked');
    },

    'click .empContact':function(){
        if(document.getElementById("addr").value !== "") {
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },
    'click .gMap':function(){
        if(document.getElementById("addr").value !== "") {
            gmap.codeAddress(document.getElementById("addr").value);
        }else{
            Session.set('Lat',"");
            Session.set('Lng',"");
        }
    },
    'click .empFullName': function () {
        Session.set('taskUpdatedInfo',"");
    }
});

