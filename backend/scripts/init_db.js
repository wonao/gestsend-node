const { createUserTable } = require("../src/models/userModel");
const { createCrmTables } = require("../src/models/crmModel");

createUserTable();
createCrmTables();

