const bcrypt = require('bcrypt');

const verifyPassword = async () => {
  const myPassword = 'lanube78#';
  const hash = '$2b$10$623bPHDGmzQCfaZ8lEe5qOQN/TiYFo2x4LSnQHBujWTJnKg35ivvK'
  const isMath = await bcrypt.compare(myPassword, hash);

  console.log(isMath);
}

verifyPassword();


