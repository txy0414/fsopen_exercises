const Header = ({course})=><h1>{course}</h1>
const Part = ({part, exercises})=><p>{part} {exercises}</p>
const Content = ({parts})=>(
  <div>
      {parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
  </div>
)
const Total = ({parts})=>{
  let count = 0
  parts.forEach(part => {
    count += part.exercises
  });
  
  return(
    <p>Total number of exercises {count}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App