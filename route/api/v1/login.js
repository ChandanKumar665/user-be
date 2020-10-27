const express = require('express')
const router = express.Router()
const User = require('../../../models/User')

// GET user/:id
router.post('', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).json({
      success: false,
      msg: 'fields are missing.',
      statusCode: 400
    })
  } else {
    User.findOne({ email: email, pwd: password })
      .then(doc => {
        if (doc) {
          let response = {
            id: doc._id,
            email: email
            // firstName: doc.firstName,
            // lastName: doc.lastName
          }
          res.status(200).json({
            success: true,
            msg: 'User found',
            statusCode: 200,
            data: response
          })
        } else {
          res.status(400).json({
            success: true,
            msg: 'Invalid credentials',
            statusCode: 400,
            data: null
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          msg: 'Server Error',
          statusCode: 500
        })
      })
  }
})

module.exports = router
