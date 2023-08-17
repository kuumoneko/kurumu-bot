const { spawn } = require('child_process');

async function Getresponse(mess, mode) {
    return new Promise((resolve, reject) => {
        // Create a new child process that runs the Python file
        var check = "python " + " -c " + ` "from commands.AI import chatbot; chatbot.check('${mess}' ,  '${mode}')"`;

        console.log(check)

        const pythonProcess = spawn("python",
            ["-c", `from commands.AI import chatbot; chatbot.check("${mess}", "${mode}")`]);
        // Initialize an empty string to store the output
        let output = "";
        // Listen for data from the standard output stream
        pythonProcess.stdout.on("data", (data) => {
            // Append the data to the output string
            output += data;
        });
        // Listen for errors from the standard error stream
        pythonProcess.stderr.on("error", (error) => {
            // Reject the promise with the error
            reject(error);
        });
        // Listen for the close event
        pythonProcess.on("close", (code) => {
            // Resolve the promise with the output
            resolve(output);
        });
    });
}


module.exports = {
    Getresponse : Getresponse,
}