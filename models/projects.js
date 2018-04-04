module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
      // Giving the User model a name of type STRING
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      responsible: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      priority: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        len: [1]
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      createdTime: {
        type: DataTypes.DATE,
        allowNull: false,
        len: [1]
      },
      progress: {
        type: DataTypes.INTEGER,
        allowNull: false,
        len: [1]
      }
    });
  
      
    return Project;
  };
  