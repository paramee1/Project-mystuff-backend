module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart");

  Cart.associate = models => {
    Cart.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });

    Cart.hasMany(models.CartItem, {
      foreignKey: {
        name: "cartId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Cart;
};
