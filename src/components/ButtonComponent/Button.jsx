import React, { useState } from 'react'

const Button = ({ group, setGroup, order, setOrder }) => {

    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const handleGroupChange = (e) => {
        setGroup(e.target.value);
    };
    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const toggleDropDown = () => {
       setIsDropDownOpen(!isDropDownOpen);
    };

  return (
    <div style={{ marginBottom: "10px", 
      backgroundColor: "white",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",  
      display: "flex",
      }}>
      <button
        onClick={toggleDropDown}
        style={{
          backgroundColor: "#fff",
          border: "1px solid #C0C0C8",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer", 
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 10px",
        }}
      >
        <img style={{marginRight:"4px"}}src="./assets/icons/Display.svg" alt="icon" />
        <div>Display</div>
        <img src='./assets/icons/down.svg' alt='icon2'/>
      </button>
      {isDropDownOpen && (
        
      <div
        style={{
          marginLeft: "10px",
          padding: "10px",
          backgroundColor: "#fff",
          border: "1px solid #c0c0c0",
          borderRadius: "5px",
          position: "absolute",
          top: "60px",
          width: "250px",
          zIndex: "2",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
          color: "#9E9EA0"
        }}
      >
        <label style={{ 
          display: "flex",
          justifyContent:"space-between",
          alignContent:"center", 
          marginBotton: "10px",
          marginBottom: "10px",
           }}>
          <div>
            Grouping
          </div>
          <select
            value={group}
            onChange={handleGroupChange}
            style={{padding:"2px 5px", borderRadius:"5px", border:"1px solid #c0c0c0", backgroundColor:"white"}}

          >
            <option value="status">Status</option>
            <option value="userId">User</option>
            <option value="priority">Priority</option>
          </select>
        </label>
        <label style={{ display: "flex",justifyContent:"space-between",alignContent:"center", marginBotton: "10px" }}>
          <div>
            Ordering
          </div>
          <select
            value={order}
            onChange={handleOrderChange}
            style={{padding:"2px 5px", borderRadius:"5px", border:"1px solid #c0c0c0", backgroundColor:"white"}}
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </label>
      </div>
      )}
    </div>
  );
}

export default Button;