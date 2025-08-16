import React, { useEffect } from 'react'
import axios from "axios";
import productService from '../services/products'
import { useParams } from 'react-router-dom'

function Update() {
    const {id} = useParams();
    useEffect(() => {
        const res = productService.get(id)
        
        console.log(res,">>>>>>>>>>>data");
    }, [])
  return (
    <div>
      Update
    </div>
  )
}

export default Update
