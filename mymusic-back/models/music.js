let songs = [];

module.exports = class song {

    constructor(id, name, title,singer, mp3) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.singer = singer;
        this.mp3 = mp3;
       
    }

    save() {
        this.id = Math.random().toString();
        songs.push(this);
        return this;
    }

    update() {
        const index = songs.findIndex(p => p.id === this.id);
        if (index > -1) {
            songs.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }

    }

    static fetchAll() {
        console.log("asdas")
        return songs;
    }

    static findById(userId) {
        const index = songs.findIndex(p => p.id === userId);
        if (index > -1) {
            return songs[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    static findByUserID(userId) {
        const index = songs.findIndex(p => p.userId === userId);
        if (index > -1) {
            return songs[index];
        } else {
            throw new Error('NOT Found');
        }
    }
    static findByTitle(title) {
        console.log(title)
        const index = songs.findIndex(p => p.title === title);
       
        if (index > -1) {
            return songs[index];
        }
    }

   

    static deleteById(id) {
        const index = songs.findIndex(p => p.id === id);
        if (index > -1) {
            songs = songs.filter(p => p.id !== id);
        } else {
            throw new Error('NOT Found');
        }
    }

}