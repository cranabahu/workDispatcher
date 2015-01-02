/**
 * Created by cranabahu on 1/2/15.
 */

Meteor.publish('NotificationList',function(){
    return NotificationList.find();
});

Meteor.methods({
   'notify': function (descVar,typeVar) {
       var enteredTimeVar = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
       console.log(enteredTimeVar);
       var notifyIdVar   = 1;
       if (NotificationList.find().count() >  0) {
           var maxTaskCursor = NotificationList.findOne({}, {sort: {notifyId: -1}});
           notifyIdVar = maxTaskCursor.notifyId + 1;
       }

       NotificationList.insert({
           notifyId:notifyIdVar,
           desc:descVar,
           type:typeVar,
           enteredTime:enteredTimeVar
       })
   }
});