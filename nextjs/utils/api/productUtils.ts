import userConnection from "../userConnection";

export const getProductDetails=async(productId:string)=>{
    const res=await userConnection.get(`api/productdetail/${productId}/`);
    return res.data;
}