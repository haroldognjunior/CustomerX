const S = require('sequelize');
const Contacts = (sequelize, S) => {
    // defino el modelo

    const K = sequelize.define('contact', {
        idContact: {
            primaryKey: true,
            type: S.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        fullName: {
            allowNull: false,
            type: S.STRING,
        },
        email1: {
            type: S.STRING,
            allowNull: false,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          email2: {
            type: S.STRING,
            allowNull: true,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          phone1: {
            type: S.STRING,
            allowNull: false,
          },
          phone2: {
            type: S.STRING,
            allowNull: true,
          },
        
    }, { timestamps: false });

    return K;
};

module.exports = Contacts;