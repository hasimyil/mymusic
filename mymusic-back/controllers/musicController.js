exports.uploadMusic =(req, res,next) => {
    var mp3SongName = 'test.mp3';
    var mp3_file = fs.createWriteStream(mp3SongName);
  
    mp3_file.on('open', function (fd) {
      req.on('data', function(data){
          console.log("loading... \n");
          mp3_file.write(data);
      }); 
  
      req.on('end', function(){
        console.log("finalizing...");
        mp3_file.end();
        res.sendStatus(200);
    });
    }
}