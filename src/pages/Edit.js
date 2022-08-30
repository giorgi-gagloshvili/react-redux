import AddUserForm from "../components/AddUserForm";
import { useLocation, useParams } from 'react-router-dom'

const Edit = () => {
    const location = useLocation();
     
    const { id } = useParams()

    return (
        <div>
            <AddUserForm 
                pathName={location.pathname.slice(1)} 
                id={id} />
        </div>
    );
}
 
export default Edit;