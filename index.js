const github = require("@actions/github");
const core = require("@actions/core");
const axios = require("axios");

try {
    console.log(github.context.payload);
    console.log("\n");
    console.log(github.context.payload.head_commit.message);
    var repoName = github.context.payload.repository.full_name;
    var fullMessage = github.context.payload.head_commit.message;
    var pullNumber = "";
    var i = 20;
    while(fullMessage[i]!== " "){
        pullNumber += fullMessage[i];
        i++;
    }
    console.log("repo name",repoName, "\n");
    console.log("pull number", parseInt(pullNumber), "\n");
    var issuneNumber = fullMessage.split("\n\n")[1];
    issuneNumber = issuneNumber.trim();
    issuneNumber = issuneNumber.substring(1,issuneNumber.length);
    console.log("issue number", parseInt(issuneNumber), "\n");
    axios.default.get(`https://api.github.com/repos/${repoName}/pulls/${pullNumber}`).then((resp) => {
        console.log(resp);
        console.log("user who pushed", resp.head.user.login, "\n");
    })
} catch (e) {
    core.setFailed(e.message);
}