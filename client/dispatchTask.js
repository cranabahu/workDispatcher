/**
 * Created by cranabahu on 12/12/14.
 */

Template.dispatchTask.helpers({
    'unAssignedTasks':function(){
        return TaskList.find({assignee : ''});
    }
});

Template.dispatchTask.events({
    'click .collapseTask':function(){
        Session.set('taskObjId',this._id);
    }
});

Template.detailDispatchingTask.helpers({
    'Task':function(){
        var objId = Session.get('taskObjId');
        return TaskList.find({_id:objId},{sort:{dueDate: -1, id: -1}});
    }
});