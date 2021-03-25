import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/personService'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Person = (props) => {

  const deletePerson = () => {
    if (window.confirm('Delete ' + props.person.name + '?')) {
      personService
          .deletePerson(props.person.id)
          .then(returnedPerson => {
            personService.getAll()
          .then(initialPersons => {
            props.setPersons(initialPersons)
      })
    })
    props.setMessage('Deleted ' + props.person.name)
    setTimeout(() => {
      props.setMessage(null)
    }, 5000)
      
    }
    
  }

  return (
    <div>
    <li>{props.person.name} {props.person.number}</li><button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {props.persons.map(person =>
        <Person person = {person} persons = {props.persons} setPersons = {props.setPersons} setMessage = {props.setMessage} />
        )}
    </ul>
  )
}

const Form = (props) => {

  return (
    <form onSubmit={props.addPerson}>
    <div>name: <input name={props.newName} onChange={props.handleTextChange}/> </div>
    <div>number: <input number={props.newNumber} onChange={props.handleNumberChange}/> </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [message, setMessage] = useState(null)
    
  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [], hook)

  const handleTextChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
      if (persons.map(personObject => personObject.name).includes(newName)) {
        alert(newName +  ' is already added to phonebook')
      } else {
        const personObject = {
          name: newName,
          number: newNumber,
          date: new Date().toISOString(),
          important: Math.random() > 0.5,
          id: persons.length + 1,
        }
        personService
          .create(personObject)
          .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
    })
    setMessage('Added ' + newName)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Form addPerson = {addPerson} newName = {newName} handleTextChange = {handleTextChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons = {persons} setPersons = {setPersons} setMessage = {setMessage} />
    </div>
  )

}

export default App