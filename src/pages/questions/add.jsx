import { useEffect, useId, useState } from "react";
import Layout from "../../global/layout";
import ApiClient from "../../methods/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { LuArrowBigLeft } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";



const QuestionsAdd = () => {
    const navigate = useNavigate();
    const userId = useParams().id;
    console.log(userId, "useId");

    const [userData, setUserData] = useState({
        question: "",
        answer_type: "",
        question_order: "",
        about_question: "",
        category: "6615443c17528a9d67b881fa",
        options: []
    });

    const [answers, setAnswers] = useState([{
        option: "",
        marks: 0
    }]);

    function removeOption(i){

        console.log(i,'index')
        let dummy=[...answers]
        dummy.splice(i,1)

        setAnswers(dummy)

    }

    const [submit, setSubmit] = useState(false);


    useEffect(() => {
        if (userId) {
            getUserDetails(userId);
        }
    }, []);


    function handelSubmit(e) {
        e.preventDefault();
        console.log(userData, "userData");
        setSubmit(true);
        let payload = {
            ...userData
        };
        payload["options"] = answers
        console.log(payload, 'payload')
        if (userId) {
            payload["id"] = userId ? userId : "";
            ApiClient.put("question", payload).then((res) => {
                if (res.success) {
                    console.log(res.data, "USERDATA");
                    setSubmit(false);
                    navigate("/users");
                }
            });
        } else {
            ApiClient.post("question", payload).then((res) => {
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



    function addOptions() {
        setAnswers([...answers, { option: "", marks: answers.length }]);
    }


    console.log(userData.address, 'userData.address')

    return (
        <>
            <Layout>
                <div className="d-flex justify-content-between align-item-center">
                    <h2> {userId ? "Edit" : "Add"} Question</h2>
                    <Link to="/users">
                        {" "}
                        <LuArrowBigLeft className="backIcon" />
                    </Link>
                </div>
                <form onSubmit={handelSubmit} className="text-align-left">
                    <div className="row m-2">

                        <div className="form-group col-md-6 ">
                            <label>Question</label>
                            <input
                                value={userData?.question}
                                onChange={(e) =>
                                    setUserData({ ...userData, question: e.target.value })
                                }
                                type="text"
                                className="form-control mb-2"
                                placeholder="Question"
                                required
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Answer Type</label>
                            <select name="" id="" className="form-control" value={userData?.answer_type}
                                onChange={(e) =>
                                    setUserData({ ...userData, answer_type: e.target.value })
                                }>

                                <option value="">Select Answe Type</option>
                                <option value="single">Single</option>
                                <option value="multiple">Multiple</option>
                                <option value="dropdown">Dropdown</option>
                                <option value="text">Text</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6 ">
                            <label>Question Order</label>
                            <input
                                value={userData?.question_order}
                                onChange={(e) =>
                                    setUserData({ ...userData, question_order: e.target.value })
                                }
                                type="number"
                                className="form-control mb-2"
                                placeholder="Question order"
                                required
                            />
                        </div>

                        <div className="form-group col-md-6 ">
                            <label>About Question</label>

                            <textarea className="form-control" value={userData?.about_question}
                                onChange={(e) =>
                                    setUserData({ ...userData, about_question: e.target.value })
                                } placeholder="About Question"></textarea>

                        </div>

                        <div className="form-group col-md-6 ">
                            <label>Answers</label>
                            {
                                answers.map((res, i) =>
                                    // <input type="text" key={i} className="form-control mb-2" value={answers[i].option} onChange={(e) => setAnswers([...answers,{ option: e.target.value, marks: i }])} />
                                    <span>
                                        <input type="text" key={i} className="form-control mb-2" value={answers[i].option}
                                            onChange={(e) => {
                                                const updateArr = [...answers]
                                                updateArr[i].option = e.target.value
                                                setAnswers(updateArr)
                                            }
                                            } />

                                       {
                                        answers.length>1 && <><RxCross2 onClick={()=>removeOption(i)} /><br></br></>
                                       } 
                                    </span>
                                )
                            }

                            <button className="btn btn-primary" type="button" onClick={addOptions}>Add Options</button>
                        </div>


                    </div>


                    <button type="submit" className="btn btn-primary m-3">
                        Save
                    </button>
                </form>
            </Layout>
        </>
    );
};

export default QuestionsAdd;
