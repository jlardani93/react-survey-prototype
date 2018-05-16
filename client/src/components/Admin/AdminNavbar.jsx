import React from 'react'
import PropTypes from 'prop-types'

export default function AdminNavbar(props){
  return(
    <div>
      <style jsx>
        {`
          .navbar {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            background-color: black;
            color: white;
          }

          .navbar div {
            cursor: pointer; 
          }
        `}
      </style>
      <div className="navbar">
        <div onClick={()=>{props.onNavigate('teachers')}}><span>Teachers</span></div>
      </div>
    </div>
  )
}

AdminNavbar.propTypes = {
  onNavigate: PropTypes.func.isRequired
}
