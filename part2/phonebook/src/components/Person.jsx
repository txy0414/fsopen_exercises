const Person = ({persons, handleClick}) => (
  <div>
    {persons.map(person => 
    <div key={person.name}>
      <div>{person.name} {person.number} <button onClick={() => handleClick(person.id)}> delete </button> </div>
    </div>
    )}
  </div>
)
export default Person