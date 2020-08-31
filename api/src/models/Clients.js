
const Clients = (sequelize, S) => {
  // defino o modelo
  const C = sequelize.define(
    "clients",
    {
      idClient: {
        primaryKey: true,
        type: S.INTEGER,
        allowNull: false,
        autoIncrement: true,
    },
      fullName: {
        type: S.STRING,
        allowNull: false,
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
      registrationDate: {
        type: S.DATEONLY,
        allowNull: true,        
      },                
    },
    {
      timestamps: false,
    }
  );

  return C;
};

module.exports = Clients;
