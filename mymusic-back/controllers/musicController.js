const Song = require("../models/music");
const { genericResponse } = require('../models/genericResponseModel');
const { fetchAll } = require("../models/music");



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
    const savedSong= new Song(null, song.name, song.title,song.singer,mp3,req.user.id).save();
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
    const savedSong= new Song(null, song.name, song.title,song.singer,mp3).save();
    return res.json(genericResponse(true, 'Music Added Successfully',200,savedSong))
}



