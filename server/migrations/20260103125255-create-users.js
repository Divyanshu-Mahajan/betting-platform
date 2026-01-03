"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      auth_provider: {
        type: Sequelize.ENUM("email", "phone", "google", "apple"),
        allowNull: false,
        defaultValue: "email",
      },

      social_provider_id: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },

      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      phone_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      signup_step: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },

      status: {
        type: Sequelize.ENUM("active", "banned", "suspended"),
        defaultValue: "active",
      },

      role: {
        type: Sequelize.ENUM("user", "admin"),
        defaultValue: "user",
      },

      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      password_changed_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");

    // IMPORTANT: Drop ENUMs explicitly in MySQL
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_auth_provider;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_status;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_users_role;"
    );
  },
};
