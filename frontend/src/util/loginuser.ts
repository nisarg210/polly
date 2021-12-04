import axios from 'axios';

interface LoginUserDetails {
  user: any;
  password: any;
}
export async function loginuser(params: LoginUserDetails) {

  console.log(process.env);

  const { data } = await axios.post(
    process.env.REACT_APP_API_BASE_URL + 'login-user',
    params,
  )


  return true;

}