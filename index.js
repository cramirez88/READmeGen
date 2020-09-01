const generateMarkdown=require("./utils/generateMarkdown")
const inquirer= require("inquirer")
const axios= require("axios")
const fs=require("fs")
// array of questions for user
const questions = [
{
    type: "input", 
    message: "What is the title?",
    name: "title"

},
{
    type: "input",
    message: "what is the description?",
    name: "description"
},
{
    type: "input",
    message: "What installation do you prefer?",
    name: "installation"
},
{
    type: "input",
    message: "What is the usage?",
    name: "usage"
},
{
    type: "input",
    message: "what credits?",
    name: "credits"
},
{
    type: "list",
    message: "please select the license",
    name: "license",
    choices: ["MIT", "GPLv3", "AGPL"]
},
{
    type: "input",
    message: "what is the contribution?",
    name: "contributing"
},
{
    type: "input",
    message: "what are the tests?",
    name: "tests"
},
{
    type: "input",
    message: "what is your github username?",
    name: "username"
},
{
    type: "input",
    message: "what is your email?",
    name: "email"
}

];

// function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName,data,function(){
        console.log("Success")
    })
}

// function to initialize program
function init() {
inquirer.prompt(questions).then(function(data){
   axios.get("https://api.github.com/users/"+data.username).then(function(response){
     data.githubrepo=response.data.html_url   
   const READMEcontent=generateMarkdown(data)
   writeToFile("./README.md", READMEcontent )
   })
})
}

// function call to initialize program
init();
