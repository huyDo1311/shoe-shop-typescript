import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DispatchType } from '../configStore';
import axios from 'axios';
import { http } from '../../util/config';

export interface ProductModel {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
}

export interface ProductDetailModel {
  id: number;
  name: string;
  alias: string;
  price: number;
  feature: boolean;
  description: string;
  size: string[];
  shortDescription: string;
  quantity: number;
  image: string;
  // categories: Category[];
  // relatedProducts: RelatedProduct[];
}

export type ProductState = {
  arrProduct: ProductModel[],
  productDetail: ProductDetailModel | null,
}

const initialState: ProductState = {
  arrProduct: [
    {
      "id": 1,
      "name": "vans black",
      "alias": "vans-black-black",
      "price": 200,
      "description": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ",
      "size": "[32,33,34,35]",
      "shortDescription": "about this shoe:Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "quantity": 100,
      "deleted": false,
      "categories": "[{\"id\": \"VANS_CONVERSE\",\"category\":\"VANS_CONVERSE\"}]",
      "relatedProducts": "[2,3,1]",
      "feature": true,
      "image": "https://shop.cyberlearn.vn/images/vans-black-black.png"
    },
  ],
  productDetail: null
}

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
      state.arrProduct = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getProductDetailApi.pending, (state, action) => {
      //bat loading
    });
    builder.addCase(getProductDetailApi.fulfilled, (state: ProductState, action: PayloadAction<ProductDetailModel>) => {
      state.productDetail = action.payload;
    });
    builder.addCase(getProductDetailApi.rejected, (state, action) => {

    })
  }
});

export const { setArrProductAction } = productReducer.actions

export default productReducer.reducer

/* ------------------------- action async ------------------------- */
export const getProductApi = () => {

  return async (dispatch: DispatchType) => {
    try {
      const result = await http.get(`https://shop.cyberlearn.vn/api/Product`);

      const content:ProductModel[] = result.data.content;

      const action:PayloadAction<ProductModel[]> = setArrProductAction(content);
      dispatch(action);

    } catch (error) {
      console.log("🚀 ~ return ~ error:", error)

    }
  }
}


// create createAsyncThunk

export const getProductDetailApi = createAsyncThunk('productReducer/getProductDetailApi',
  async (id: string) => {
    const response = await http.get(`/api/product/getbyid?id=${id}`)
    return response.data.content
  }
)
