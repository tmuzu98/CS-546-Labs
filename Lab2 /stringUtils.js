function strExists(str) {
    if (str === undefined) throw "Please enter a string input";
    else if (typeof str !== "string") throw "Input is not a String";
}

function isUpper(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
function isLower(str) {
    return /[a-z]/.test(str) && !/[A-Z]/.test(str);
 
}
function isSpecial(str){
    return /[!@#$%^&*()_+\-={};':"|,.<>?]/.test(str) ;
}
function hasWhiteSpace(str) {
    return /\s/g.test(str);
}

function hasNumber(str) {
    return /\d/.test(str);
}

function stringLength(str)
{
    if (str.length<=0) throw "Enter a string";
}

function checkIndex(str,idx)
{
    let x=str.length;
    for(let i=0;i<x;i++)
    {
        if(i==idx)
        {

        }
        else{
            throw " Wrong index";
        }
    }
}

function sortString(string)
{
    strExists(string);
    stringLength(string);
   let x=string.length;
   let j=0;
   let k=0;
   let l=0;
   let m=0;
   let numArr=[];
   let upper=[];
   let lower=[];
   let special=[];
   let spaces=[]
   for (let i=0;i<x;i++)
   {
    if(hasNumber(string[i])==true)
    {
        numArr[i]=string[i];
    }  
    
    if(isUpper(string[i])==true)
    {
        upper[j]=string[i];
        j++;
    }
    if(isLower(string[i])==true)
    {
        lower[k]=string[i];
        k++;
    }
    if(isSpecial(string[i])==true)
    {
        special[l]=string[i];
        l++;
    }
    if(hasWhiteSpace(string[i])==true)
    {
        spaces[m]=string[i];
        m++;
    }
   }
    lower=lower.sort();
    upper=upper.sort();
    numArr=numArr.sort();
    special=special.sort();
    let array3 = upper.concat(lower).concat(special).concat(numArr).concat(spaces);
   array3=array3.join("");
    return array3;
}


function replaceChar(str,idx)
{   
    strExists(str);
    stringLength(str);
    checkIndex(str,idx);
    let x=str[idx+1];
    let y=str[idx-1];
    let value=str[idx];
    let arr=[];
    let j=0;
    for( let i=0;i<str.length;i++)
    {
        if(i==idx)
        {
            break;
        }
        else
        {
            if(str[i]==value)
            {
                arr[j]=i;
                j++;
            }
        }
    }
    b=arr.length;
    for(let i=0;i<b;i++)
    {
        if(i%2==0)
        {
            str[arr[i]]=y;
        }
        else
        {
            str[arr[i]]=x;
        }
        
    }
    return str;
}

function mashUp(string1 , string2 , char)
{
    strExists(string1);
    strExists(string2);
    stringLength(string1);
    stringLength(string2);
    let x=string1.length;
    let y=string2.length;
    let str3;
    let str4;
    let z=0;
    if(x>y)
    {
        z=x-y;
        str3=string2;
        str4=string1;
    }
    else
    {
        z=y-x;
        str3=string1;
        str4=string2;
    }
    let arr;
    for( let i=0;i<z;i++)
    {
        arr[i]=char;
    }
    str3=str3+arr;
    let arr2;
    for ( let i=0;i<str3.length;i++)
    {
        arr2[i]=str4[i]+str3[i];
    }
    let output=arr2.toString();
    return output;
}

module.exports={
    sortString,
    replaceChar,
    mashUp
  };