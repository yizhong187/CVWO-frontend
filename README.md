# Setup Guide for CVWO ForumApp Frontend

## Introduction

Welcome to the setup guide for ForumApp, a web application built using ViteJS, React, and MUI (Material-UI). This document will guide you through the process of setting up the application on your local server.

## Prerequisites

Before you begin, ensure you have Node.js installed on your system. You can download it from [Node.js official website](https://nodejs.org/).

## Installation

1. **Clone the Repository**  
   Clone the repository to your local machine using the following command:

   ```bash
   git clone https://github.com/yizhong187/CVWO-frontend.git
   cd CVWO-frontend
   ```

2. **Install Dependencies**  
   Inside the project directory, run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **API Base URLs**  
   Set up API_BASE_URL in the `services/api.ts` file. By default, assuming that you are setting this up with the ForumApp backend from https://github.com/yizhong187/CVWO, it will be using http://localhost:8080/v2.

## Running the Application

To start the application in development mode, run:

```bash
npm run dev
```

Upon running `npm run dev`, vite will provide the local address where the application is hosted. By deafult, it will be http://localhost:5173/. Open your web browser and visit the link to view the application.

## Screenshots and User Perspectives

In the `screenshots` directory, you'll find screenshots and explanations of all the pages from the perspectives of different users (guest, normal user, superuser). It's recommended to view these for a better understanding of the application's functionality and user interface.

## Troubleshooting

Encounter an issue? Check out these common problems and solutions:

- **Dependency Installation Issues**: Ensure Node.js is up-to-date. Run `npm cache clean --force` and then `npm install`. Check for any specific dependency errors in the terminal and address them as instructed.
- **`Subforum retrival error: An error occurred`**: Verify that the backend application is running and on the right port.
- Note that most of the components that require the fetching or posting of data will log the API response in the console.

For more help, please open an issue on the [GitHub issues page](https://github.com/yizhong187/CVWO-frontend/issues).
