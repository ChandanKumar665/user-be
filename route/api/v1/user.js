const express = require('express')
const router = express.Router()
const User = require('../../../models/User')

// POST resigter user
router.post('', async (req, res) => {
  const { firstname, lastname, email, pass, gender } = req.body
  if (!firstname || !lastname || !email || !pass || !gender) {
    res.status(400).json({
      success: false,
      msg: 'fields are missing.',
      statusCode: 400
    })
  } else {
    let data = {
      email: email,
      pwd: pass,
      firstName: firstname,
      lastName: lastname,
      gender: gender
    }
    User.insertMany([data], (insertErr, doc) => {
      if (insertErr) {
        res.status(500).json({
          success: false,
          msg: 'Server Error',
          statusCode: 500
        })
      } else {
        res.status(201).json({
          success: true,
          msg: 'Registration successfull',
          statusCode: 201
        })
      }
    })
  }
})

// GET user/:id
router.get('/:userid', async (req, res) => {
  const { userid } = req.params.userid
  if (!userid) {
    res.status(400).json({
      success: false,
      msg: 'userid is missing.',
      statusCode: 400
    })
  } else {
    User.findById(userid)
      .then(doc => {
        if (doc) {
          res.status(200).json({
            success: true,
            msg: 'User found',
            statusCode: 200,
            data: doc
          })
        } else {
          res.status(404).json({
            success: true,
            msg: 'User not found',
            statusCode: 404,
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

// PUT user/:id
router.put('/:userid', async (req, res) => {
  const { userid } = req.params.userid
  if (!userid) {
    res.status(400).json({
      success: false,
      msg: 'userid is missing.',
      statusCode: 400
    })
  } else {
    User.findById(userid)
      .then(doc => {
        if (doc) {
          //update
          //   res.status(200).json({
          //     success: true,
          //     msg: 'User found',
          //     statusCode: 200,
          //     data: doc
          //   })
        } else {
          res.status(404).json({
            success: true,
            msg: 'User not found',
            statusCode: 404,
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
