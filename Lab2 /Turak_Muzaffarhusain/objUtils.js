

function computeObjects([objects])
{


}








function commonKeys(obj1,obj2)
{
    let key=Object.keys(obj1);
    let key2=Object.keys(obj2);
    let value=Object.values(obj1);
    let value2=Object.values(obj2);
    let x=key.length;
    let y=key2.length;
    let z=Math.max(x,y);
    let result={};
    for(let i=0;i<z;i++)
    {
        if(key[i]==key2[i]&&value[i]==value2[i])
        {
            result[key[i]]=value[i];
        }
    }
    return result;
}

function flipObject(object)
{
    let result={};
    for (let key in object)
    {
        if(typeof (object[key])=='object')
        {
            
            result[key]=flipObject(object[key]);
        }
        else{
        result[object[key]]=key;
        }
    }
    return result;

}

module.exports={
    computeObjects,
    commonKeys,
    flipObject
  };