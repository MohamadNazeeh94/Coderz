import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditUser, FetchUserObj } from "../Redux/Action"

const Updateuser = () => {
    const [name,namestate]=useState('');
    const [email,emailstate]=useState('');
    const [gender,genderstate]=useState('male');
    const [status,statusstate]=useState('inactive');
    const [checked, setChecked] = useState(false)
    const handleClick = () => setChecked(!checked)
    useEffect(() => {
        checked==true?statusstate('active'):statusstate('inactive');
    }, [checked])

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const userinfo = useSelector((state)=>state.user.userdetails)


    const handleSubmit = (e) =>{
        e.preventDefault();
        const userobj = {id, name,email,gender,status};
        dispatch(EditUser(userobj, id));
        navigate('/');
    }

    useEffect(() => {
        dispatch(FetchUserObj(id))
    },[])

    useEffect(() => {
        if(userinfo){
            namestate(userinfo.name);
            emailstate(userinfo.email);
            genderstate(userinfo.gender);
            
            if(userinfo.status == 'active'){
                setChecked(true);
            }
        }
    }, [userinfo]);

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card-header">
                    <h1>Edit User</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-12 my-2">
                            <div className="form-group">
                                <label>Name</label>
                                <input value={name} onChange={e=>namestate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-12 my-2">
                            <div className="form-group">
                                <label>Email</label>
                                <input value={email} onChange={e=>emailstate(e.target.value)} className="form-control"></input>
                            </div>
                        </div>
                        <div className="col-lg-12 my-2">
                            <div className="form-group">
                                <label>Gender</label>
                                <select value={gender} onChange={e=>genderstate(e.target.value)} className="form-control">
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-12 my-2">
                            <div className="form-check form-switch">
                                <input onChange={handleClick} checked={checked} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Status</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary me-2" type="submit">Edit</button>
                    <Link to={'/'} className="btn btn-danger">Back</Link>
                </div>
            </form>
        </div>
    );
}

export default Updateuser;