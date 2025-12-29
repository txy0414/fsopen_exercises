import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(()=>{
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const replaceNumber = id => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }
    
    personsService
      .replace(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== id ? p : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const sendNotification = message => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const checkDuplicate = (name) => {
      return persons.some(person => person.name === name)
    }
    if (checkDuplicate(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personID = persons.find(person => person.name === newName).id
        replaceNumber(personID)
        sendNotification(`${newName}'s number is changed`)
      }else{
        return
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personsService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          sendNotification(`Added ${newName}`)
        })
        .catch(error => {
          // this is the way to access the error message
          console.log(error.response.data.error)
          setError(error.response.data.error)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {   
    if(event.target.value === ' ') {
      setShowAll(true)
    } else {
      setNewFilter(event.target.value)
      setShowAll(false)
    }
  }

  const handlePersonDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name} ? `)) {
      personsService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setError(
          `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setError(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  return (
    <div>
      <h2> Phonebook </h2>
      <Notification message={notification} className={"success"}/>
      <Notification message={error} className={"error"}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Person persons={personsToShow} handleClick={handlePersonDelete} />
    </div>
  )
}

export default App