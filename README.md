# Scrum Masters

## Install project

-Clone the project
```bash
git clone https://github.com/SE-GUC/Scrum-Masters.git
```
-Go to the project directory
```bash
cd Scrum-Masters
```

-Install the dependencies
```bash
npm install
```

## Formatting

- We are required to follow the [StandardJS](https://standardjs.com/) library in formatting our code, so please visit their website and read the documentation

- it's now installed in the Project's dependencies

- To Auto format your code run command.

```bash
standard --fix
```

## Nodemon

- To run the app and make node.js restart the server for every change made and saved (Ctrl+S)
```bash
npm run server
```

## Post Requests (Postman)

- When making post request using Postman follow these steps
1. Open Postman
2. Choose POST request from the dropdown list
3. Add the URL you want to send the post request to
4. Naviagte to the fourth option(Body)
5. Choose x-www-form-urlencoded
6. Add the Key(attribute), Value
7. Send the request