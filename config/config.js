module.exports = {
  development:{
    username: "root",
    password: "root",
    database: "node",
    host: "127.0.0.1",
    dialect: "mysql",
    logging:true,
    define:{
      charset:"utf8",
      collate:"utf8_general_ci"
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging:false,
    define:{
      charset:"utf8",
      collate:"utf8_general_ci"
    }
  }
}
