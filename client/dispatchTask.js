/**
 * Created by cranabahu on 12/12/14.
 */

Template.dispatchTask.helpers({
    'unAssignedTasks':function(){
        return TaskList.find({status : 'New'},{sort:{ dueDate: 1, id: 1}});
    }
});

Template.dispatchTask.events({
    'click .collapseTask':function(){
        Session.set('taskObjId',this._id);
        Session.set('distanceArray','');
    }
});