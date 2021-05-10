const fetch = require('node-fetch');

const getRoles = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/roles');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

const addRole = async (data) => {
  try {
    const response = await fetch('http://localhost:3001/api/role', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const r = await response.json();
    return console.log(
      '\n' +
        r.message +
        '. The new' +
        r.data.title +
        ' role has been created!\n'
    );
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

module.exports = { getRoles, addRole };
