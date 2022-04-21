const Song = require("../models/music");
const { genericResponse } = require('../models/genericResponseModel');
const { fetchAll } = require("../models/music");
var fs = require('fs');


exports.getSongs = (req, res, next) => {
    const songs = Song.fetchAll()
    return res.status(200).json(genericResponse(true, `${songs.length} music found`,200,songs))
}

exports.getSongById = (req, res, next) => {
    res.status(200).json(Song.findById(req.params.id));
}

exports.getSongByUserId = (req, res, next) => {
    res.status(200).json(Song.findByUserID(req.params.id));
}


exports.save = (req, res, next) => {
    const song = req.body;
    console.log("asdasd",req)
    const user= req.user;
    console.log(req.body.title)
    const mp3= req.file
    const savedSong= new Song(null, song.name, song.title,song.singer,mp3,song.relaseDate).save();
    return res.json(genericResponse(true, 'Music Added Successfully',200,savedSong))
}

exports.update = (req, res, next) => {
    const song = req.body;
    const updatedSong = new Song(req.params.id,song.name, song.title, song.singer, song.mp3).update();
    res.status(200).json(updatedSong);
}

exports.deleteById = (req, res, next) => {
    Song.deleteById(req.params.id);
    res.status(200).end();
}

exports.addToPlaylist = (req, res, next) => {
    const song = req.body;
    console.log(req.body.title)
    const mp3= req.file
    const savedSong= new Song(null, song.name, song.title,song.singer,mp3,song.relaseDate).save();
    return res.json(genericResponse(true, 'Music Added Successfully',200,savedSong))
}

exports.searchByText = (req, res, next) => {
    const song = req.query;
    console.log(song.searchText)
    const found= Song.searchByText(song.searchText)
    
    if(found.length<1){
        return res.json(genericResponse(false, `Music Not Found`,200))
    }
    return res.json(genericResponse(true, `${song.length} music found`,200,found))
}

exports.play = (req, res, next) => {
    
  
    
    const song = req.body;
    console.log(song.id)
    const findSong = Song.findById(song.id)
    var returnData = {};
    //const file = findSong.mp3.path;
    fs.readFile(findSong.mp3.path, function(err, file){
        var base64File = new Buffer(file, 'binary').toString('base64');
         console.log(file)
        returnData.fileContent = base64File;

       return res.json(returnData);
    });
   
}






