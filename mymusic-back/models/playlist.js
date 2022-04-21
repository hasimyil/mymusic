let playlist = [];

module.exports = class Song {

    constructor(id, name, title,singer, mp3,userId,relaseDate) {
        this.id = id;
        this.name = name;
        this.title = title;
        this.singer = singer;
        this.mp3 = mp3;
        this.userId=userId;
        this.relaseDate=relaseDate;
       
    }

    save() {
        playlist.push(this);
        return this;
    }

    update() {
        const index = playlist.findIndex(p => p.id === this.id);
        if (index > -1) {
            playlist.splice(index, 1, this);
            return this;
        } else {
            throw new Error('NOT Found');
        }

    }

    static fetchAll() {
        console.log("asdas")
        return playlist;
    }

    static findById(userId) {
        const index = playlist.findIndex(p => p.id === userId);
        if (index > -1) {
            return playlist[index];
        } else {
            throw new Error('NOT Found');
        }
    }

    static findByUserID(userId) {
        const index = playlist.filter(p => p.userId === userId);
        if (index.length >0) {
            return index;
        } else{
            return []
        }

    }
    static findByTitle(title) {
        console.log(title)
        const index = playlist.findIndex(p => p.title === title);
       
        if (index > -1) {
            return playlist[index];
        }
    }

   

    static deleteById(id) {
        const index = playlist.findIndex(p => p.id === id);
        console.log('Found INDEX', index)
        if (index > -1) {
           return playlist = playlist.filter(p => p.id !== id);
        } else {
            throw new Error('NOT Found');
        }
    }

}