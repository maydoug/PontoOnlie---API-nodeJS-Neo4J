import { Router } from 'express'
import userModel from '../models/user'

const user = Router()

user.get('/user/', async (req, res) => {
    const result = await userModel.findAll()
    res.json(result)
})

user.get('/user/:id', async (req, res) => {
    const result = await userModel.findById(req.params.id)
    res.json(result)
})

user.post('/user/', async (req, res) => {
    const result = await userModel.create(req.body)
    res.json(result)
})

user.put('/user/:id', async (req, res) => {
    const result = await userModel.findByIdAndUpdate(req.params.id, req.body)
    res.json(result)
})

user.delete('/user/:id', async (req, res) => {
    const result = await userModel.findByIdAndDelete(req.params.id)
    res.json(result)
})

export default user