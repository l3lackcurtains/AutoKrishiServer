import express from 'express'

import { Transaction } from '../model'

const router = express.Router()

/*
 ***************************************
 * Post transaction Data
 * *************************************
*/
router.post('/transaction', async (req, res) => {
    const { atmTemp, atmHumudity, soilMoisture } = req.body
    await Transaction.sync().then(() => {
        return Transaction.create({
            atmTemp,
            atmHumudity,
            soilMoisture
        })
      })
    res.json({ success: true })
})

/*
 ***************************************
 * Get transaction Data
 * *************************************
*/
router.get('/transaction', async (req, res) => {
    return Transaction.findAll().then(data => {
        return res.json({ success: true, data })
    })
})

export default router