	#System architecture

	-	 I will be planning to use the Full MERN(MongoDB, Express, React and Node) stack to develop my application. I am choosing to use
 		 this web stack because it is something I am very comfortable with working with and understand well. It is also widely used and very
 		 easy to work with and understand for other developers if they wish to work on the code aswell. Javascript is the main language used to develop a MERN full stack app and this makes it easier to integrate with other 				 frameworks for both the frontend and backend. 

	-	This App will be deployed using Heroku. I am using Heroku because it offers a free service for a certain number of aplications deployed
		on their service and is very easy to use when wanting to deploy any application.

	-	 I will be using Create React App to create the frontend of my application

	- 	I will be using React Bootstrap and my own custom css to style my web application to make it as user friendly as possible and to make it stand out.
  		I am using these methods of styling because react bootstrap has a great multitude of predefined structures such as forms, tables and tabs which all look
 		extremely proffesional and are easy for the user to use. I will also be using my own custom css files to make it more unique than just using the components
		from react bootstrap.

	#System Requirements

	-	My application will open up with its home page which will ask the user to login.Since this is an event planner website they will be able to view all the events even
		if they are not logged in. They will be greeted with the table which will be displaying The events that have been set out. If they are an admin user they will be able to edit, delete and
		add events to the table. If they are only normal user without admin permissions they will only be able to view these events. They will not see any of the admin functionality

	-	Users who are looking for social events to go to in the near or distant future will use my application as well as the people who are organizing these events
		and wish to advertise them on the website. These users will benefit from my application because it is 100% free even for the event organizers and it will allow for 
		people to plan their social events and allow for the organizers to advertise.


	#User Stories

	-	User story 1: I would like to be able to view the events without having to log in to the website
	-	User story 2: as an organizer I would like for information I put on the site to be easy to read
	-	User story 3: as an organizer I would like for my company’s name to be displayed with the rest of the information for the event I set Up
	-	User story4: As a user I would like to know the age restriction for the events so that I can know whether or not my children can watch the event as well.
	-	User story 5: As an organizer I would like to be able to delete my events and edit the information of my events for when they have completed or information has changed regarding them

	#Functional Requirements

	-	Login/signUp the user: The web application must allow for a user to be able to sign up or  log in to the application with different functionality being allowed due to the users permissions once logged in or signed up. 
		Once a new user sign’s up they will also immediately be logged in without the user doing anything else.
	-	Create an event: Users with admin permission will be able to create events for the general public to see. 
	-	Editing off event: If a user has admin permission’s they user will be able to edit the events
	-	Deleting of events:  If a user has admin acccess they will be able to delete events

	#Non-Functional Requirements

	-	Usability: The UI is going to be designed around a browsers dark theme because the use of dark mode is becoming more popular. The buttons will be bright colours so that the users can easily see the functionality of each 		button
	-	Reliability: There will be plenty of measures to combat incorrect processing and incorrect user inputs so that the whole application does not crash due to a misinput.
	-	Security: The application will make use of JWT when authenticating it’s users to protect their log in credentials

	#Explenation on how to use App
	-		When the user launches the app on their browser they will be greeted with the events that have already been planned. They are able to log in or signup. If they are an organizer the table will slightly change, 			giving them the ability to edit, delete and add events by clicking certain buttons, otherwise if they are just a normal user they can only browse the events. 

	#How to install
	-	Install all of the files onto your local device
	- 	open the folder in an IDE such as VS code
	- 	open up your terminal and immediatly type npm i
	- 	cd into the backend folder and do the same
	- 	cd into the frontend folder and do the same
	- 	While the node modules and dependencies are busy installing, go to the .env file.
		You will see a string labeled MONGO_URI and in the string you will notice <username> and <password>
   		these are your MongoDB credentials that you need to replace using your own information.
	- 	Once you have made those changes and everything is installed, cd into the backend folder and type: npm run dev
  	  	that will start up the backend side of the application
	- 	then cd into frontend and type: npm start
	- 	congratulations the application will now start up in your browser




