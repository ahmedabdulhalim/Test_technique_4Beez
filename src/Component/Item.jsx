import React,{useState,useEffect} from "react";


const Item  = ({match}) => {
    const id = match.params.id;
    return(

        <div className="container">
        <div className="banner"></div>
        <div className="Img"></div>
    </div>
        )
}




export default Item;