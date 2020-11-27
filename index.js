const github = require("@actions/github");
const core = require("@actions/core");

try {
    console.log(github.context.payload);
    console.log("\n\n\n");
    github.context.payload.commits.forEach((commit) => {
        console.log(commit.author, "         ", commit.committer);
    })
} catch (e) {
    core.setFailed(e.message);
}