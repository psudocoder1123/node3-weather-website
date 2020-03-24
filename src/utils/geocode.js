const request=require('request')

const geocode=(addres,callback)=>{
    //+encodeURIComponent(addres)+
    
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(addres)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoidGFuaXNocTExMiIsImEiOiJjazd4bzN1ejYwOTM1M2dreXZ5bms3ZHJ4In0.2TCr_8zrdEljCsoB41osFA'
    request({url:url , json:true} ,(error,response)=>{
        if(error){
            callback('Unable to Connect To locate Services!!',undefined)
        }
        else if(response.body.features.length===0)
        {
            callback('Error in providing Input Unable from mapbox',undefined)
        }
        else{
        const latu=response.body.features[0].center[1];
        const longi=response.body.features[0].center[0];
     
        callback('undefined',{ 
            latitude:latu,
            longitude:longi,
            location:response.body.features[0].place_name
        })        
         }
    })

}
module.exports=geocode