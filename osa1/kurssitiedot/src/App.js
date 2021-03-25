import React from 'react'
import Course from './components/Course'

const Header = (props) => {
  return (
    <h1> {props.header} </h1>
  )
}


const App = () => {

  const header = 'Web Development Curriculum'

  const courses = [
    {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
]

  return (
    <div>
      <Header header = {header}/>

      {courses.map(course => 
        <Course course={course}/>)}
      </div>
  )
}

export default App