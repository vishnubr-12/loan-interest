import React, { Component } from 'react';
import Item from "./Items"
import { MdDelete } from "react-icons/md";
class List extends Component {
    render() {
        const {items, clearList, handleDelete, handleEdit }=this.props
        
        return (
          
                 <ul className="list">
                 <h3 className="text-capitalize text-center">list</h3>
                 {items.map(item => {
          return (
            <Item
              key={item.id}
              title={item.title}
              title1={item.title1}
              handleDelete={() => handleDelete(item.id)}
              handleEdit={() => handleEdit(item.id)}
            />
          );
        })}
      {items.length > 0 && (
        <button className="btn bg-info" onClick={clearList}>
          clear list
          <MdDelete className="btn-icon" />
        </button>
      )}
      </ul>    
        
        );
    }
}

export default List;