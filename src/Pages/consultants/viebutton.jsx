import React from 'react'
import { useNavigate } from 'react-router-dom';
const FILEPAGE = "/admin/filemanagement/view"

function Viebutton(props) {
    const navigate = useNavigate();
    return (
        <button id={props.id} onClick={() => {
            
            sessionStorage.setItem("fileID", props.id)
            navigate(FILEPAGE);
        }}>View</button>
    )
}

export default Viebutton