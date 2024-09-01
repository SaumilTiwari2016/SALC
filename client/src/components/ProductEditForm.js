import React, { Fragment, useState, useEffect } from 'react'
import Alert from './Alert'
import axios from 'axios'
import { AiOutlineEdit } from 'react-icons/ai'

const defaultProduct = {
  name: '',
  price: '',
  articleNo:'',
  description: '',
  imagePath: '',
}

const ProductEditForm = ({details}) => {
console.log(details.selectData, ">>>>>>>>>>>"); 
  const [product, setProduct] = useState({
    id:'',
    name: '',
    price: '',
    articleNo:'',
    description: '',
    imagePath: '',
})

 useEffect(() => {
    if (details && details.selectData) {
      const { id, name, price, articleNo, description, imagePath } = details.selectData;
      
      console.log(details.selectData, ">>>>>>>>>>>");

      setProduct({
        id: id || '',
        name: name || '',
        price: price || '',
        articleNo: articleNo || '',
        description: description || '',
        imagePath: imagePath || ''
      });
    }
  }, [details]);
 


  return (
    <Fragment>
        <label htmlFor="my-modal-1" className="btn btn-outline btn-sm mb-6">
        <AiOutlineEdit/>
      </label>
         
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal" id="my-modal-1">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Edit Product</h3>
          <Alert alert={alert} />
          <form
            id="Product-Edit-Form"
            className="flex flex-col"
            // onSubmit={handleSave}
          >
            <input
              className="input input-bordered mb-2"
              placeholder="Name"
              value={product.name}
              readOnly
            //   onChange={handleProductChange('name')}
              required
            />
            <input
              className="input input-bordered mb-2"
              placeholder="Article No"
              value={product.articleNo}
              readOnly
            //   onChange={handleProductChange('articleNo')}
              required
            />
            <input
              type={'number'}
              className="input input-bordered mb-2"
              placeholder="Price"
              value={product.price}
              readOnly
            //   onChange={handleProductChange('price')}
              required
            />
            <input
              className="input input-bordered mb-2"
              placeholder="Image Url"
              value={product.imagePath}
              readOnly
            //   onChange={handleProductChange('imagePath')}
              required
            />
            <textarea
              className="textarea textarea-bordered"
              placeholder="Description"
              value={product.description}
              readOnly
            //   onChange={handleProductChange('description')}
              required
            />
          </form>
          <div className="modal-action">
            <label
              htmlFor="my-modal-1"
              className="btn btn-ghost"
            //  onClick={onCancel}
            >
              Cancel
            </label>
            <button
              className="btn btn-primary"
              form="Product-Edit-Form"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default ProductEditForm
