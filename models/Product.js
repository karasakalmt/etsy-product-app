module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product",{
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        image:{
            type: DataTypes.STRING,
        },
        price:{
            type: DataTypes.FLOAT,
        },
    },
    {timestamps:false});
    return Product;
}