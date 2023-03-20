function isArr(arrays) 
{
    if (Array.isArray(arrays) !== true) {
      throw "Input should be an array";
    }
  }
function isEmpty(arrays) 
{
    if (arrays.length == 0 || typeof arrays === undefined || arrays.isInt) {
      throw "Array cannot be empty";
    }
  }

function isArray(arrays)
{
    if(!arrays){
      throw "No input found";
    }
}

function isUpper(str) {
    return !/[a-z]/.test(str) && /[A-Z]/.test(str);
}
function isLower(str) {
    return /[a-z]/.test(str) && !/[A-Z]/.test(str);
       }

function average(arrays)
{
  for(let i=0;i<arrays.length;i++)
  {
    isArr(arrays[i]);
    isEmpty(arrays[i]);
    isArray(arrays[i]);
  }
    let avg=0;
    let x=0;
    for(let i=0;i<arrays.length;i++)
    {
        for( let j=0;j<arrays[i].length;j++)
        {
          avg=avg+arrays[i][j] ;
          x++;
        }
    }
    avg=avg/x;
    avg=Math.round(avg);
    return avg;
}

function modeSquared(array) 
{
    isArr(array);
    isEmpty(array);
    isArray(array);
    let frequency = {}; 
    let maxFreq = 0; 
    let modes = [];
  
    for (let i in array) 
    {
      frequency[array[i]] = (frequency[array[i]] || 0) + 1; //(frequency[array][i]==undefined)?1:frequency[array[i]+1])
  
      if (frequency[array[i]] > maxFreq) 
      { 
        maxFreq = frequency[array[i]]; 
      }
    }
  
    for (let k in frequency) {
      if (frequency[k] == maxFreq) {
        modes.push(k);
      }
    }
    for( let i in modes)
    {
        modes[i]=modes[i]*modes[i];
    }
    return modes;
}

  function medianElement(arr)
{
    isArr(arr);
    isEmpty(arr); 
    isArray(arr);
    let arr2=arr.sort();
    let base=0;
    let median=0;
    let x=arr2.length;
    if(x%2==0)
    {
        base=x/2;
        let base2=base+1;
        median=((arr2[base-1]+arr2[base2-1])/2);
    }
    else
    {
        base=Math.floor((x/2));
        median=arr2[base-1];
    }
    return median;
}

function merge(arrayOne,arrayTwo)
{
  isArray(arrayOne);
  isArray(arrayTwo);
  isEmpty(arrayOne);
  isEmpty(arrayTwo);
  isArr(arrayOne);
  isArr(arrayTwo);
  let x=arrayOne.length;
  let y=arrayTwo.length;
  let numArr=[];
  let upper=[];
  let lower=[];
  let j=0;
  let k=0;
    for(let i=0;i<x;i++)
    {
        if(Number.isInteger(arrayOne[i]))
        {
            numArr[i]=arrayOne[i];
        }  
        
        if(isUpper(arrayOne[i])==true)
        {
            upper[j]=arrayOne[i];
            j++;
        }
        if(isLower(arrayOne[i])==true)
        {
            lower[k]=arrayOne[i];
            k++;
        }
        
    }
    let n=numArr.length;
    let l=upper.length;
    let m=lower.length;
    for(i=0;i<y;i++)
    {  
        if(Number.isInteger(arrayTwo[i]))
        {
            numArr[n]=arrayTwo[i];
            n++;
        }
        if(isUpper(arrayTwo[i])==true)
        {
            upper[l]=arrayTwo[i];
            l++;
        }
        if(isLower(arrayTwo[i])==true)
        {
            lower[m]=arrayTwo[i];
            m++;
        }
        
        
    }
    lower=lower.sort();
    upper=upper.sort();
    numArr=numArr.sort();
    const result1 = [...lower, ...upper, ...numArr];
    return result1;;
}

module.exports={
  average,
  modeSquared,
  medianElement,
  merge
};
