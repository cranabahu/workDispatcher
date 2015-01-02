/**
 * Created by cranabahu on 11/26/14.
 */

Meteor.publish('theEmployees',function(){
    return EmployeeList.find();
});

Meteor.methods({
    'insertEmployee':function(empFullNameVar,empNameVar, empAgeVar, empGenderVar, empHomeTownVar,empContactVar,empLatVar,empLngVar){
        var userIdvar = Meteor.userId();
        var enteredDateVar = new Date();
        var empNoVar = 4100;
        if (EmployeeList.find().count() !==  0) {
            var maxEmpCursor = EmployeeList.findOne({}, {sort: {empNo: -1}});
            empNoVar = maxEmpCursor.empNo + 1;
        }

        EmployeeList.insert({
            fullName:empFullNameVar,
            empNo: empNoVar,
            name: empNameVar,
            age: empAgeVar,
            contact: empContactVar,
            gender: empGenderVar,
            location: empHomeTownVar,
            lat: empLatVar,
            lng: empLngVar,
            entryDate: enteredDateVar,
            createdBy: userIdvar
        });

        return 'EmpNo '+ empNoVar +' created';
    },

    'updateEmp':function(empNoVar,empFullNameVar, empAgeVar, empGenderVar, empHomeTownVar,empContactVar,empLatVar,empLngVar){

        EmployeeList.update({empNo:empNoVar},
            {$set: {
                fullName: empFullNameVar,
                age: empAgeVar,
                contact: empContactVar,
                gender: empGenderVar,
                location: empHomeTownVar,
                lat: empLatVar,
                lng: empLngVar
            }
        });
    },

    'deleteEmp': function (empNoVar) {
        EmployeeList.remove({empNo:empNoVar});
    }
});