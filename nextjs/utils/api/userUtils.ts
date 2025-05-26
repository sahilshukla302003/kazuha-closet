import userConnection from "../userConnection";


export const userRegister= async(data: any)=>{
    const res=await userConnection.post('api/register/',data)
    return res.data
} ;

export  const userLogin= async(data: any)=>{
    const res=await userConnection.post('api/login/',data) 
    return res.data
 };

export const getUser=async(userId:string)=>{
    const res=await userConnection.get(`api/profile/${userId}/`);
    return res.data;
}


