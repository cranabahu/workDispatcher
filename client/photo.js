/**
 * Created by cranabahu on 1/3/15.
 */
Meteor.subscribe('PictureList');

Template.photo.helpers({
    'photos':function(){
        var taskIdVar = Session.get('viewTaskId');
        return PictureList.find({taskId:taskIdVar},{sort: {picId: -1}});
    }
});