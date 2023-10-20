# Polly Troubleshooting Guide

This document provides solutions to common issues and troubleshooting tips for the Polly GitHub repository. If you encounter a problem not covered here, feel free to open an issue on the repository or seek help on our [community forum](link-to-forum).

## Table of Contents

- [Polly Troubleshooting Guide](#polly-troubleshooting-guide)
  - [Table of Contents](#table-of-contents)
  - [1. Installation Issues](#1-installation-issues)
    - [Problem 1: Unable to Clone the Repository](#problem-1-unable-to-clone-the-repository)
    - [Problem 2: Dependency Installation Fails](#problem-2-dependency-installation-fails)
  - [2. Configuration Problems](#2-configuration-problems)
    - [Problem 3: Environment Variables Setup](#problem-3-environment-variables-setup)
  - [3. Usage and Functionality Issues](#3-usage-and-functionality-issues)
    - [Problem 5: Feature X Doesn't Work as Expected](#problem-5-feature-x-doesnt-work-as-expected)
    - [Problem 6: Error Messages](#problem-6-error-messages)

## 1. Installation Issues

### Problem 1: Unable to Clone the Repository

- **Symptoms:** You're unable to clone the repository using Git.
- **Solution:** The command to clone the repository is `git clone https://github.com/KabirSinghBhatia/polly` Ensure that you have the necessary permissions to access the repository, and double-check the repository URL. If it's a private repository, make sure you've set up SSH keys or personal access tokens correctly.

### Problem 2: Dependency Installation Fails

- **Symptoms:** You encounter errors when trying to install project dependencies.
- **Solution:** Verify that you have the required development tools and libraries installed. Check the project's README for specific instructions regarding dependencies and follow them closely. You must have npm version 12-16 installed. In order to ensure that the required dependencies are installed. `package.json` needs to be updated for both backend and frontend using command `npm i`

## 2. Configuration Problems

### Problem 3: Environment Variables Setup

- **Symptoms:** The application doesn't work because environment variables aren't set.
- **Solution:** Review the project documentation to identify the required environment variables. Ensure they are correctly set in your environment or in a `.env` file if specified. The application uses Postgres SQl as preferred database. You need to provide proper DATABASE_URL of the format `DATABASE_URL: "postgres://postgres:1235813@localhost:5432/mydatabase"`

## 3. Usage and Functionality Issues

### Problem 5: Feature X Doesn't Work as Expected

- **Symptoms:** A specific feature of the application doesn't behave as described in the documentation.
- **Solution:** First, make sure you're using the correct input and following the usage instructions. Check if the issue is already reported in the project's issues section. If not, consider opening a new issue.

### Problem 6: Error Messages

- **Symptoms:** You encounter error message `ERR_OSSL_EVP_UNSUPPORTED`.(For linux and mac users)
- **Solution:** You have to run the ssl legacy version i.e 1.1.1 in order to the run the software. One workaround to this is to add`--openssl-legacy-provider` tag while running - `NODE_OPTIONS=--openssl-legacy-provider npm run start`. Another possible option is to update `package.json` on `polly/frontend/`. Add `"start": "react-scripts --openssl-legacy-provider start", "build": "react-scripts --openssl-legacy-provider build"`.
