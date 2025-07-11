const fs = require('fs');
const path = require('path');
const { createUserTable } = require("../src/models/userModel");
const { createCrmTables } = require("../src/models/crmModel");

// Ensure the data directory exists so SQLite can create the database file
fs.mkdirSync(path.resolve(__dirname, '../data'), { recursive: true });

createUserTable();
createCrmTables();

