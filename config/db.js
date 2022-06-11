

const mysql = require('mysql')

const db = mysql.createConnection({
  connectionLimit : 100,
  waitForConnections : true,
  queueLimit :0,
  host     : 'db.ceqyfgrypgpp.ap-northeast-2.rds.amazonaws.com',
  user     : 'admin',
  password : 'rnfptskfn1!',
  database : 'erp',
  wait_timeout : 28800,
  connect_timeout :10,
  multipleStatements: true,
  typeCast: function (field, next) {
      if (field.type == 'VAR_STRING') {
          return field.string();
      }
      return next();
  }
})

function handleDisconnect() {
  db.connect(function(err) {            
    if(err) {                            
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                   
  });                                 
                                         
  db.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      return handleDisconnect();                      
    } else {                                    
      throw err;                              
    }
  });
}

handleDisconnect(); 

setInterval(() => { 
  db.query('SELECT 1'); 
}, 5000);

module.exports = db;