# Test Rust API with Frontend App

## Table of Contents
1. [Requirements](#requirements)
2. [Installation and Setup](#installation-and-setup)
3. [Add Environment Variables](#add-environment-variables)
4. [Running the App](#running-the-app)

## Requirements
- **Node.js**: Version 14.x or higher
- **npm**: Included with Node.js
- **Git**: For cloning the repository

## Installation and Setup

To get started with the Vite app on your local machine, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/elitecoderdev/test-frontend.git
   ```

2. **Navigate to the Project Directory**:
   Change into the project directory.
   ```bash
   cd test-frontend
   ```

3. **Install Dependencies**:
   Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

4. **Start the API Server In Another Terminal**:
   First, checkout the [API Setup](https://github.com/elitecoderdev/test-rust-backend) repo.

  ```bash
  cargo run
  ```

## Add Environment Variables
1. Create a `.env.local` file in the root directory of the project.
2. Add the required environment variables to the `.env.local` file, such as `VITE_APP_API_URL` for the API endpoint.
3. pass the value of the API endpoint `http://localhost:8000` in the `VITE_APP_API_URL` variable in the `.env.local` file.   

## Running the App

Once the installation is complete, you can start the application by running:

```bash
npm run dev
```