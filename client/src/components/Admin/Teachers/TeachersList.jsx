import React from 'react';
import PropTypes from 'prop-types';

export default function TeachersList(props){
  return(
    <div>
      <style jsx>
        {`
          .tableRow {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            justify-items: center;
            align-items: center;
          }

          .tableRow p {
            display: table-cell;
            height: 30px;
            width: 100%;
            border: 1px solid black;
            vertical-align: middle;
            margin: 0;
          }
        `}
      </style>
      <div id="teachersTable">
          <div key={'titleRow'} className="tableRow">
            <p>ID</p>
            <p>USER_ID</p>
            <p>SCHOOL</p>
            <p>E-MAIL</p>
            <p>NAME</p>
          </div>
        {props.teachers.map(teacher =>
          <div key={teacher.id} className="tableRow">
            <p>{teacher.id}</p>
            <p>{teacher.user_id}</p>
            <p>{teacher.school}</p>
            <p>{teacher.email}</p>
            <p>{teacher.name}</p>
            <button onClick={()=>{props.onOpenAddModuleForm(teacher.id)}}>Add Module</button>
          </div>
        )}
      </div>
    </div>
  )
}

TeachersList.propTypes = {
  teachers: PropTypes.array
}
