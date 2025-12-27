import jwt from "jsonwebtoken";


// API Verification Done 
function verifyJwtToken(req, res, next) {
  // console.log('verifyJwtToken', req.cookies['token'])
  const token = req.cookies['token'];
  jwt.verify(token, 'Google', (error, decoded) => {
    if(error){
      return res.send({
        msg:'Invalid token',
        success: false
      })
    }
    console.log(decoded) // This give email and password
    next()
  })
}

export default verifyJwtToken