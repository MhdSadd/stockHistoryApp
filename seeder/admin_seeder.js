require("dotenv").config();
const admin = require("../data/admin_data");
const { Admin } = require("../models/auth/admin_sign_up");
const { connect } = require("mongoose");
const connectDB = require("../configs/db");

connectDB();
const seedData = async () => {
  try {
    await Admin.deleteMany();
    await Admin.insertMany(admin);
    console.log(`Data seeded successfully`);
    process.exit();
  } catch (error) {
    console.log(`Data seeding failed ${error}`);
    process.exit(1);
  }
};
seedData();
