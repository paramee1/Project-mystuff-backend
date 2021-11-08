module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define(
    "Images",
    {
      url1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url4: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url5: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url6: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscore: true,
    }
  );

  Images.associate = models => {
    Images.belongsTo(models.Product, {
      foreignKey: {
        name: "productId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
      onUpdate: "RESTRICT",
    });
  };

  return Images;
};
