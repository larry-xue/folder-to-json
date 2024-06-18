# Folder to JSON

Describe your project briefly here. This project utilizes the `showDirectoryPicker` API in browsers to allow users to select a folder on their computer, and then recursively retrieves subdirectories to generate a JSON tree structure representing the directory hierarchy.

## Preview

You can preview by clicking this [link](https://folder2json.larryxue.dev/)

## Features

- **Directory Selection**: Users can select a folder from their local machine using the `showDirectoryPicker` API.
- **Recursive Directory Parsing**: The application recursively fetches subdirectories to build a hierarchical JSON representation of the selected directory structure.
- **Regular Expression Filtering**: You can configure the application to filter directories and files based on regular expressions.
- **Recursive Depth Configuration**: Configure the maximum depth of recursive directory parsing.
- **Tree View**: The generated JSON is structured as a tree, suitable for visualization or further processing.
- **Built with Nuxt.js and DaisyUI**: Developed using Nuxt.js framework with DaisyUI for styling and components.
- **Deployed on Cloudflare**: The application is deployed on Cloudflare.

### Usage

1. Open the deployed application in a web browser.
2. Click on the button to select a directory from your computer using the provided UI.
3. Once a directory is selected, the application will fetch and display the directory structure in a JSON tree format, respecting the configured filters and recursion depth.

### Technologies Used

- [Nuxt.js](https://nuxt.com/)
- [DaisyUI](https://daisyui.com/)
- [showDirectoryPicker API](https://developer.mozilla.org/en-US/docs/Web/API/Window/showDirectoryPicker)
