import { useEffect, useState } from "react";
import Layout from "../../global/layout";
import ApiClient from "../../methods/api";
import { Link, useNavigate } from "react-router-dom";
import { LiaEdit, LiaTrashAlt } from "react-icons/lia";
import { Tooltip } from "antd";
import Pagination from "react-js-pagination";
import { PiEyeLight } from "react-icons/pi";

import loader from "../../methods/loader";
import Swal from "sweetalert2";


const Users = () => {
    const navigate = useNavigate()

    const [filters, setFilter] = useState({ page: 1, count: 10, search: "" });
    const [userData, setUserData] = useState([]);
    const [total, setTotal] = useState(0);
    const [role, setRole] = useState('');


    useEffect(() => {
        getUserList()
    }, [filters, role])

    function getUserList() {
        loader(true);
        ApiClient.get(`users/list?page=${filters.page}&count=${filters.count}&role=${role}&isDeleted=false`).then((res) => {
            if (res.success) {
                console.log(res.data, 'res.data')
                setUserData(res.data)
                setTotal(res.total)
                loader(false);
            }
        })
    }

    function edit(id) {
        if (id) {
            navigate(`/users/edit/${id}`)
        }
    }

    function view(id) {
        console.log(id);

    }

    const deleteItem = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to delete this User`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1D97DB",
            cancelButtonColor: "#949494",
            confirmButtonText: "Yes",
        }).then((result) => {
            if (result.isConfirmed) {
                loader(true);
                ApiClient.delete("delete", { id: id, model: "users" }).then((res) => {
                    if (res.success) {
                        getUserList();
                    }
                    loader(false);
                });
            }
        });
    };


    function handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        setFilter({ ...filters, page: pageNumber });
        console.log(filters, 'filters');

        // getUserList()
    }
    return (
        <>
            <Layout>
                <h3 className="mb-3 pt-2 d-flex">Users List</h3>
                {/* <button className="btn btn-primary">Add User</button> */}
                <div className="d-flex gap-3">
                    <Link to='/users/add' className="btn btn-primary">Add User</Link>


                    <select name="" id="" className="form-control w-25" value={role} onChange={(e) => {
                        setRole(e.target.value)
                    }}>
                        <option value="" selected>Select Role</option>
                        <option value="user">User</option>
                        <option value="mentor">Mentor</option>

                    </select>
                    {
                        role && <button className="btn btn-secondary" onClick={() => { setRole('') }}>Reset</button>
                    }

                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.length > 0 && userData.map((res, i) =>
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{res.fullName}</td>
                                    <td>{res.role}</td>
                                    <td>{res.email}</td>
                                    <td>{res.status}</td>
                                    <td>
                                        {/* <Tooltip placement="top" title="View">
                                            <a onClick={(e) => view(res.id)} className="border cursor-pointer hover:opacity-70 rounded-lg bg-[#06368814] w-10 h-10 !text-primary flex items-center justify-center text-lg">
                                                <PiEyeLight />
                                            </a>
                                        </Tooltip> */}
                                        <Tooltip placement="top" title="Edit">
                                            <a onClick={(e) => edit(res.id)} className="border cursor-pointer hover:opacity-70 rounded-lg bg-[#06368814] w-10 h-10 !text-primary flex items-center justify-center text-lg">
                                                <LiaEdit />
                                            </a>
                                        </Tooltip>

                                        <Tooltip placement="top" title="Delete">
                                            <span onClick={() => deleteItem(res.id)} className="border cursor-pointer hover:opacity-70 rounded-lg bg-[#06368814] w-10 h-10 !text-primary flex items-center justify-center text-lg">
                                                <LiaTrashAlt />
                                            </span>
                                        </Tooltip>
                                    </td>


                                </tr>)
                        }


                    </tbody>
                </table>
                <div>
                    <Pagination
                        activePage={filters.page}
                        itemsCountPerPage={10}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={(e) => handlePageChange(e)}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </Layout>
        </>
    )
}

export default Users;