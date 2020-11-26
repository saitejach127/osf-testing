const github = require("@actions/github");
const core = require("@actions/core");

try {
    console.log(github.ccontext.payload);
} catch (e) {
    core.setFailed(e.message);
}