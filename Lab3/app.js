const people = require("./people");
const stocks= require("./stocks");
async function main() {
     try {
    let personId = await people.getPersonById("7989fa5e-8f3f-458d-ad58-23c8d9ef5a10");
    console.log(personId);
  } catch (e) {
    console.log(e);
  }    


    try{
      let sameStreet = await people.sameStreet("Sutherland", "Point");
      console.log(sameStreet);
  }catch (e)
  {
      console.log(e);
  }  

  

   try{
   let manipulateSsn = await people.manipulateSsn();
  console.log(manipulateSsn); 
  }
  catch (e)
  {
    console.log(e);
  }  

   try
  {
    let sameBirthday = await people.sameBirthday(09,25);
   console.log(sameBirthday); 
  }
  catch (e)
  {
     console.log(e);
  }  
   try
  {
    let liststocks = await stocks.listShareholders();
   console.log(liststocks); 
  }
  catch (e)
  {
     console.log(e);
  }   
 
  try
  {
    let topShareholder = await stocks.topShareholder('Aeglea BioTherapeutics, Inc.');
   console.log(topShareholder); 
  }
  catch (e)
  {
     console.log(e);
  } 

    try{
    let listsStocsk = await stocks.listStocks("Grenville", "Pawelke");
    console.log(listsStocsk);
}catch (e)
{
    console.log(e);
} 

  try{
    let getStock = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0");
    console.log(getStock);
}catch (e)
{
    console.log(e);
} 
}

main();