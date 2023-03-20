const axios = require('axios');
async function getPeople() {
  const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
  return data;
}
function check(id)
{
    if (!id)
    throw "Enter a value";
}
function isString(x)
{
    if(x!='string'){
    throw "Enter a string";
    }
}

function isEmpty(str)
{
    if(str.match(/^ *$/) !== null )
    throw "Empty spaces ";
}

async function getPersonById(id)
{
    check(id);
    isEmpty(id);
    let x=typeof id;
    isString(x);
    const data= await getPeople();
    //let result={};
    for (i in data)
    {
        if(data[i].id==id){
        //console.dir(data[i], { depth: null });
        return data[i];
        }           
    }
    return "Person not found";
}

module.exports = {
    getPeople,
    getPersonById
}