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
    useEffect(() => {
        getUserList()
    }, [])
    const [filters, setFilter] = useState({ page: 1, count: 10, search: "", total: 0 });
    const [userData, setUserData] = useState([])

    function getUserList() {
        loader(true);
        ApiClient.get(`users/list?page=${filters.page}&count=${filters.count}&isDeleted=false`).then((res) => {
            if (res.success) {
                console.log(res.data, 'res.data')
                setUserData(res.data)
                setFilter({ total: res.total })
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
                <h1>Users List</h1>
                {/* <button className="btn btn-primary">Add User</button> */}
                <Link to='/users/add' className="btn btn-primary">Add User</Link>
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
                                <tr>
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
                        totalItemsCount={filters.total}
                        pageRangeDisplayed={5}
                        onChange={(e) => handlePageChange(e)}
                        prevPageText="Previous"
                        nextPageText="Next"
                        itemClass="bg-white px-2 text-[#8f8f8f] rounded-md"
                        activeClass="!bg-[#005AAB] px-2 !text-white rounded-md"
                    />
                </div>
            </Layout>
        </>
    )
}

export default Users;