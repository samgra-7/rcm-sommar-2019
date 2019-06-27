const fs = require('fs');

class Authorization{
    constructor(){
        this.database = {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'db'
            };
    
        this.ssh = {
            host: 'localhost',
            user: 'ubuntu',
            privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
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