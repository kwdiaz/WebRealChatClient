
# Real-Time Chat Application - Client

## Overview

This project is the client-side of a real-time chat application built using React, Tailwind CSS, Axios, and SignalR. It connects to a backend developed with ASP.NET Core to provide a dynamic and interactive chat experience. The application allows users to register, log in, and communicate with others in real-time while ensuring a responsive and visually appealing user interface.

## Features

- **User Authentication**: Register and log in using a secure authentication process with JWT tokens.
- **Real-Time Messaging**: Send and receive messages instantly using SignalR for real-time updates.
- **Responsive Design**: Built with Tailwind CSS to ensure the application works seamlessly on desktops, tablets, and mobile devices.
- **User Management**: Display online users and support multi-user conversations.
- **Persisted Messaging**: Messages are persisted through the backend's SQL Server database.

## Technologies Used

- **React**: Framework used for building the user interface.
- **Tailwind CSS**: For styling the application with a utility-first approach.
- **Axios**: Used for making HTTP requests to the backend API.
- **SignalR Client**: Allows real-time updates for messaging functionality.
- **ASP.NET Core**: Backend API (referenced separately).
- **SQL Server**: Data storage for user information and messages.

## Installation

### Prerequisites

- **Node.js** (v14 or later)
- Backend API running (ASP.NET Core project)

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kwdiaz/WebRealTimeChatClient.git
   cd webrealtimechatclient
   ```

2. **Set Up and Run the Backend**:
   - Make sure the `WebRealChatAPI` project is set up and running.
   - Follow the instructions in the backend repository for installation and configuration.

3. **Initialize the Frontend Application**:
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
   - The application will be available at [http://localhost:3000](http://localhost:3000).

## Usage

- **Register a New User**: Use the registration form to create a new account.
- **Log In**: Use the login form to authenticate and start using the chat features.
- **Chat in Real-Time**: Send messages to other users and see their messages instantly in the chat window.
- **View Online Users**: See a list of users currently online in real-time.

## Deployment

The client-side application has been deployed to Azure along with the backend API. You can access the deployed version at the following link:

[Live Deployment of Real-Time Chat Application](https://web-real-chat-f5bpc5g8g0f0bhed.canadacentral-01.azurewebsites.net/)

This deployment ensures that the application is accessible globally, offering a seamless chat experience.

## Key Design Decisions

### Clean Architecture (Backend Focus)

The front-end was developed with clean architecture principles, with a focus on keeping the backend and business logic separated from the presentation layer. The client-side application consumes data from a well-structured backend API, maintaining a clean separation of concerns.

### UI Design

The use of Tailwind CSS allowed us to quickly prototype and develop a consistent and responsive user interface. The utility classes provided by Tailwind made styling easier and ensured uniformity across different components.

### Real-Time Updates

SignalR was integrated to allow real-time updates to the user interface whenever new messages are sent or received. This ensures that users always see the most current information without having to refresh the page manually.

## Assistance from ChatGPT

ChatGPT was used during the development process for:

- **Integration Help**: SignalR integration guidance and real-time debugging.
- **Error Resolution**: Assistance in resolving issues during the integration of Axios requests and WebSocket connections.
- **Azure Deployment**: Guidance on configuring the application for deployment to Azure, including the setup required for both client and server.

For additional Azure deployment information, the [Netcode-Hub - Deploying to Azure video](https://www.youtube.com/watch?v=-wtRY2IepGE&ab_channel=Netcode-Hub) was also referenced.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
