# Automatic-Librarian

Automatic-Librarian is a web app that uses Puppeteer to scrape data from the website https://leviathancommander.wixsite.com/home/reports. The scraped data is then organized in a user-friendly way, allowing users to search for whatever they want with the parameters of location, commander, and date.

## Getting Started

### Prerequisites

To run Automatic-Librarian, you will need to have the following installed:

- Node.js
- PostgreSQL

### Installation

1. Clone this repository to your local machine.

2. Navigate to the project's root directory in your terminal.

3. Run `npm install` to install the necessary dependencies.

4. Create a `.env` file based on the `.env.example` file, and fill it with the proper data for your PostgreSQL database.

5. Run `npx sequelize-cli db:migrate` to run the migrations and set up the database tables.

### Usage

To run the app, use the command: 

npm start

This will start the server, and you can access the app at `http://localhost:${PORT}`.

### Tests

To run the tests, use the command:

npm test

## Contributing

If you want to contribute to Automatic-Librarian, please follow these steps:

1. Fork this repository.
2. Create a branch with your feature or bug fix.
3. Make your changes and commit them with descriptive commit messages.
4. Push your changes to your fork.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
