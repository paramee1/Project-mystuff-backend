module.exports = (sequelize, DataTypes) => {
  const UserAddress = sequelize.define(
    "UserAddress",
    {
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      underscore: true,
    }
  );
  UserAddress.associate = models => {
    UserAddress.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    UserAddress.hasMany(models.Order, {
      foreignKey: {
        name: "userAddressId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return UserAddress;
};
