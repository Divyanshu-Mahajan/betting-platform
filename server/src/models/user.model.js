module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },

            username: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },

            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },

            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            },

            password: {
                type: DataTypes.STRING,
                allowNull: true,
                // NULL for google/apple users
            },

            authProvider: {
                type: DataTypes.ENUM("email", "phone", "google", "apple"),
                allowNull: false,
                defaultValue: "email",
                field: "auth_provider",
            },

            socialProviderId: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                field: "social_provider_id",
            },

            emailVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: "email_verified",
            },

            phoneVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                field: "phone_verified",
            },

            signupStep: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
                field: "signup_step",
            },

            status: {
                type: DataTypes.ENUM("active", "banned", "suspended"),
                defaultValue: "active",
            },

            role: {
                type: DataTypes.ENUM("user", "admin"),
                defaultValue: "user",
            },

            lastLoginAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "last_login_at",
            },

            passwordChangedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "password_changed_at",
            },
        },
        {
            tableName: "users",
            timestamps: true,
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.hasOne(models.UserProfile, {
            foreignKey: "user_id",
            as: "profile",
        });
    };

    return User;
};
