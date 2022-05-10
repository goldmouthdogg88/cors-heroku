# Getting Started on Heroku with Node.js

```mermaid
graph TD;
    https://www.google.com-->B;
    A-->C;
    B-->D;
    C-->D;
```

### Setup

download the 64-bit installer

heroku login

node --version
npm --version
git --version

### prepare the app

git clone https://github.com/heroku/node-js-getting-started.git
cd node-js-getting-started

### deploy the app

heroku create
git push heroku main

heroku ps:scale web=1
heroku open

heroku logs --tail

Use a Procfile, a text file in the root directory of your application, to explicitly declare what command should be executed to start your app.

web: npm start

This declares a single process type, web, and the command needed to run it. The name web is important here. It declares that this process type will be attached to the HTTP routing stack of Heroku, and receive web traffic when deployed. This command will use the start script that is specified in the package.json.

Check how many dynos are running using the ps command

heroku ps

By default, your app is deployed on a free dyno. Free dynos will sleep after a half hour of inactivity (if they don’t receive any traffic). This causes a delay of a few seconds for the first request upon waking.

Scaling an application on Heroku is equivalent to changing the number of dynos that are running. Scale the number of web dynos to zero:

heroku ps:scale web=0

Access the app again by hitting refresh on the web tab, or heroku open to open it in a web tab. You will get an error message because you no longer have any web dynos available to serve requests.

Scale it up again:

heroku ps:scale web=1

Run this command in your local directory to install the dependencies, preparing your system for running the app locally:

npm install

When an app is deployed, Heroku reads the package.json to install the appropriate node version and the package-lock.json to install the dependencies.

### Run the app locally

heroku local web

Just like Heroku, heroku local examines the Procfile to determine what to run.

Open http://localhost:5000 with your web browser. You should see your app running locally.

To stop the app from running locally, in the CLI, press Ctrl+C to exit.

### Push local changes

In this step you’ll learn how to propagate a local change to the application through to Heroku. As an example, you’ll modify the application to add an additional dependency and the code to use it.

Begin by adding a dependency for cool-ascii-faces in package.json. Run the following command to do this:

npm install cool-ascii-faces

Modify index.js so that it requires this module at the start. Also add a new route (/cool) that uses it. Your final code should look like this:

npm install
heroku local

Visiting your application at http://localhost:5000/cool, you should see cute faces displayed on each refresh: ( ⚆ \_ ⚆ ).

git add .

git commit -m "Add cool face API"

git push heroku main

heroku open cool

Provision add-ons
Add-ons are third-party cloud services that provide out-of-the-box additional services for your application, from persistence through logging to monitoring and more.

By default, Heroku stores 1500 lines of logs from your application. However, it makes the full log stream available as a service - and several add-on providers have written logging services that provide things such as log persistence, search, and email and SMS alerts.

In this step you will provision one of these logging add-ons, Papertrail.

Provision the papertrail logging add-on:

heroku addons:create papertrail

heroku addons

heroku addons:open papertrail

Your browser will open up a Papertrail web console, showing the latest log events. The interface lets you search and set up alerts:

Start a console
To get a real feel for how dynos work, you can create another one-off dyno and run the bash command, which opens up a shell on that dyno. You can then execute commands there. Each dyno has its own ephemeral filespace, populated with your app and its dependencies - once the command completes (in this case, bash), the dyno is removed.

heroku run bash
Running `bash` attached to terminal... up, run.3052
~ $ ls
Procfile README.md package.json package-lock.json src tests
~ $ exit
exit

If you receive an error, Error connecting to process, then you may need to configure your firewall.

Define config vars
Heroku lets you externalize configuration - storing data such as encryption keys or external resource addresses in config vars.

At runtime, config vars are exposed as environment variables to the application. For example, modify index.js so that it introduces a new route, /times, that repeats an action depending on the value of the TIMES environment variable. Under the existing get() call, add another:

.get('/times', (req, res) => res.send(showTimes()))
At the end of the file, add the following definition for the new function, showTimes():

showTimes = () => {
let result = '';
const times = process.env.TIMES || 5;
for (i = 0; i < times; i++) {
result += i + ' ';
}
return result;
}
heroku local will automatically set up the environment based on the contents of the .env file in your local directory. In the top-level directory of your project, there is already a .env file that has the following contents:

TIMES=2
If you run the app with heroku local, you’ll see two numbers will be generated every time.

To set the config var on Heroku, execute the following:

heroku config:set TIMES=2
View the config vars that are set using heroku config:

heroku config
== sharp-rain-871 Config Vars
PAPERTRAIL_API_TOKEN: erdKhPeeeehIcdfY7ne
TIMES: 2
Deploy your changed application to Heroku and then visit it by running heroku open times.
