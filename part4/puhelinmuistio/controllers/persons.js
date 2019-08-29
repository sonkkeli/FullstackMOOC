const personsRouter = require('express').Router()
const Person = require('../models/person')

// tätä ei varmaan enää tarvita
// personsRouter.get('/api', (req, res) => {
//     res.send('<h1>Hello API!</h1>')
// })

// LISTAAMINEN
personsRouter.get('/', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(person => person.toJSON()))
    })
})

// INFOSIVU TSEKKAA TÄSSÄ TOI URL
personsRouter.get('/info', (req, res) => {
    const date = new Date()
    let amount = 0

    Person
        .find({})
        .then(results => {
            amount = results.length
            res.send(
                `<div>
                    <p>Puhelinluettelossa on ${amount} henkilön tiedot</p>
                    <p>${date}</p>
                </div>`
            )
        })
})

// YKSITTÄISEN HENKILÖN NÄYTTÄMINEN, testaa esim id:llä 5cacdefe5f34dc49bc21910f
personsRouter.get('/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
            if (person){
                res.json(person.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))
})

// POISTAMINEN
personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(res => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

// LISÄÄMINEN
personsRouter.post('/', (req, res, next) => {
    const body = req.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(savedPerson => {
        res.json(savedPerson.toJSON())
    })
        .catch(error => next(error))
})

// PUHELINNUMERON PÄIVITTÄMINEN
personsRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,
        number: body.number
    }
    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson.toJSON())
        })
        .catch(error => next(error))
})


module.exports = personsRouter