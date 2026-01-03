"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("otp_verifications", {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      identifier: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      identifier_type: {
        type: Sequelize.ENUM("email", "phone"),
        allowNull: false,
      },

      otp_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      purpose: {
        type: Sequelize.ENUM(
          "signup",
          "login",
          "password_reset",
          "email_verification",
          "phone_verification"
        ),
        allowNull: false,
      },

      attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
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

    // Indexes for performance
    await queryInterface.addIndex("otp_verifications", [
      "identifier",
      "identifier_type",
      "purpose",
    ]);

    await queryInterface.addIndex("otp_verifications", ["expires_at"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("otp_verifications");

    // Drop ENUMs explicitly (important for MySQL)
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_otp_verifications_identifier_type;"
    );
    await queryInterface.sequelize.query(
      "DROP TYPE IF EXISTS enum_otp_verifications_purpose;"
    );
  },
};
