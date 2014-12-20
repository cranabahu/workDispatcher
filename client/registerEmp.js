/**
 * Created by cranabahu on 11/26/14.
 */

Meteor.subscribe('theEmployees');

Template.registerEmp.helpers({
    'employee':function(){
        return EmployeeList.find({},{sort: {empNo: -1}});
    }
});

Template.registerEmp.events({
    'submit #page-wrapper':function(event){
        event.preventDefault();
        var empNameVar = event.target.empName.value;
        var empAgeVar = Number(event.target.empAge.value);
        var empIsM = Session.get("MaleChecked");
        var empIsF = Session.get("FemaleChecked");
        var empGenderVar = empIsF == true? "Female" : "Male";
        var empHomeTownVar = event.target.empHomeTown.value;
        Meteor.call('insertEmployee',empNameVar,empAgeVar,empGenderVar,empHomeTownVar);
        event.target.empName.value = null;
        event.target.empAge.value = null;
        //event.target.cbMale.removeAttribute('checked');
        //event.target.cbFemale.removeAttribute('checked');
    },

    'change .cbMale':function(event){
        Session.set("MaleChecked", event.target.checked);
        Session.set("FemaleChecked", false);
        console.log('MaleChecked clicked');
    },

    'change .cbFemale':function(event){
        Session.set("FemaleChecked", event.target.checked);
        Session.set("MaleChecked", false);
        console.log('FemaleChecked clicked');
    }
});