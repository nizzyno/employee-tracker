const inquirer = require('inquirer');
const cTable = require('console.table');
const fetch = require('node-fetch');
const {
  getEmployees,
  getManagers,
  addEmployee,
  updateRole,
} = require('./employees');
const { getDepartments, addDepartment } = require('./departments');
const { getRoles, addRole } = require('./roles');
var employeesTable = [];
var roles = [];
var rolesOnly = [];
var departments = [];
var departmentsOnly = [];
var managers = [];
var managersOnly = [];

class App {
  constructor() {
    // prompt for main menu
    this.mainMenuPrompt = [
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'toDo',
        choices: [
          'View All Employees',
          'View All Departments',
          'View All Roles',
          'Create New Department',
          'Create a New Role',
          'Add New Employee',
          'Update Employee Role',
          'Exit',
        ],
      },
    ];

    // prompt for creating a department
    this.addDepartmentPrompt = [
      {
        type: 'input',
        message:
          'Creating a new Department!. Please enter the name of the department you wish to create:',
        name: 'name',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a the new department name!');
            return false;
          }
        },
      },
    ];

    // prompt for creating a new role
    this.addRolePrompt = [
      {
        type: 'input',
        message:
          'Creating a new Role!. Please enter the title of the role you wish to create?',
        name: 'title',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a the new role title!');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: ({ title }) => `Please enter the ${title}'s salary:`,
        name: 'salary',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(({ title }) => `Please enter a the ${title}'s salary!`);
            return false;
          }
        },
      },
      {
        type: 'list',
        message: ({ title }) =>
          `Please select a department to assign to ${title} role:`,
        name: 'department_id',
        choices: departmentsOnly,
      },
    ];

    // prompt for creating a new employee
    this.addEmployeeprompt = [
      {
        type: 'input',
        message:
          'Adding a new Employee!. Please enter the first name of the new Employee:',
        name: 'first_name',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter a the new employee name!');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'Please enter the last name of the new Employee:',
        name: 'last_name',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter the new employee last name!');
            return false;
          }
        },
      },
      {
        type: 'list',
        message: 'Please select a role to assign to this new employee:',
        name: 'role_id',
        choices: rolesOnly,
      },
      {
        type: 'list',
        message: "Please select the new employee's manager:",
        name: 'manager_id',
        choices: managersOnly,
      },
    ];

    // prompt for updating role
    this.updatingRolePrompt = [
      {
        type: 'list',
        message:
          'Please select the employee you wish to update his or her role:',
        name: 'id',
        choices: managersOnly,
      },
      {
        type: 'list',
        message: 'Please select the new role for this employee:',
        name: 'role_id',
        choices: rolesOnly,
      },
    ];
  }

  createDepartment() {
    // prompt user on new department name
    inquirer
      .prompt(this.addDepartmentPrompt)
      .then(async (data) => {
        await addDepartment(data);
        return this.mainMenu();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createNewRole(departmentsOnly) {
    // prompt user for information about new Role
    inquirer
      .prompt(this.addRolePrompt)
      .then(async (data) => {
        // convert department name into the right id in data
        for (let i = 0; i < departments.length; i++) {
          if (departments[i].name === data.department_id) {
            data.department_id = departments[i].id;
            break;
          }
        }
        await addRole(data);
        return this.mainMenu();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewEmployee(rolesOnly, managersOnly) {
    // prompt user for information about the new employee
    inquirer
      .prompt(this.addEmployeeprompt)
      .then(async (data) => {
        // convert role title into role id in data
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].title === data.role_id) {
            data.role_id = roles[i].id;
            break;
          }
        }
        // check if manager was selected or none was selected
        if (data.manager_id === 'none') {
          data.manager_id = 'null';
        } else {
          // convert managers name into employee id in data
          for (let i = 0; i < managers.length; i++) {
            if (managers[i].manager === data.manager_id) {
              data.manager_id = managers[i].id;
              break;
            }
          }
        }
        await addEmployee(data);
        return this.mainMenu();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateEmployeeRole(rolesOnly, managersOnly) {
    // prompt user for what employee to update and new role
    inquirer.prompt(this.updatingRolePrompt).then(async (data) => {
      // convert role title into role id in data
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].title === data.role_id) {
          data.role_id = roles[i].id;
          break;
        }
      }
      // convert employee name into employee id in data
      for (let i = 0; i < managers.length; i++) {
        if (managers[i].manager === data.id) {
          data.id = managers[i].id;
          break;
        }
      }

      await updateRole(data);

      return this.mainMenu();
    });
  }

  mainMenu() {
    // prompt user on what it wants to do
    inquirer
      .prompt(this.mainMenuPrompt)
      .then(async (data) => {
        switch (data.toDo) {
          case 'View All Employees':
            //call for all employees fetch and print data on table
            employeesTable = await getEmployees();
            console.table('\n\nAll Employees', employeesTable);
            console.log('\n');
            return this.mainMenu();
          case 'View All Departments':
            //call for all departments fetch and print data on table
            console.table('\n\nDepartments', await getDepartments());
            console.log('\n');
            return this.mainMenu();
          case 'View All Roles':
            //call for all roles fetch and print data on table
            console.table('\n\nDepartments', await getRoles());
            console.log('\n');
            return this.mainMenu();
          case 'Create New Department':
            //call for create department function
            return this.createDepartment();
          case 'Create a New Role':
            // call for getDepartments to get a list of Departments to select
            departments = await getDepartments();
            // put only the name of the departments on an array for select inquirer
            for (let i = 0; i < departments.length; i++) {
              departmentsOnly[i] = departments[i].name;
            }
            return this.createNewRole(departmentsOnly);
          case 'Add New Employee':
            // call for getRoles to get a list of Roles to select
            roles = await getRoles();
            // put only the title of the roles on an array for select
            for (let i = 0; i < roles.length; i++) {
              rolesOnly[i] = roles[i].title;
            }
            // call to get list of possible managers to select
            managers = await getManagers();
            // put only the manager's name on an array for select
            for (let i = 0; i < managers.length; i++) {
              managersOnly[i] = managers[i].manager;
            }
            managersOnly.unshift('none');
            return this.addNewEmployee(rolesOnly, managersOnly);
          case 'Update Employee Role':
            // call for getRoles to get a list of Roles to select
            roles = await getRoles();
            // put only the title of the roles on an array for select
            for (let i = 0; i < roles.length; i++) {
              rolesOnly[i] = roles[i].title;
            }
            // call to get list of possible managers to select
            managers = await getManagers();
            // put only the manager's name on an array for select
            for (let i = 0; i < managers.length; i++) {
              managersOnly[i] = managers[i].manager;
            }
            return this.updateEmployeeRole(rolesOnly, managersOnly);
          case 'Exit':
            return this.exitMessage();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Exit Message
  exitMessage() {
    console.log(`Thank you for using the Employee Tracker!`);
    return;
  }

  // Start Applocation function
  start() {
    console.log(`Welcome to the Employee Tracker!`);
    this.mainMenu();
  }
}

module.exports = App;
