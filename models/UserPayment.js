module.exports = (sequelize, DataTypes) => {
  const UserPayment = sequelize.define(
    "UserPayment",
    {
      accountNo: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      underscore: true,
    }
  );
  UserPayment.associate = models => {
    UserPayment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return UserPayment;
};
