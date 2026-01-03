module.exports = (sequelize, DataTypes) => {
    const UserProfile = sequelize.define(
        "UserProfile",
        {
            id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },

            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true,
                field: "user_id",
            },

            displayName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            bio: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            profileImage: {
                type: DataTypes.STRING,
                allowNull: true,
                field: "profile_image",
            },
        },
        {
            tableName: "user_profiles",
            timestamps: true,
            underscored: true,
        }
    );

    UserProfile.associate = (models) => {
        UserProfile.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return UserProfile;
};
