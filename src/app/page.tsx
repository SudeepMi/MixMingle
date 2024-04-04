import axios from "axios";
import Image from "next/image";
import React from "react";
import Button from "./components/Button";
import Link from "next/link";



const getProps = (async (query:any) => {
  if(query){

  }
  
  // Fetch data from external API
  const alcho = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list");
  const glasses = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list");
  const categories = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?c=list");
  const ingredients = await axios.get("https://thecocktaildb.com/api/json/v1/1/list.php?i=list");
  const random = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  
  // Pass data to the page via props
  const pageProps = {
    alcohol: alcho.data?.drinks || [],
    glass: glasses.data?.drinks || [],
    cats: categories.data?.drinks || [],
    ingredients: ingredients.data?.drinks || [],
    random:random.data?.drinks[0] || {},
    collection:false,
    cols:[]
  }

  if(query){
    if(query["g"]){
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${query["g"]}`)
      pageProps.cols = res.data?.drinks;
      pageProps.collection = true;
    }
    if(query["a"]){
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${query["a"]}`)
      pageProps.cols = res.data?.drinks;
      pageProps.collection = true;
    }
    if(query["c"]){
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${query["c"]}`)
      pageProps.cols = res.data?.drinks;
      pageProps.collection = true;
    }
    if(query["i"]){
      const res = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query["i"]}`)
      if(res.status==200){
        pageProps.cols = res.data?.drinks;
        pageProps.collection = true;
      }
    }

     
    

  }
  return pageProps;
});


export const metadata = {
  title:"MixMingle - Cocktails--&--Mocktails"
}

export default async function Home({searchParams}:any) {
  const props = await getProps(searchParams);
  

  return (
    <main className="p-5 grid grid-cols-4 gap-4 overflow-hidden">
      <div className="h-screen overflow-scroll col-span-1">
        <div className="">
          <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Alcohol Types</h2>
          <ul className="py-2 flex flex-col gap-3">
            {props.alcohol.map((a: any, k: any) => <li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">
              <Link href={`/?a=${a["strAlcoholic"].split(" ").join("_")}`}>
                {a["strAlcoholic"]}
              </Link>
            </li>)}
          </ul>
        </div>
        <div className="">
          <h3 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Glass Types</h3>
          <ul className="py-2 flex flex-col gap-3">
            {props.glass.map((a: any, k: any) => <li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">
              <Link href={`/?g=${a["strGlass"].split(" ").join("_")}`}>
              {a["strGlass"]}
              </Link>
              </li>)}
          </ul>
        </div>
      </div>
      {
        props.collection ? <div className="center flex-wrap flex gap-4 justify-center col-span-2 h-screen overflow-scroll">
            {props.cols?.map((d,k)=>{
              return (
                <div key={k}>
                  <Image src={d["strDrinkThumb"]+"/preview"} width={200} height={200} alt="" />
                  <p>{d["strDrink"]}</p>
                </div>
              )
            })}
        </div> : 
      
      <div className="center flex flex-col justify-between align-center col-span-2 h-screen overflow-scroll">
        
        <div>
          <Image src={`${props.random["strDrinkThumb"]}/preview`} alt="img" width={200} height={200} className="float-end" />
          {Object.keys(props.random).map(key => {
            if (key == "strDrinkThumb" || !props.random[key]) return;
            return (
              <div key={key}>
                <p className="p-2 text-sm">{key.replace("str", "")}: {props.random[key]}</p>
              </div>
            );
          })}
        </div>
        <Button />
      </div> }
      <div className="h-screen overflow-scroll col-span-1">
        <div className="card">
          <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Categories of MIX</h2>
          <ul className="py-2 flex flex-col gap-3">
            {props.cats.map((a: any, k: any) => <li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">
              <Link href={`/?c=${a["strCategory"].split(" ").join("_")}`}>
              {a["strCategory"]}
              </Link>
              </li>)}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-l font-bold bg-[#15F5BA] px-2 py-1">Ingredients</h2>
          <ul className="py-2 flex flex-col gap-3">
            {props.ingredients.map((a: any, k: any) => <li key={k} className="after:content-['__↗'] cursor-pointer hover:bg-slate-50">
               <Link href={`/?c=${a["strIngredient1"].split(" ").join("_")}`}>
              {a["strIngredient1"]}
              </Link>
              </li>)}
          </ul>
        </div>
      </div>
    </main>
  );
}
