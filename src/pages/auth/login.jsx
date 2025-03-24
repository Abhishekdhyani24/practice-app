import {React,useEffect,useState} from 'react';
import methodModel from "../../methods/methods";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api";
import "./style.scss";



const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const inValidEmail = methodModel.emailvalidation(email);
    // const inValidPassword = methodModel.passwordValidation(password);

    useEffect(()=>{
        if (sessionStorage.getItem("token")) {
            navigate("/home");
          }
    })

    function handleSubmit(e) {
      console.log(e,'SUBMITTED')
        e.preventDefault() 
        setSubmitted(true)
        
        if(inValidEmail ){
            console.log(email,password)
            let payload = {
                email: email,
                password:password,
              };

            ApiClient.post('admin/signin',payload).then((res)=>{
              if(res.success){
                setSubmitted(false);
                sessionStorage.setItem("token", res?.data.access_token);
                navigate("/home")

            }
            })
          
            
        }

    }
  return <div className="loginBody">
    <h2>Login Page</h2>
    <form onSubmit={handleSubmit} className="formBody border p-3 w-50 m-auto mt-5">
      <h4 className="text-center">Login</h4>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email </label>
    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    {
        email && !inValidEmail && submitted && (<p className="text-danger mb-4">Invalid Email</p>)
    }
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input required type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    {/* {password && !inValidPassword && submitted && (
                      <div className="text-danger">{methodModel.passwordValidationMessages(password)}</div>
                    )} */}
  </div>
  {/* <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  <div className="text-center mt-2">
  <button type="submit" className="btn btn-primary mt-2 ">Submit</button>
  </div>
</form>
  </div>;
};

export default Login;