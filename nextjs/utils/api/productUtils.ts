import userConnection from "../userConnection";

export const getProductDetails=async(productId:string)=>{
    const res=await userConnection.get(`api/productdetail/${productId}/`);
    return res.data;
}

export const addProducttoCart = async (data: object) => {
  const res = await userConnection.post(`/api/cart/add/`, data);
  return res.data;
};

export const getUserCart = async () => {
  const res = await userConnection.get(`/api/cart/`);
  return res.data;
};