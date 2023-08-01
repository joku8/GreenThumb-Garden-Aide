# GreenThumb Garden Assistant

GreenThumb Garden Assistant is a React-based web application built with Material-UI (MUI) that is designed to assist gardeners in managing their gardens effectively. It offers a range of features to help you stay organized and make the most of your gardening journey.

## Table of Contents

📙 [Features](#features)

- [Seed Storage](#seed-storage)
- [Harvest Tracker](#harvest-tracker)
- [Garden Calendar](#garden-calendar)
- [Task Manager](#task-manager)

🌉 [Architecture](#architecture)

- [Tech Stack](#tech-stack)
- [File System](#file-system)

💾 [Installations](#installation)

✈️ [Deployment](#deployment)

## Features

### Seed Storage

The Seed Storage feature allows you to keep track of your seed inventory. You can record details about each seed packet, such as the type of plant, variety, quantity, and any additional notes. This way, you can easily search and reference your seed collection, preventing duplicate purchases and ensuring you have a tidy record of all available seeds.

### Harvest Tracker

With the Harvest Tracker, you can monitor and record all the produce that comes out of your garden during the growing season. This feature enables you to track the quantity and value of your harvests, giving you insights into the productivity of your garden. It's a useful tool for evaluating the cost-effectiveness of growing your own food.

### Gardening Calendar

The Gardening Calendar feature helps you plan and manage your gardening activities throughout the year. You can visualize the sowing, transplant, growing, and harvest periods for all of your crops, allowing you to plan succession plantings and optimize your garden's productivity.

### Task Manager

The Task Manager feature allows you to set tasks and reminders for yourself. You can create to-do lists and assign specific tasks to different dates. The app sends text notifications to your phone as reminders, ensuring you stay on top of your gardening tasks and never forget an important activity.

## Architecture

There are five main components of the application, each with their own features. These are the Header, Seed Storage, Harvest Tracker, Calendar, and Task Manager.

The may be updated with additional functionalities in the future.

### Tech Stack

This project was created with the use of React and Material-UI

### File System

One key feature of the application is the ability to save its state to the file system. By doing so, users can save and upload their progress at another time.

They might have one file for each gardening season, or for different gardens, the possibilities are very flexible.

**Autosaving** is also enabled - this saves the state of the app to the current file handle every 2 seconds (by default).

## Installation

To install GreenThumb Garden Assistant project on your local machine, follow these steps:

_Make sure you have Node.js and npm installed before begining_

1. Clone the repository

   ```shell
   git clone https://github.com/joku8/GreenThumb-Garden-Aide-WebApp.git
   ```

2. Navigate to the project directory

   ```shell
   cd GreenThumb-Garden-Aide-WebApp
   ```

3. Install project dependencies

   ```shell
   npm install
   ```

4. Start the development server

   ```shell
   npm start
   ```

Now you're ready to start using GreenThumb Garden Assistant, built with MUI, and enjoy its features to assist you in managing your garden effectively. Happy gardening!

## Deployment

This web app is currently deployed via github pages. The app is live at [GreenThumb Garden Assistant](https://joku8.github.io/GreenThumb-Garden-Aide-WebApp/)
