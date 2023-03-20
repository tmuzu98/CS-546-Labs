const axios = require('axios');

async function getStocks() {
  const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
  return data;
}

async function getPeople() {
    const  {data}  = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data;
  }

  function check(id)
{
    if (!id)
    throw "Invalid function call";
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
async function listShareholders()//Parameter if thrown should throw an error.
{
    if(arguments.length>0)
    {
        throw "No parameter is required here.";
    }
    const data= await getPeople();
    const stocks= await getStocks();
    const Allid=[];
    for( i in data)
    {
        Allid[i]=data[i].id;
    }
    for( i in stocks)
    {
        for(j in stocks[i].shareholders)
        {
            for(k in Allid)
            {
                if(stocks[i].shareholders[j].userId==Allid[k])
                {
                    stocks[i].shareholders[j].first_name=data[k].first_name;
                    stocks[i].shareholders[j].last_name=data[k].last_name;
                }
            }
        
        }
    } 
     for( i in stocks)
    {
        for(j in stocks[i].shareholders)
        {
            
            delete stocks[i].shareholders[j].userId;
        }   
    } 

    return stocks;
    
}

async function topShareholder(stockName)
{
    check(stockName);
    let x=typeof stockName;
    isString(x);
    isEmpty(stockName);
    const data= await getPeople();
    const stocks= await getStocks();
    let noofStocks=[];
    let user=[];
    let count=0;
    for(i in stocks)
    {
        if(stocks[i].stock_name===stockName)
        {
            count++;
            for( j in stocks[i].shareholders)
            {
                noofStocks[j]=stocks[i].shareholders[j].number_of_shares;
                user[j]=stocks[i].shareholders[j].userId;  
            }
            
        }
    }
    if(count==0)
    {
        throw "No stock with that name"
    }
    if (noofStocks.length === 0) { 
        let show=stockName+" currently has no shareholders.";
        return show;
    }
    let maxshares=Math.max(...noofStocks);
    let maxstocksind=noofStocks.indexOf(maxshares);
    let resultUser=user[maxstocksind];
    let finalanswer=" ";
    for (i in data)
    {
        if(data[i].id===resultUser)
        {
            finalanswer=data[i].first_name+" "+data[i].last_name;
        }
    }
    let answer="With"+" "+maxshares+" "+"shares in "+stockName+", "+finalanswer+" is the top share holder. ";

    return answer;

}

async function listStocks(firstName, lastName)
{
    check(firstName);
    check(lastName);
    let x=typeof firstName;
    let y=typeof lastName;
    isString(x);
    isString(y);
    isEmpty(firstName);
    isEmpty(lastName);
    const data= await getPeople();
    const stocks= await getStocks();
    let peopleid;
    let counter=0;
    for ( i in data)
    {
        if(data[i].first_name==firstName && data[i].last_name==lastName)
        {
            peopleid=data[i].id;
            counter++;
        }
    }
    if(counter==0)
    {
        throw " No record Found";
    }
    let result=[];
    let k=0;
    let counter2=0;
    for (i in stocks)
    {
        for( j in stocks[i].shareholders)
        {
            if(stocks[i].shareholders[j].userId===peopleid)
            {
                let myobj={};
                myobj.stock_name=stocks[i].stock_name;
                myobj.number_of_shares=stocks[i].shareholders[j].number_of_shares; 
                result.push(myobj);
                counter2++;
            }
        }
    }
    if(counter2==0)
    {
        throw "Peson does not own any shares in any company";
    }
    return result;   
}

async function getStockById(id)
{
    check(id);
    let x=typeof id;
    isString(x);
    isEmpty(id);
    const stocks= await getStocks();
    for (i in stocks)
    {
        if (stocks[i].id===id)
        {
            return stocks[i];
        }
    }
    return "Stock not found.";
}


module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById
}