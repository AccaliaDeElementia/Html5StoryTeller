'use strict'

const fs = require('fs')

const validateMessage = require('validate-commit-msg')

const messageLocation = './.git/COMMIT_EDITMSG'

fs.readFile(messageLocation, (_, buffer) => {
  let message = buffer.toString()

  const result = validateMessage(message)
  process.exit(result ? 0 : 1)
})
