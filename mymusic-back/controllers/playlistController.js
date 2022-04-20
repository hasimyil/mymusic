const Playlist = require("../models/playlist");
const { genericResponse } = require('../models/genericResponseModel');
const Song = require("../models/music");

exports.save = (req, res, next) => {
    const song = req.body;
    console.log(song.id)
    const findSong = Song.findById(song.id)
    const savedSong= new Playlist(findSong.id, findSong.name, findSong.title,findSong.singer,findSong.mp3,req.user.id).save();
    return res.json(genericResponse(true, 'Music Added Successfully',200,savedSong))
}

exports.getSongByUserId = (req, res, next) => {
    const user= req.user;
    console.log(user.id)
    const songs = Playlist.findByUserID(user.id)
    return  res.status(200).json(genericResponse(true, `${songs.length} music found`,200,songs));
    
    
}

exports.deleteFromList = (req, res, next) => {
    const song = req.body;
    console.log(song.id)
    const songs = Playlist.deleteById(song.id)
    return  res.status(200).json(genericResponse(true, `${songs.length} music found`,200,songs));
    
    
}


exports.getSongs = (req, res, next) => {
    const songs = Playlist.fetchAll()
    return res.status(200).json(genericResponse(true, `${songs.length} music found`,200,songs))
}