module.exports = (sequelize, DataTypes) => {
    const OtpVerification = sequelize.define(
        "OtpVerification",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },

            userId: {
                type: DataTypes.BIGINT,
                allowNull: true, // user may not exist yet
                field: "user_id",
            },

            identifier: {
                type: DataTypes.STRING,
                allowNull: false,
                // email or phone
            },

            identifierType: {
                type: DataTypes.ENUM("email", "phone"),
                allowNull: false,
                field: "identifier_type",
            },

            otpHash: {
                type: DataTypes.STRING,
                allowNull: false,
                field: "otp_hash",
            },

            purpose: {
                type: DataTypes.ENUM(
                    "signup",
                    "login",
                    "password_reset",
                    "email_verification",
                    "phone_verification"
                ),
                allowNull: false,
            },

            attempts: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: "is_verified",
            },

            expiresAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: "expires_at",
            },
        },
        {
            tableName: "otp_verifications",
            timestamps: true,
            underscored: true,
        }
    );

    OtpVerification.associate = (models) => {
        OtpVerification.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });
    };

    return OtpVerification;
};
