import { useEffect, useId, useState } from "react";
import Layout from "../../global/layout";
import methodModel from "../../methods/methods";
import ApiClient from "../../methods/api";
import { useNavigate, useParams,Link } from "react-router-dom";
import { LuArrowBigLeft } from "react-icons/lu";



const UsersAdd = () => {
    const navigate = useNavigate()
    const userId = useParams().id
    console.log(userId, 'useId');
    useEffect(() => {
        if (userId) {
            getUserDetails(userId)
        }
    }, [])

    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const [submit, setSubmit] = useState(false)
    const inValidEmail = methodModel.emailvalidation(userData.email);

    function handelSubmit(e) {
        e.preventDefault();
        console.log(userData, "userData")
        setSubmit(true)
        if (!inValidEmail) {
            return
        }
        let payload = {
            ...userData,
            role: "user"
        }
        if (userId) {
            payload['id'] = userId ? userId : ''
            ApiClient.put('edit/profile', payload).then((res) => {
                if (res.success) {
                    console.log(res.data, 'USERDATA')
                    setSubmit(false)
                    navigate('/users')
                }
            })
        } else {

            ApiClient.post('add/user', payload).then((res) => {
                if (res.success) {
                    console.log(res.data, 'USERDATA')
                    setSubmit(false)
                    navigate('/users')
                }
            })
        }




    }

    function getUserDetails(id) {

        ApiClient.get(`user/details?id=${id}`).then((res) => {
            if (res.success) {
                setUserData({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email
                })
            }
        })

    }

    const uploadImage = async (e) => {

        let files = e.target.files;
        console.log(files, 'files');

        // return
        let images = [];
        ApiClient.multiImageUpload(`upload/image?modelName=UploadImage`, files, {}, "file").then((res) => {
            if (res) {
                let image = [res.fileName]
                console.log(res, 'IMAGE')
            }
        });
    };

    return (
        <>
            <Layout>
                <h2> {userId ? "Edit" : "Add"} User</h2>
                <Link to='/users'>  <LuArrowBigLeft /></Link>
                <form onSubmit={handelSubmit} className="text-align-left">
                    <div className="form-row ">
                        <div className="form-group col-md-6 ">
                            <label >First Name</label>
                            <input value={userData?.firstName} onChange={(e) => setUserData({ ...userData, firstName: e.target.value })} type="text" className="form-control mb-2" placeholder="First Name" required />
                        </div>    <div className="form-group col-md-6">
                            <label >Last Name</label>
                            <input value={userData?.lastName} onChange={(e) => setUserData({ ...userData, lastName: e.target.value })} type="text" className="form-control mb-2" placeholder="Last Name" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input value={userData?.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} type="email" className="form-control mb-2" placeholder="Email" required />

                            <div>
                                {
                                    userData?.email && submit && !inValidEmail && (<p className="text-danger mb-4">Invalid Email</p>)
                                }
                            </div>
                        </div>

                        <div className="form-group col-md-6">
                            <label >Email</label>
                            <input type="file" onChange={(e) => {
                                uploadImage(e);
                            }} />
                        </div>

                    </div>

                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </Layout>
        </>
    )
}

export default UsersAdd;