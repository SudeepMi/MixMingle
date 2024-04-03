import axios from "axios";
import Image from "next/image";
import React from "react";


export const getProps = (async () => {
  // Fetch data from external API
  const alcho = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
  const glasses = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
  const categories = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?c=list");
  const ingredients = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?i=list");



  // Pass data to the page via props
  const pageProps = {
    alcohol: alcho.data?.drinks || [],
    glass:  glasses.data?.drinks || [],
    cats: categories.data?.drinks || [],
    ingredients: ingredients.data?.drinks || [],
  }
  return pageProps;
});


export default async function Home() {
  const props = await getProps();

  return (
    <main className="">
      <div className="grid grid-cols-3">
    
            <div className="left">
                <h2>Alcohol Types</h2>
                <ul>
                  {props.alcohol.map((a:any,k:any)=><li key={k}>{a["strAlcoholic"]}</li>)}
                </ul>
                <h3>Glass Types</h3>
                <ul>
                  {props.glass.map((a:any,k:any)=><li key={k}>{a["strGlass"]}</li>)}
                </ul>
            </div>
            <div className="center">

            </div>
            <div className="right">
                <h2>Categories of MIX</h2>
                <ul>
                  {props.cats.map((a:any,k:any)=><li key={k}>{a["strCategory"]}</li>)}
                </ul>
                <h2>Ingredients</h2>
                <ul>
                  {props.ingredients.map((a:any,k:any)=><li key={k}>{a["strIngredient1"]}</li>)}
                </ul>
            </div>
          </div>
 
    </main>
  );
}
