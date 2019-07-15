
const wap = require('webapi-parser').WebApiParser

async function main () {
    const docPath = `file://test.raml`
    const model = await wap.raml10.parse(docPath)
 
    var ref = model.references();
    //prints references and their references
    function test(ref){
        for( var i = 0; i < ref.length; i++ ){
            if(ref[i].encodes){
                console.log(ref[i].encodes.toJsonSchema);

            }
            if(typeof ref[i].references === "function"){
                test(ref[i].references());
            }
        }
    }
    test(ref);

    const resolveModel = await wap.raml10.parse(docPath)
    const resApiModel = await wap.raml10.resolve(resolveModel)
    console.log( "After resolving: \n",
        resApiModel.encodes.endPoints[0].operations[0].responses[0].payloads[0].schema.toJsonSchema)


}
main();
