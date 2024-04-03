import axios from "axios";
import Image from "next/image";
import React from "react";


const getProps = (async () => {
  // Fetch data from external API
  const alcho = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
  const glasses = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
  const categories = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?c=list");
  const ingredients = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?i=list");
  const random = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");

  // Pass data to the page via props
  const pageProps = {
    alcohol: alcho.data?.drinks || [],
    glass:  glasses.data?.drinks || [],
    cats: categories.data?.drinks || [],
    ingredients: ingredients.data?.drinks || [],
    random: random.data?.drinks[0] || []
  }
  return pageProps;
});


export default async function Home() {
  const props = await getProps();

  return (
    <main className="p-5 grid grid-cols-4 gap-4 overflow-hidden">
            <div className="h-screen overflow-scroll col-span-1">
                <div className="">
                <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Alcohol Types</h2>
                <ul className="py-2 flex flex-col gap-3">
                  {props.alcohol.map((a:any,k:any)=><li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">{a["strAlcoholic"]}</li>)}
                </ul>
                </div>
                <div className="">
                <h3 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Glass Types</h3>
                <ul className="py-2 flex flex-col gap-3">
                  {props.glass.map((a:any,k:any)=><li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">{a["strGlass"]}</li>)}
                </ul>
                </div>
            </div>
            <div className="center col-span-2 h-screen overflow-scroll">
              <Image src={`${props.random["strDrinkThumb"]}/preview`} alt="img" width={200} height={200} className="float-end" />
            {Object.keys(props.random).map(key => {
              if(key=="strDrinkThumb" || !props.random[key]) return;
                return (
                <div key={key}>
                  <p className="p-2 text-sm">{key.replace("str","")}: {props.random[key]}</p>
                </div>
                );
              
          
})}

            </div>
            <div className="h-screen overflow-scroll col-span-1">
              <div className="card">
                <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Categories of MIX</h2>
                <ul className="py-2 flex flex-col gap-3">
                  {props.cats.map((a:any,k:any)=><li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">{a["strCategory"]}</li>)}
                </ul>
              </div>
              <div className="card">
                <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Ingredients</h2>
                <ul className="py-2 flex flex-col gap-3">
                  {props.ingredients.map((a:any,k:any)=><li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">{a["strIngredient1"]}</li>)}
                </ul>
              </div>
            </div>
    </main>
  );
}
