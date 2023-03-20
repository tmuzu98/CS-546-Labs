const axios = require('axios');

async function getStocks() {
  const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
  return data;
}
function check(id)
{
    if(!id)
    throw "Enter Id";
}

function isString(x)
{
    if(x!='string'){
    throw "Enter a string";
    }
}

function isEmpty(str)
{
    if(str===" "||str.match(/^ *$/) !== null)
    throw "Parameter is Empty. ";
}
async function getStockById(id)
{
    check(id);
    let x=typeof id;
    isString(x);
    isEmpty(id);
    //console.log("Here 11");
    const stocks= await getStocks();
    for (i in stocks)
    {
        if (stocks[i].id===id)
        {
            return stocks[i];
        }
    }
    throw "Stock not found.";
}

module.exports = {
    getStocks,
    getStockById
    
}
