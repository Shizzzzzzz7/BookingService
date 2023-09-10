'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn( //For column adding
      "Bookings", //In which table to add
      "noOfSeats", //Column name
      { //Column Properties
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:1
      }
    );
    //The above code will add new Column in Booking Table
    await queryInterface.addColumn(
      "Bookings",
      "totalCost",
      {
        type: Sequelize.INTEGER,
        allowNull:false,
        defaultValue:0
      }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Bookings", "noOfSeats");
    await queryInterface.removeColumn("Bookings", "totalCost");
    //The above code will drop/remove the columns when the migration is reverted back
  }
};
