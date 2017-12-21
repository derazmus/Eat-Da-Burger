// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    //construct the query string thet returns all rows from the target table
    var queryString = "SELECT * FROM " + tableInput + ";";
    //perform the database query
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      //return results in a callback
      cb(result);
    });
  },

  //function that insert a single table entry
  create: function(table, cols, vals, cb) {
    //construct the query string that inserts a single row into the target table
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    //console.log(queryString);

    //Perform the database query
    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  // function for updates on a single table entry
  update: function(table, objColVals, condition, cb) {
    //constructy the query string that updates a single entry in the target table
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    //console.log(queryString);

    //perform the database query
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};
  

// Export the orm object for the model.
module.exports = orm;