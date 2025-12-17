
# A Different Kind of Argentine Travel Guide
Overview

This project is a Vue.js application for travelers to Argentina, featuring a currency converter and travel resources. As a Code:You Capstone project, it utilizes lessons learned about HTML, CSS, JavaScript, and other web development topics.

Project Overview

This project aims to provide travelers with a more thoughtful way to explore Argentina. While many travel resources focus on well-known destinations, this project highlights places and experiences that are just off the beaten path. The goal is to help travelers discover unique ideas that make each trip to Argentina more memorable and authentic.


## Capstone Requirements Fullfilled

- A node.js web server using Express.js
- Developed using Vue
- Data that persists in the users local storage and accessible after reload/refresh.
- Data visualization using Chart.js
- Use of an API (that is not the weather)



## Run Locally

Prerequisites

Ensure you have the following installed on your computer:
*   **Node.js** (Version 20 or higher is recommended).
*   **Git** (for cloning the repository).

## Installation

1.  **Clone the Repository**

    Open your terminal or command prompt and run the following command:

    ```sh
    git clone <YOUR_GITHUB_REPOSITORY_URL>
    cd argentina-travel-guide
    ```

2.  **Install Dependencies**

    This project is structured with a root directory and a subdirectory (`argentina-travel-guide-main`) containing the Vue application.

    First, install root dependencies:
    ```sh
    npm install
    ```

    Then, navigate to the application folder and install its dependencies:
    ```sh
    cd argentina-travel-guide-main
    npm install
    ```

3.  **Configure Environment Variables**

    The application uses an API for currency conversion.
    You can get your own API key at [https://app.exchangerate-api.com/](https://app.exchangerate-api.com/). Create a free account with username and password. 

    1.  Inside the `argentina-travel-guide-main` folder, create a new file named `.env`.
    2.  Add your API key to this file (refer to `.env.example` if available):
        ```properties
        VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
        ```
    3.  Return to the root directory:
        ```sh
        cd ..
        ```

## Running the Application

**Option A: Run Frontend Only**

To start the Vue.js frontend (usually at `http://localhost:5173`):
```sh
npm run dev
```

**Option B: Run Full Stack (Frontend + Backend)**

If the project requires the backend server to be running simultaneously:
```sh
npm run dev:all
```

## Build for Production

To build the application for production:
```sh
npm run build
```
## Appendix


AI was used to during the planning and learning stages of this project. ChatGPT and Google Gemini were employed to created a step by step process in how to stand up the app and learn to use Vue as tool in this project. AI was also employed to help this author understand new topics, and maintain control of the directory and files list. As the file list got longer, it became overwhelming to the neurospicy mind that created this app. 
