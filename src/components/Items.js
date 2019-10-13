import React, { Component } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
export default class Items extends Component {

    render() {
        const { title, title1, handleDelete, handleEdit } = this.props;
        return ( <li className = "list-group-item text-capitalize d-flex justify-content-between my-2" >
            <h6 > $ { title } < span className = "mx-3 text-primary" > M { title1 } </span>
            </h6 >
            <div >
            <span className = "mx-2 text-success"
            onClick = { handleEdit } >
            <MdEdit / >
            </span> 
            <span className = "mx-2 text-danger"
            onClick = { handleDelete } >
            <MdDelete/>
            </span> 
            </div> 
            </li>
        )
    }
}