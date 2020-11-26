const github = require("@actions/github");
const core = require("@actions/core");

try {
    console.log(github.context.payload);
    console.log("\n\n\n");
    console.log(process.env.GITHUB_REF);
} catch (e) {
    core.setFailed(e.message);
}