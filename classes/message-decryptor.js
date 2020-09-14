'use strict'

class MessageDecryptor {
  // input: el mensaje tal cual es recibido en cada satélite
  // output: el mensaje tal cual lo genera el emisor del mensaje
  static getMessage (messages) {
    const len = messages[0].length
    const message = []
    for (let i = 0; i < len; i++) {
      const chunk = messages[0][i] || messages[1][i] || messages[2][i]
      message.push(chunk)
    }
    if (message.every(i => i.length > 0)) {
      return message.join(' ')
    }
    return '';
  }
}

module.exports = MessageDecryptor
