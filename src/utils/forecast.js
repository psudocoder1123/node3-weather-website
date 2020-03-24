const request=require('request')

const forecast=(latitude1,longitude1,callback)=>
{
    const url='https://api.darksky.net/forecast/c0540c7a0e8dd1ec9e25e5abc2532eb6/'+ latitude1+','+ longitude1+ '?units=si';
    //request({url:url,json:true},(error,response)=>{
        request({url:url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect To locate Services!!',undefined)
        }
        else if(body.error)
        {
            callback('Error in providing Input Unable from mapbox',undefined)
        }
        else
        {
            callback('undefined',{
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability

            })
        }
    })
}
module.exports=forecast