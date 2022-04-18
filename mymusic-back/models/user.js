let users = [];

module.exports = class Book {

    constructor(id, first_name, last_name,email, password, liked) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.liked = liked;
    }

    save() {
        this.id = Math.random().toString();
        users.push(this);
        return this;
    }

    update() {
        const index = users.findIndex(p => p.id === this.id);
        if (index > -1) {
            users.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }

    }

    static fetchAll() {
        return users;
    }

    static findById(userId) {
        const index = users.findIndex(p => p.id === userId);
        if (index > -1) {
            return users[index];
        } else {
            throw new Error('NOT Found');
        }
    }
    static findByEmail(email) {
        console.log(email)
        const index = users.findIndex(p => p.email === email);
       
        if (index > -1) {
            return users[index];
        }
    }

    static login(email,password) {
        const index = users.findIndex(p => p.email === email);
        console.log(index,email)
        if (index > -1) {
           if(users[index].password == password){
               
            return users[index];
           }
           
            
        } 
    }

    static deleteById(userId) {
        const index = users.findIndex(p => p.id === userId);
        if (index > -1) {
            users = users.filter(p => p.id !== userId);
        } else {
            throw new Error('NOT Found');
        }
    }

}