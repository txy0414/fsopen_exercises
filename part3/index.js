const express = require('express')
const app = express()
const morgan  = require('morgan')
const cors = require('cors')

app.use(express.static('dist'))
/// app.use(cors())
app.use(express.json())
/// app.use(morgan('tiny'))

// 自定义token
morgan.token('body', function(request, response){
    return JSON.stringify(request.body) || '-';
});

// 自定义format，其中包含自定义的token
morgan.format('post', ':method :url :status :res[content-length] - :response-time ms :body');

// 使用自定义的format
app.use(morgan('post'));

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
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(p => p.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
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
        const person = {
            id:  generateID(),
            name: body.name,
            number: body.number
        }
        persons = persons.concat(person)
        response.json(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
