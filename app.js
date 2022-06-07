const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { exit } = require("process");
const employees = [];

function startApp () {
  inquirer.prompt([
    {
      type: "list",
      name:"options",
      message: "What kind of employee do you want to add?",
      choices:["Manager","Engineer","Intern", "Close Program"]
    }
  ]) 
  .then(response => {
    switch (response.options) {
      case "Manager": 
        addManager();
        break;
      case "Engineer":
        addEngineer();
        break;
      case "Intern":
        addIntern();
        break;
      default:
        renderHTML();
        // exit();
    }
  })
}

function addManager () {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the employees name?",
      name:"employeeName",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a name!");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is this employees ID number?",
      name:"employeeId",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter an ID!");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is this employees email address:",
      name:"employeeEmail",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter an email!");
          return false;
        }
      },
    },
    {
      type: "input",
      message: "What is this employees manager office number:",
      name:"employeeOfficeNumber",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter an office number!");
          return false;
        }
      },
    }
  ])
  .then(response => {
    let newManager = new Manager(response.employeeName, response.employeeId, response.employeeEmail, response.employeeOfficeNumber);
    console.log(newManager);
    employees.push(newManager);
    startApp();
  })
}

function addEngineer () {
  inquirer.prompt([
    {
        type: "input",
        message: "What is the employees name?",
        name:"employeeName",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name!");
            return false;
          }
        },
    },
    {
        type: "input",
        message: "What is this employees ID number?",
        name:"employeeId",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an ID!");
            return false;
          }
        },
    },
    {
        type: "input",
        message: "What is this employees email address?",
        name:"employeeEmail",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
    },
    {
      type: "input",
      message: "What is this employees github username?",
      name:"employeeGithub",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a username!");
          return false;
        }
      },
    }
  ])
  .then(response => {
    let newEngineer = new Engineer(response.employeeName, response.employeeId, response.employeeEmail, response.employeeGithub);
    console.log(newEngineer);
    employees.push(newEngineer);
    startApp();
  })
}

function addIntern () {
  inquirer.prompt([
    {
        type: "input",
        message: "What is the employees name?",
        name:"employeeName",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter a name!");
            return false;
          }
        },
    },
    {
        type: "input",
        message: "What is this employees ID number?",
        name:"employeeId",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an ID!");
            return false;
          }
        },
    },
    {
        type: "input",
        message: "What is this employees email address?",
        name:"employeeEmail",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log("Please enter an email!");
            return false;
          }
        },
    },
    {
      type: "input",
      message: "What school does this Employee attend?",
      name:"employeeSchool",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log("Please enter a school!");
          return false;
        }
      },
    }
  ])
  .then(response => {
    let newIntern = new Intern
    (response.employeeName, response.employeeId, response.employeeEmail, response.employeeSchool);
    console.log(newIntern);
    employees.push(newIntern);
    startApp();
  })
}

async function  renderHTML () {
  let data = await render(employees);
//   console.log(data,"final HTML");
  fs.writeFile("./output/team.html", data, ()=> {
      console.log("file created!");
      exit();
  })
}

startApp();



// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```