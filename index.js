const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const employeeArray = [];
 
const questionsManager = [
    "Enter Manager Name: ",
    "Enter Manager ID: ",
    "Enter Manager Email: ",
    "Enter Manager Office Number: "
];

const questionsEngineer = [
    "Enter Engineer Name: ",
    "Enter Engineer ID: ",
    "Enter Engineer Email: ",
    "Enter Engineer GitHub Username: "
];

const questionsIntern = [
    "Enter Intern Name: ",
    "Enter Intern ID: ",
    "Enter Intern Email: ",
    "Enter Intern School: ",
]

// function to write file
function writeToFile(data) {
    fs.writeFile(outputPath, data, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
          console.log("The written has the following contents:");
          console.log(fs.readFileSync(fileName, "utf8"));
        }
      });
}

function generateQuestions(questions) {
    return [
        {
            type: 'input',
            message: questions[0],
            name: 'title',
        },
        {
            type: 'input',
            message: questions[1],
            name: 'id',
        },
        {
            type: 'input',
            message: questions[2],
            name: 'email',
        },
        {
            type: 'input',
            message: questions[3],
            name: 'plus',
        }
    ]
}

function giveOptions() {
    inquirer.prompt([
        {
            type: 'list',
            message: "Please choose how to continue: ",
            name: 'choise',
            choices:[
                "Add an engineer",
                "Add an intern",
                "Finish building the team"
            ]
        }
    ]).then(answer => nextStep(answer.choise));
}

function nextStep(choise) {
    switch (choise) {
        case "Add an engineer":
            inquirer.prompt(generateQuestions(questionsEngineer)).then(answers => {
                employeeArray.push(
                    new Engineer(answers.name, answers.id, answers.email, answers.plus));
                giveOptions();
            });
            break;
        case "Add an intern":
            inquirer.prompt(generateQuestions(questionsIntern)).then(answers => {
                employeeArray.push(
                    new Intern(answers.name, answers.id, answers.email, answers.plus));
                giveOptions();
            });
            break;
        case "Finish building the team":
            console.log("Have a nice day");
            writeToFile(render(employeeArray));
            break; 
    }
}

function init() {

    inquirer.prompt(generateQuestions(questionsManager)).then(answers => {
        employeeArray.push(
            new Manager(answers.name, answers.id, answers.email, answers.plus));
        giveOptions();
    });

}

init();


