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
        var empHomeTownVar = event.target.empAddr.value;
        var empLatVar = Session.get("Lat");
        var empLngVar = Session.get("Lng");
        Session.set("Lat",'');
        Session.set("Lng",'');
        Meteor.call('insertEmployee',empNameVar,empAgeVar,empGenderVar,empHomeTownVar,empLatVar,empLngVar);
        event.target.empName.value = null;
        event.target.empAge.value = null;
        event.target.empAddr.value = null;
        gmap.clearMapDiv();
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