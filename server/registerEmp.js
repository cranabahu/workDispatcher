/**
 * Created by cranabahu on 11/26/14.
 */

Meteor.publish('theEmployees',function(){
    return EmployeeList.find();
});

Meteor.methods({
    'insertEmployee':function(empNameVar, empAgeVar, empGenderVar, empHomeTownVar,empLatVar,empLngVar){
        var userIdvar = Meteor.userId();
        var enteredDateVar = new Date();
        var empNoVar = 4100;
        if (EmployeeList.find().count() !==  0) {
            var maxEmpCursor = EmployeeList.findOne({}, {sort: {empNo: -1}});
            empNoVar = maxEmpCursor.empNo + 1;
        }

        EmployeeList.insert({
            empNo: empNoVar,
            name: empNameVar,
            age: empAgeVar,
            gender: empGenderVar,
            location: empHomeTownVar,
            lat: empLatVar,
            lng: empLngVar,
            entryDate: enteredDateVar,
            createdBy: userIdvar
        });
    }
});