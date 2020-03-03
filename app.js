const Manager = require('./Develop/lib/Manager');
const Engineer = require('./Develop/lib/Engineer');
const Intern = require('./Develop/lib/Intern');
const inquirer = require('inquirer');
const path = require('path');

const fs = require('fs-extra');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./Develop/lib/htmlRenderer');

let teamMembers = [];

function teambuilder() {
    inquirer.prompt([{
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "teamMember",
        choices: [
            "manager",
            "intern",
            "engineer"
        ]
    }])

        .then(function (answers) {
            if (answers.teamMember === "manager") {
                manager();
            } else if (answers.teamMember === "intern") {
                intern();
            } else if (answers.teamMember === "engineer") {
                engineer();
            }
        })
}
teambuilder();

function manager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is the manager's id?",
            name: "managerId",
        },
        {
            type: "input",
            message: "What is the manager's email?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice",
        },
        {
            type: "list",
            message: "Would you like to add an additional member?",
            name: "addMember",
            choices: ["yes",
                "no"]
        }
    ])
        .then(function (answers) {
            const newMember = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice)
            teamMembers.push(newMember)
            if (answers.addMember === "yes") {
                teambuilder();
            } else {
                renderTeam();
            }
        })
}

function intern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "internName",
        },
        {
            type: "input",
            message: "What is the intern's id?",
            name: "internId",
        },
        {
            type: "input",
            message: "what is the intern's email?",
            name: "internEmail",
        },
        {
            type: "input",
            message: "What school does the intern attend?",
            name: "school",
        },
        {
            type: "list",
            message: "Would you like to add an additional member?",
            name: "addMember",
            choices: ["yes",
                "no"]
        }
    ])
        .then(function (answers) {
            const newMember = new Intern(answers.internName, answers.internId, answers.internEmail, answers.school)
            teamMembers.push(newMember)
            if (answers.addMember === "yes") {
                teambuilder();
            } else {
                renderTeam();
            }
        })
}

function engineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "engineerName",
        },
        {
            type: "input",
            message: "What is the engineer's id?",
            name: "engineerId",
        },
        {
            type: "input",
            message: "what is the engineer's email?",
            name: "engineerEmail",
        },
        {
            type: "input",
            message: "What is the engineer's Github username?",
            name: "github",
        },
        {
            type: "list",
            message: "Would you like to add addition member?",
            name: "addMembers",
            choices: ["yes",
                "no"]
        }
    ])
        .then(function (answers) {
            const newMember = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github)
            teamMembers.push(newMember)
            if (answers.addMember === "yes") {
                teambuilder();
            } else {
                teamMembers.push(answers)
                renderTeam();
            };
        });
}

const renderTeam = () => {
    fs.writeFile(outputPath, render(teamMembers), "utf8", err => {
        if (err) throw err
    });
};
