define([
    'mongoose',
    'server/model/Author'
],function(
    mongoose,
    Author
){
    var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

    var Post = new Schema({
	author     : {
	    type   : ObjectId,
	    ref    : Author
	},
	title      : String,
	body       : String,
	created    : {
	    type   : Date,
	    default: Date.now
	}
    });

    return mongoose.model('Post', Post);;
});
