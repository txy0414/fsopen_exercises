const Header = ({text})=><h2>{text}</h2>
const Part = ({part, exercises})=><p>{part} {exercises}</p>
const Content = ({parts})=>(
  <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} />)}
  </div>
)
const Total = ({parts})=>{
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0,
  );

  return(
    <b>total of {total} exercises</b>
  )
}
const Courses = ({courses})=>(
  <div>
    {courses.map(course => (
      <div key={course.id}> 
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
)

export default Courses