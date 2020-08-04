import React from 'react';


const Course = ({ course }) => {
    return(
    <>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )}
  const Header = (props) => {
    return(
    <h1>{props.course}</h1>
    ) 
  } 
  
  const Content = ({ parts }) => {
    //console.log(parts);
    return(
    <div>
      {parts.map(part => 
      <Part part={part.name} key={part.id} exercise={part.exercises}/>
      )}
    </div>
    )
  }
  
  const Part = (props) => {
    return(
      <>
        <p>{props.part} {props.exercise}</p>
      </>
    )
  }
  
  const Total = ({parts}) => {
    //console.log(parts);
    let total = parts.reduce((s,p) => s + p.exercises,0);
    return(
    <p><strong>Number of total exercises: {total}</strong></p>
    )
  } 

export default Course