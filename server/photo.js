/**
 * Created by cranabahu on 1/3/15.
 */
Meteor.publish('PictureList', function () {
    return PictureList.find();
});
