// import packages
const fs = require('fs'); // fs to read and write external files
const inquirer = require('inquirer'); // inquirer to provide console-based prompts for the user
const generateMarkdown = require('./src/generateMarkdown.js') // import our custom package that generates a markdown based on data fed to it
const licenseData = require('./lib/licenseDatabase.json').licenseInfo; // import our custom json with its licenseInfo field to use in one of our prompts

// array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Please enter the title of the README file: '
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please enter the description of your project: '
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Please enter the installation instructions for your software: '
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Plase enter the use-cases of your software: '
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Please enter the projects guidelines for contribution: '
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Please enter any test results: '
    },
    {
        type: 'input',
        name: 'user',
        message: 'Please enter your github username: '
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please Enter your email: '
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please select from one of the following licenses: ',
        choices: licenseData,
    },
];

// function that writes our file after the data has been generated
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => { // write the file
        if (err) throw err; // if error is detected display it on the console
        console.log('README has been generated in \'README.md\' file'); // confirmation statement that shows up in the console if no error is detected
    })
}

// function that initlializes the app
function init() {
    inquirer
        .prompt(questions) // prompt the user our array of questions
        .then(readmeData => generateMarkdown(readmeData)/*console.log(readmeData)*/) // feed that data to our generateMarkdown function imported from our generatemarkdown package
        .then(markdownData => writeToFile('./dist/README.md', markdownData)/*console.log(markdownData)*/) // write the returned markdown to a README.md file
}

// initialize the app
init();
