// Tuntemattoman api-endpointin käsittely
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

// Käyttäjän tunnisteen irroittaja
const tokenExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("bearer")) {
      return authorization.replace("bearer ", "")
    }
    return null
  }
  request.token = getTokenFrom(request)
  next()
}

// Käyttäjän tunnistaminen tokenista
const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" })
  }
  request.user = await User.findByPk(decodedToken.id)
  next()
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
}
