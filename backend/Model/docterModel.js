const {model} = require( "mongoose");
const {DoterSchema}= require( "../Schema/docterShema");

const docterModel = new model("docter",DoterSchema);

module.exports= {docterModel};