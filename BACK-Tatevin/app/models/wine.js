/*
 * Wine MODEL
 */

var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
let Schema = mongoose.Schema;

//Describe the schema (model)
var WineSchema = mongoose.Schema({
    id: {type: String, unique:true},
    date: {type: Date, default: Date.now},
    barcode:{type:String},
    name: String,
    terroir: String,
    domain: String,
    type: String,
    classification: String,
    gaz: Boolean,
    grape: [{type: String}],
    keep_in_cave: Boolean,
    tasting_date: String,
    decantation: Number, //Carrafage
    millesime: Number, //Millesime
    producer: { id_Prod: {type:Schema.Types.ObjectId, ref: "Producer"}, comment:String } ,
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
});

var Wine = mongoose.model("Wine", WineSchema);


module.exports = Wine;
