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

function isNumber(x)
{
    if(x!='number'){
    throw "Enter a number";
    }
}

function isEmpty(str)
{
    if(str.match(/^ *$/) !== null )
    throw "Empty spaces ";
}

const removeLeadingZero = arr => {
    while (arr.indexOf(0) === 0) {
       arr.shift();
    };
 };

 function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
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

async function sameStreet(streetName, streetSuffix)
{
    check(streetName);
    check(streetSuffix);
    /* isEmpty(streetName);
    isEmpty(streetSuffix); */
    let x=typeof streetName;
    let y=typeof streetSuffix;
    isString(x);
    isString(y);
    isEmpty(streetName);
    isEmpty(streetSuffix);
    
    const data= await getPeople();
    let people={};
    for( i in data)
    {
        if((data[i].address.home.street_name.toUpperCase()==streetName.toUpperCase() && 
            data[i].address.home.street_suffix.toUpperCase()==streetSuffix.toUpperCase()) || 
            (data[i].address.work.street_name.toUpperCase()==streetName.toUpperCase() && 
                data[i].address.work.street_suffix.toUpperCase()==streetSuffix.toUpperCase())){
                    //people[i]=console.dir(data[i], { depth: null });
                    people[i]=data[i];
                }
    }
    let counter=0;
    for (i in people)
    {
        counter++;
    }
    if(counter<2)
    {
        throw "There are not at least two people that live or work at "+streetName+" "+streetSuffix+".";
    }
    else{
    return people;
    }
}

async function manipulateSsn()
{
    const data= await getPeople();
    let str1=[];
    for(let i in data)
    {   
        
        str1[i]=data[i].ssn;
        //console.log(typeof(str1[i]));
        str1[i] = str1[i].replace(/-/g, "");
    } 
    let result=[];
    //let result={};
    /* let x=Math.max(...str1);
        let p=indexOf('x'); */
        for(let i in str1)
        {
            let x=str1[i];
            //console.log(x);
            //console.log(typeof x);
            let y=parseInt(x,10);
            //console.log(y);
            //console.log(typeof y);
            let myFunc=num=>Number(num);
            let intArr=Array.from(String(y),myFunc);
            intArr.sort();
            removeLeadingZero(intArr);
            let num = +intArr.join("")
            result[i]=num;
        }

        let maxssn=Math.max(...result);
        let leastssn=Math.min(...result);
        let indexofmaxssn=result.indexOf(maxssn);
        let indexofleastssn=result.indexOf(leastssn);
        const avg = Math.floor(getAvg(result));
        const final={
            highest:{firstname:data[indexofmaxssn].first_name,
                     lastname:data[indexofmaxssn].last_name},
            lowest:{firstname:data[indexofleastssn].first_name,
                    lastnem:data[indexofleastssn].last_name},
            average:avg
        };
        return final;
}

async function sameBirthday(month, day)
{  
    check(month);
    check(day);
    //isNumber(typeof month);
    //isNumber(typeof day);
    
    if((typeof month||typeof day)=='string' )
    {
        month=parseInt(month,10);
        day=parseInt(day,10);
    }
    if(month>0&&month<13)
    {
        //console.log("In 1st if");
        if(((month==1||month==3||month==5||month==7||month==8||month==10||month==12)&&(day>=1 && day<=31))
        ||((month==4||month==6||month==9||month==11)&&(day>=1 && day<=30))
        ||((month==2)&&(day>=1 && day<29)))
        {

            //console.log("In if");
            const data= await getPeople(); 
            let bornmd=[];
            for (i in data)
            {
                bornmd[i]=data[i].date_of_birth;
                bornmd[i] = bornmd[i].replace(/\//g, "");
                bornmd[i]=bornmd[i].substring(0,4);
                bornmd[i]=parseInt(bornmd[i],10);

            }
            //console.log(bornmd);
            let x= month.toString();
            let y=day.toString(); 
            //isEmpty(x);
            //isEmpty(y);
            let mmdd=x+y;
            mmdd=parseInt(mmdd,10);
            //console.log(mmdd);
            let final=[];
            let k=0;
            for(let j=0;j<bornmd.length;j++)
            {
                if(bornmd[j]===mmdd)
                {
                    final[k]=data[j].first_name+' '+data[j].last_name;
                    k++;
                }
            } 
            //console.log("In function");
            if(final.length>=1)
            return final;
            else
            throw "No record found";
        }
        else
        {
        //console.log("In if");
        throw "You have put a date 29 in feb which is not possible or 31 date in a month which has 30 days";
        }
    }
     else
    {
    //console.log("In if");
    throw "Month cannot be greater than 12";
    }
}



module.exports = {
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday
}