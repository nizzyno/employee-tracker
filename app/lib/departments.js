const fetch = require('node-fetch');

const getDepartments = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/departments');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

const addDepartment = async (data) => {
  try {
    const response = await fetch('http://localhost:3001/api/department', {
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
        ". The New Department named '" +
        r.data.name +
        "' has been created!\n"
    );
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

module.exports = { getDepartments, addDepartment };
