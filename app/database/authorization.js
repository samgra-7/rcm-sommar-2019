const fs = require('fs');

class Authorization{
    constructor(){
        this.database = {
            host: 'localhost',
            user: 'java',
            password: 'password',
            database: 'db'
            };
    
        this.ssh = {
            host: 'localhost',
            user: 'aron',
            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id')
        };

        this.mutex = 0;
    }
  
    increaseMutex(){
        this.mutex++;
        
    }
    decreaseMutex(){
        this.mutex--;
    }
    getMutex(){
        return this.mutex;
    }
}

module.exports.Authorization = new Authorization();