const jwt = require('jsonwebtoken');

const secret = 'myCat';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4Nzk2ODYwNX0.JtweGa-rvwyBLsHR7Uk0MUi8R2ZwdI5V6ItD5kAkGbI'

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);



