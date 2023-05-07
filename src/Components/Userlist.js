import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { FetchUserList, RemoveUser } from "../Redux/Action";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";


const Userlist = (props) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (data) => {
        const selectedPage = data.selected + 1;
        setCurrentPage(selectedPage);
        props.loaduser(selectedPage);
    }

    useEffect(() =>{
        props.loaduser(currentPage);
    }, [currentPage])
    
    const handeDelete = (id) =>{
        if(window.confirm('Are you sure you want to delete this user?')){
            props.removeuser(id);
            props.loaduser(currentPage);
            toast.success('User removed successfully.')
        }
    }
    
    return (
        props.user.loading?<div className="text-center"><h1>Loading...</h1></div>:
        props.user.errormesage?<div className="text-center"><h1>{props.user.errormesage}</h1></div>:
        <div className="card">
            <div className="card-header">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <h1>User List</h1>
                    <div><Link to={'/add'} className="btn btn-primary">Add User</Link></div>
                </div>
            </div>
            <div className="card-body">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.user.userlist && props.user.userlist.map(item=>
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <Link to={'/edit/'+item.id} className="btn btn-secondary me-2">Edit</Link>
                                        <button onClick={()=>{handeDelete(item.id)}} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
                <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={props.user.headers['x-pagination-pages']}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                activeClassName={'active'}
                breakClassName="mx-2"
                forcePage={currentPage - 1}
                />
            </div>
        </div>
    );
}

const mapStateToProps=(state)=>{
    return{
        user: state.user
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        loaduser:(page) => dispatch(FetchUserList(page)),
        removeuser:(id)=>dispatch(RemoveUser(id))

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Userlist);