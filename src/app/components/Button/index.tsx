"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Button() {
    const [loading,  setLoading] = React.useState(false);
    const router = useRouter();
    
    return <button className={`shuffle_btn m-auto cursor-pointer`} onClick={() =>{
        setLoading(true);
        location.reload();
    }} disabled={loading}>Shuffle Random Cocktail</button>
}