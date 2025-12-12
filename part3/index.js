require('dotenv').config()
const express = require('express')
const app = express()
const morgan  = require('morgan')
const Person = require('./models/persons')
/// const cors = require('cors')

/// static front-end code, for deploying to the internet
app.use(express.static('dist'))
/// app.use(cors())
app.use(express.json())

/// ------------------------------------------------------------------ MORGAN (FOR LOGGING)
/// app.use(morgan('tiny'))

// define custom token
morgan.token('body', function(request, response){
    return JSON.stringify(request.body) || '-';
});

// define custom format, including custom token
morgan.format('post', ':method :url :status :res[content-length] - :response-time ms :body');

// apply custom format
app.use(morgan('post'));
/// -------------------------------------------------------------------

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const entries = persons.length
    const time = new Date()
    response.send(`<p>Phonebook has info for ${entries} people</p><p>${time}</p>`)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(person => {
        response.json(person)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

const generateID = () => {
    const max = 10000
    return String(Math.floor(Math.random() * max))
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const duplicate = persons.some(p => p.name === body.name)
    console.log(duplicate)
    if(duplicate){
        response.status(400).json({ error: 'name must be unique' })
    } else if (!body.name || !body.number) {
        response.status(400).json({ error: 'name and number are required' })
    } else {
        const person = new Person({
            id:  generateID(),
            name: body.name,
            number: body.number
        })
        person.save().then(savedPerson => {
            response.json(savedPerson)
        })
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
