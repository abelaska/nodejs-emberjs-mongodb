define([
    'mongoose'
],function(
    mongoose
){
	"use strict";
	
    var Schema = mongoose.Schema;

    var Author = new Schema({
        name     : String
    });

    return mongoose.model('Author', Author);
});
