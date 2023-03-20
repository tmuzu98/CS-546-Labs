const restaurants = require("./data/restaurants");
const connection = require("./config/mongoConnection");

const main = async () => {

    const newrestaurant = await restaurants.create("The Saffron Lounge", "New York City, New York", "123-456-7890", "https://www.saffronlounge.com", "$", ["Cuban","Indian"], 3, {dineIn: true, takeOut: true, delivery: false});
    console.log('Restaurant has been added');
    console.log(newrestaurant);
    
  const newrestaurant1 = await restaurants.create("Pizza Lounge","New York City, New York", "999-999-9999", "http://www.pizzalounge.com", "$", ["Italian" ], 3, {dineIn: true, takeOut: true, delivery: false});
    console.log(' Second Restaurant has been added'); 

    const allrestaurants= await restaurants.getAll();
    console.log(allrestaurants);

    const newrestaurant2 = await restaurants.create("Black Bear","Hoboken, New Jersey", "456-789-0123", "http://www.blackbear.com", "$$", ["Cuban", "American" ], 4, {dineIn: true, takeOut: true, delivery: true});
    console.log('Third Restaurant has been added');
    console.log(newrestaurant2);

    const updatedRestaurantName = await restaurants.rename(newrestaurant._id, "https://www.newsaffronlounge.com");
    console.log("Updated website for first restaurant is ");
    console.log(updatedRestaurantName);

    let removed=await restaurants.remove(newrestaurant1._id);
    console.log(removed);

    console.log("All the remainign restaurants.")
    const allupdatedrestaurants= await restaurants.getAll();
    console.log(allupdatedrestaurants); 
    
      
    try{
    const newrestaurant3 = await restaurants.create(123,"New York City, New York", "123-456-78900", "https://www.saffronlounge.com", "$", ["Cuban","Italian"], 3, {dineIn: true, takeOut: true, delivery: false});
    console.log(newrestaurant3);
  }catch (e)
  {
    console.log('Error thrown with bad input parameters');
      console.log(e);
  }  
   try{
    let removedrestaurant=await restaurants.remove("873");
    console.log(removedrestaurant);

}catch (e)
{
    console.log(e);
}  
try{
  const restaurantidnotexist = await restaurants.rename(123, "https://www.newsaffronlounge.com");
  console.log("Updated website for first restaurant is ");
  console.log(restaurantidnotexist);

}catch (e)
{
  console.log("Cannot rename restaurant because of the bad parameter")
  console.log(e);
} 

try{
  const restaurantidbadparamter = await restaurants.rename("1234", "https://www.newsaffronlounge.com");
  console.log("Updated website for first restaurant is ");
  console.log(restaurantidbadparamter);

}catch (e)
{
  console.log("Cannot rename restaurant because it does not exists")
  console.log(e);
}  

try{
  const getrestaurantnotexist = await restaurants.get("234");
  console.log("Updated website for first restaurant is ");
  console.log(updatedRestaurantName);

}catch (e)
{
  console.log("Cannot get restaurant because it does not exists")
  console.log(e);
}  


const allrestaurants2= await restaurants.getAll();
console.log(allrestaurants2); 
  
const db = await connection();
await db.serverConfig.close();
console.log('Done!');

};
  
main().catch((error) => {
console.log(error);
  }); 