import { useEffect, useId, useState } from "react";
import Layout from "../../global/layout";
import methodModel from "../../methods/methods";
import ApiClient from "../../methods/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LuArrowBigLeft } from "react-icons/lu";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { RxCross2 } from "react-icons/rx";
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import environment from "../../environment";
import Editor from '@monaco-editor/react';
import Autocomplete from "react-google-autocomplete";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import 'monaco-editor/min/vs/editor/editor.main.css';

const options = {
  autoIndent: 'full',
  contextmenu: true,
  fontFamily: 'monospace',
  fontSize: 13,
  lineHeight: 24,
  hideCursorInOverviewRuler: true,
  matchBrackets: 'always',
  minimap: {
    enabled: true,
  },
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
  selectOnLineNumbers: true,
  roundedSelection: false,
  readOnly: false,
  cursorStyle: 'line',
  automaticLayout: true,
};

const UsersAdd = () => {
  const navigate = useNavigate();
  const userId = useParams().id;
  console.log(userId, "useId");

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    image: "",
    address: ""
  });

  const [submit, setSubmit] = useState(false);
  const inValidEmail = methodModel.emailvalidation(userData.email);


  useEffect(() => {
    if (userId) {
      getUserDetails(userId);
    }
  }, []);


  function handelSubmit(e) {
    e.preventDefault();
    console.log(userData, "userData");
    setSubmit(true);
    if (!inValidEmail) {
      return;
    }
    let payload = {
      ...userData,
      role: "user",
    };
    if (userId) {
      payload["id"] = userId ? userId : "";
      ApiClient.put("edit/profile", payload).then((res) => {
        if (res.success) {
          console.log(res.data, "USERDATA");
          setSubmit(false);
          navigate("/users");
        }
      });
    } else {
      ApiClient.post("add/user", payload).then((res) => {
        if (res.success) {
          console.log(res.data, "USERDATA");
          setSubmit(false);
          navigate("/users");
        }
      });
    }
  }

  function getUserDetails(id) {
    ApiClient.get(`user/details?id=${id}`).then((res) => {
      if (res.success) {
        setUserData({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          mobileNo: res.data.mobileNo,
          image: res.data.image,
          address: res.data.address
        });


      }
    });
  }

  const uploadImage = async (e) => {
    let files = e.target.files;
    let file = files.item(0)
    console.log(files, "files");

    // return
    let images = [];
    ApiClient.postFormData(`upload/image?modelName=UploadImage`, { file: file }).then(res => {
      if (res.success) {
        setUserData({ ...userData, image: res?.data?.fullpath })
      }
      loader(false)
    })

  };

  function onChangeNumber(e) {
    console.log(e, 'Number')
  }

  function removeImg() {
    setUserData({ ...userData, image: '' })
  }

  function selectAddress(e) {
    console.log(e, "selectedAddress");
    setUserData({ ...userData, address: e.label })


  }

  const handlePlaceSelected = (place) => {
    console.log(place);
    // Optionally, update address based on selected place
    setUserData({ ...userData, address: place.formatted_address });
  };

  const handleAddressChange = (e) => {
    setUserData({ ...userData, address: e.target.value });
  };

  console.log(userData.address, 'userData.address')

  return (
    <>
      <Layout>
        <div className="d-flex justify-content-between align-item-center">
          <h2> {userId ? "Edit" : "Add"} User</h2>
          <Link to="/users">
            {" "}
            <LuArrowBigLeft className="backIcon" />
          </Link>
        </div>
        <form onSubmit={handelSubmit} className="text-align-left">
          <div className="form-row ">
            <div className="form-group col-md-6 ">
              <label>First Name</label>
              <input
                value={userData?.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
                type="text"
                className="form-control mb-2"
                placeholder="First Name"
                required
              />
            </div>{" "}
            <div className="form-group col-md-6">
              <label>Last Name</label>
              <input
                value={userData?.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
                type="text"
                className="form-control mb-2"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="form-group col-md-6">
              <label>Email</label>
              <input
                value={userData?.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                required
              />

              <div>
                {userData?.email && submit && !inValidEmail && (
                  <p className="text-danger mb-4">Invalid Email</p>
                )}
              </div>
            </div>
            <div className="form-group col-md-6">
              <label>Mobile No</label>
              <div className="mobile_number mb-3 clicks">
                <PhoneInput
                  country=""
                  value={userData?.mobileNo}
                  enableSearch={true}
                  onChange={(e) => setUserData({ ...userData, mobileNo: e })}
                  countryCodeEditable={true}

                />
              </div>
              <div>
                {userData?.email && submit && !inValidEmail && (
                  <p className="text-danger mb-4">Invalid Email</p>
                )}
              </div>
            </div>

            <div className="form-group col-md-6">
              <label>Address</label>
              <div className="mobile_number mb-3 clicks">
                {/* <GooglePlacesAutocomplete
                  apiKey={environment.map_api_key}
                  value={userData.address}
                  key={userData.address}
                  defaultValue={userData.address}

                  selectProps={{
                    onChange: (e) => selectAddress(e),
                    value:userData.address
                  }}
                  editable={true}


                /> */}

                <Autocomplete
                className="form-control"
                 apiKey={environment.map_api_key}
                  onPlaceSelected={handlePlaceSelected}
                  value={userData.address}
                  onChange={handleAddressChange}
                />
              </div>

            </div>


            <div className="form-group col-md-6">
              <label>Image</label>
              <input
                type="file"
                onChange={(e) => {
                  uploadImage(e);
                }}
              />
              {
                userData?.image &&
                <div className="card" >
                  <img src={methodModel.userImg('images/UploadImage/' + userData?.image)} className="bg-white thumbnail !w-[80px] !h-[80px] rounded-lg shadow-lg border-[2px] border-white object-cover" />
                  <RxCross2 onClick={removeImg} />
                </div>

              }



            </div>


            <div className="form-group col-md-6">
              <label>Description</label>
              {/* <Editor
                height="40vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                options={{
                  lineNumbers: "on",
                  minimap: {
                    enabled: true
                  },
                  scrollBeyondLastLine: false,
                }}
              /> */}

{/* <ReactQuill theme="snow" />; */}

            </div>
          </div>


          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </Layout>
    </>
  );
};

export default UsersAdd;
