# Cool-Credentials

Capstone project for my full-stack development course. Uses back and front end to allow users to login, and register with a fictional company and handle
the credentials of the company, such as updating and adding.

Front is handled by React. Back is handled by node.js with express, as well as using MongoDB for storage, and mongoose for handling MongoDB within Node.

INSTRUCTIONS FOR USE
Open terminal at project folder and type npm start.
Open another terminal at project folder and then enter 'cd front'.
Enter NPM start.

Open a tab in your browser and go to 'localhost:3000/'. Click the 'register' page. Use these credentials: username: 'bwaddy', password: '11223344'.
After submitting these details you should be provided a JWT token. Save this somewhere. Click the home button.
Now login with your JWT. Click the login button and copy your JWT into your textbox.
After hitting submit you should be given the option to go to a credentials page.
At this credentials page you can see all credentials that are in the same division as the credential of the user you just used.
You are then given the option to update these credentials, add new ones in, and update user's details (such as assign or dessign them from devisions,
and change their role).
