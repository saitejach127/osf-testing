const github = require("@actions/github");
const core = require("@actions/core");
const axios = require("axios");

try {
    var repoName = github.context.payload.repository.full_name;
    var fullMessage = github.context.payload.head_commit.message;
    var pullNumber = "";
    var i = 20;
    while(fullMessage[i]!== " "){
        pullNumber += fullMessage[i];
        i++;
    }
    var issueNumber = fullMessage.split("\n\n")[1];
    issueNumber = issueNumber.trim();
    issueNumber = issueNumber.substring(1,issueNumber.length);
    issueNumber = parseInt(issueNumber);
    axios.default.get(`https://api.github.com/repos/${repoName}/pulls/${pullNumber}`).then((resp) => {
        var userPushed = resp.data.head.user.login;
        axios.default.post("https://leaderboardserver.herokuapp.com/getissue", {
            "repoName" : repoName,
            issueNumber : issueNumber
        }).then((resp) => {
            var points = resp.data.points;
            axios.default.post("https://leaderboardserver.herokuapp.com/score", {
                username : userPushed,
                repoName : repoName,
                points : points
            }).then((resp) => {
                console.log(resp.data);
            })
        })
    })

} catch (e) {
    core.setFailed(e.message);
}