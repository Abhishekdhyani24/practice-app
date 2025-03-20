import {React,useEffect,useState} from 'react';
import methodModel from "../../methods/methods";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../methods/api";


const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false)
    const inValidEmail = methodModel.emailvalidation(email);
    const inValidPassword = methodModel.passwordValidation(password);

    useEffect(()=>{
        if (sessionStorage.getItem("token")) {
            navigate("/home");
          }
    })

    const handleSubmit= async(e) => {
        e.preventDefault() 
        setSubmitted(true)
        
      
        if(submitted && inValidEmail ){
            console.log(email,password)
            let payload = {
                email: email,
                password:password,
              };

            const res = await ApiClient.post('admin/signin',payload);
            if(res.success){
                setSubmitted(false);
                sessionStorage.setItem("token", res?.data.access_token);
                navigate("/home")

            }
            
        }

    }
  return <div>
    <h2>Login Page</h2>
    <form onSubmit={handleSubmit} className="border p-3">
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email </label>
    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    {
        email && !inValidEmail && submitted && (<p className="text-red-600 mb-4">Invalid Email</p>)
    }
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input required type="password" value={password}  onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
    {password && !inValidPassword && submitted && (
                      <div className="text-danger">{methodModel.passwordValidationMessages(password)}</div>
                    )}
  </div>
  {/* <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div> */}
  <button type="submit" className="btn btn-primary mt-2">Submit</button>
</form>
  </div>;
};

export default Login;