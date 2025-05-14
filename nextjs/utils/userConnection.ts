import axios  from "axios";


const userConnection=axios.create({
    baseURL: process.env.NEXT_USER_API_URL || 'http://localhost:8000'
});

export default userConnection;