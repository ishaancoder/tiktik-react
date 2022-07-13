import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const BASE_URL = process.env.VERCEL_URL;

export const createOrGetUser = async (response: any,addUser:any) => {
  const { credential } = response;
  
  const decoded:{ name: string, picture: string,sub:string } = jwtDecode(credential)

  const {name,sub,picture} = decoded;

  const user = {
    _id:sub,
    _type:'user',
    userName:name,
    image:picture

  }

  addUser(user);

  const res = await axios.post(`${BASE_URL}/api/auth`,user);
  console.log(res);



};