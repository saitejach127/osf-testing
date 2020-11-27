const github = require("@actions/github");
const core = require("@actions/core");

try {
    console.log(github.context.payload);
    console.log("\n");
    console.log(github.context.payload.head_commit.message);
} catch (e) {
    core.setFailed(e.message);
}