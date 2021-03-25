const Content = (props) => {
    return (
    <div>
      <h2>{props.course.name}</h2>
      <ul>
        {props.course.parts.map(part =>
        <li key={part.id}>
          {part.name} {part.exercises}
        </li>
        )}
      </ul>
      </div>
    )
  }
  
  const Total = (props) => {
    let total = 0

    for (let i=0; i<props.course.parts.length; i++) {
        total += props.course.parts[i].exercises
    }
    return (
        <p>Number of exercises {total}</p>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Content course = {course} />
        <Total course = {course}/>
      </div>
    )
  }

  export default Course