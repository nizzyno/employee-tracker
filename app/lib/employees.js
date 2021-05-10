const fetch = require('node-fetch');

const getEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/employees');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

const getManagers = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/managers');
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

const addEmployee = async (data) => {
  try {
    const response = await fetch('http://localhost:3001/api/employee', {
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
        '. ' +
        r.data.first_name +
        ' ' +
        r.data.last_name +
        ' was added to employees list.\n'
    );
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

const updateRole = async (data) => {
  try {
    const response = await fetch(
      `http://localhost:3001/api/employee/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const r = await response.json();
    return console.log('\n Employee role was Update it!\n');
  } catch (error) {
    console.log(
      error,
      'Server returned an error. Please check if server is online'
    );
  }
};

module.exports = { getEmployees, getManagers, addEmployee, updateRole };
