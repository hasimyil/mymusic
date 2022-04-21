

const token = sessionStorage.getItem('token')
let count = 1;
let playlistCount = 1;
let m = ""
var audio = new Audio();
let songElement = new Audio()
let masterPlay = document.getElementById('masterPlay');
let myProgresBar = document.getElementById('musicPlayer');
let selectedSong = "";
let random = false;
let repeat = false;
let orderSong = false;
window.onload = function () {
    getSongs()
    getPlayList()

    const userName=  sessionStorage.getItem("user")
    document.getElementById('username').innerHTML=userName
    console.log(userName)
    if(token == null){
        window.location.href = "./index.html";
    }
    document.getElementById('logoutBtn').addEventListener('click', function () {
    
        sessionStorage.clear()
        window.location.href = "./index.html";
    })



}


async function play(songId) {
    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
    });
    return await fetch('http://localhost:3000/music/play', {
        headers: myHeaders,
        method: 'POST',
        body: JSON.stringify({ id: songId })
    }).then(response => response.json().then((data) => {
        m = data.fileContent
        return data;
    }))



}

function nextSong() {
    let nextSongId=''
    let songName =''
    let singer=''
    
    if(selectedSong.parentElement.parentElement.nextElementSibling == null){
    selectedSong.parentElement.parentElement.style.backgroundColor = ''
    
    const tds = document.getElementById("myPlayList").getElementsByTagName("tr")
    selectedSong = tds[0]
    nextSongId = selectedSong.nextElementSibling.children[4].children[0]
    selectedSong = nextSongId

    songName = selectedSong.parentElement.parentElement.children[1].innerHTML;
    singer = selectedSong.parentElement.parentElement.children[3].innerHTML;
    selectedSong.parentElement.parentElement.style.backgroundColor = 'gray'
    
    }else{
    nextSongId = selectedSong.parentElement.parentElement.nextElementSibling.children[4].children[0]
    selectedSong.parentElement.parentElement.nextElementSibling.style.backgroundColor = 'gray'
    songName = selectedSong.parentElement.parentElement.nextElementSibling.children[1].innerHTML;
    singer = selectedSong.parentElement.parentElement.nextElementSibling.children[3].innerHTML;
    selectedSong.parentElement.parentElement.style.backgroundColor = ''
    }

    
    
    
    document.getElementById('songName').innerHTML = 'Playing ' + songName + ' By ' + singer
    play(nextSongId.dataset.id)

    setTimeout((myTimer) => {

        var audioSrc = 'data:audio/mp3;base64,' + m;
        songElement.src = audioSrc;
        songElement.load();
        songElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');


    }, 2000);
    selectedSong = nextSongId
}


function previousSong() {
    const nextSongId = selectedSong.parentElement.parentElement.previousElementSibling.children[4].children[0]
    const songName = selectedSong.parentElement.parentElement.previousElementSibling.children[1].innerHTML;
    const singer = selectedSong.parentElement.parentElement.previousElementSibling.children[3].innerHTML;
    selectedSong.parentElement.parentElement.style.backgroundColor = ''
    selectedSong.parentElement.parentElement.previousElementSibling.style.backgroundColor = 'gray'
    document.getElementById('songName').innerHTML = 'Playing ' + songName + ' By ' + singer
    play(nextSongId.dataset.id)

    setTimeout((myTimer) => {

        var audioSrc = 'data:audio/mp3;base64,' + m;
        songElement.src = audioSrc;
        songElement.load();
        songElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');


    }, 2000);
    selectedSong = nextSongId
}


function renderMyMusicList(prod, number) {
    const tbl = document.getElementById("myMusicList");
    console.log(tbl.tbody)
    const row = tbl.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    cell1.innerHTML = count;
    cell2.innerHTML = prod.name;
    cell3.innerHTML = prod.title;
    cell4.innerHTML = prod.singer;
    cell5.innerHTML = prod.relaseDate;
    cell6.innerHTML = `<td class="text-right">
    <button type="button"  rel="tooltip" id="addBtn" data-id="${prod.id}"  class="btn btn-info btn-icon btn-sm addBtn btn-simple" data-original-title="" title="">
      <i class="ni ni-fat-add pt-1"></i>
    </button>
   
  </td>`;
    cell6.querySelector('.addBtn').addEventListener('click', function () {

        addSongToList(this.dataset.id)
    })

}

function renderMyPlayList(prod) {
    const tbl = document.getElementById("myPlayList");
    const row = tbl.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    cell1.innerHTML = playlistCount;
    cell2.innerHTML = prod.name;
    cell3.innerHTML = prod.title;
    cell4.innerHTML = prod.singer;
    cell5.innerHTML = `<td class="text-right">
    <button type="button"  rel="tooltip" id="playBtn" data-id="${prod.id}"  class="btn btn-info btn-icon btn-sm playBtn btn-simple" data-original-title="" title="">
      <i class="fa fa-play-circle pt-1"></i>
    </button>
    
  </td>`;
    cell6.innerHTML = `<td class="text-right">
  <button type="button"  rel="tooltip" id="removeBtn" data-id="${prod.id}"  class="btn btn-info btn-icon btn-sm removeBtn btn-simple" data-original-title="" title="">
  <i class="fa fa-minus-circle pt-1"></i>
</button>
 
</td>`

    playlistCount++


    cell6.querySelector('.removeBtn').addEventListener('click', function () {
        removeFromPlayList(this.dataset.id)
    })
    document.querySelectorAll('.playBtn').forEach(btn => {
        btn.addEventListener("click", function () {
            const songName = this.parentElement.parentElement.children[1].innerHTML;
            const singer = this.parentElement.parentElement.children[3].innerHTML;
            //selectedSong.parentElement.parentElement.style.backgroundColor=''
            // selectedSong.parentElement.parentElement.previousElementSibling.style.backgroundColor='gray'
            document.getElementById('songName').innerHTML = 'Playing ' + songName + ' By ' + singer
            play(this.dataset.id)
            console.log(this.dataset.id)
            setTimeout((myTimer) => {
                if (songElement.paused || songElement.currentTime <= 0) {

                    var audioSrc = 'data:audio/mp3;base64,' + m;
                    songElement.src = audioSrc;
                    songElement.load();
                    songElement.play();
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                } else {
                    songElement.pause();
                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');

                }
            }, 2000);
            selectedSong = this
        });
    });
}

async function getSongs() {
    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    let products = await fetch('http://localhost:3000/music/', {
        headers: myHeaders,
        method: 'GET'
    }).then(response => response.json());
    console.log(products)

    products.data.forEach(prod => {

        renderMyMusicList(prod, count)
        count++;
    });
}


async function getPlayList() {

    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
    });
    let products = await fetch('http://localhost:3000/playlist/', {
        headers: myHeaders,
        method: 'GET'
    }).then(response => response.json());
    console.log("playlist",products)
    
    products.data.forEach(prod => {

        renderMyPlayList(prod)
    });
    myPlaylistEmtyCheck()
}

function myPlaylistEmtyCheck(){
    const tds = document.getElementById("myPlayList").getElementsByTagName("tr")
    console.log(tds.length)
    if(tds.length <= 1){
        document.getElementById('noSongsInfo').innerHTML="No Songs in Your Playlist"
    }else{
        document.getElementById('noSongsInfo').innerHTML=""
    }
}

async function addSongToList(songId) {
    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
    });
    let obj = {};
    obj.id = songId
    console.log(JSON.stringify(obj))
    let products = await fetch('http://localhost:3000/playlist/', {
        headers: myHeaders,
        body: JSON.stringify(obj),
        method: 'POST',

    },

    ).then(response => response.json());
    console.log(products)
    if (products.code == 200) {

        renderMyPlayList(products.data)

    }
    myPlaylistEmtyCheck()


}
async function removeFromPlayList(songId) {
    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/json'
    });
    let obj = {};
    obj.id = songId
    console.log(JSON.stringify(obj))
    let products = await fetch('http://localhost:3000/playlist/', {
        headers: myHeaders,
        body: JSON.stringify(obj),
        method: 'PUT',

    },

    ).then(response => response.json());
    console.log(products)
    if (products.code == 200) {
        console.log(products.code)
        location.reload()

    }
    myPlaylistEmtyCheck()

}

masterPlay.addEventListener('click', () => {
    if (songElement.paused || songElement.currentTime <= 0) {

        var audioSrc = 'data:audio/mp3;base64,' + m;
        songElement.src = audioSrc;
        songElement.load();
        songElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    } else {
        songElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');

    }
})
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
songElement.addEventListener('timeupdate', function () {
    progress = parseInt((songElement.currentTime / songElement.duration) * 100)
    myProgresBar.value = progress;

    if (progress == 100) {
        if (random) {
            const tds = document.getElementById("myPlayList").getElementsByTagName("tr")

            const rand = getRandomArbitrary(1, tds.length);
            selectedSong.parentElement.parentElement.style.backgroundColor = ''
            tds[rand].style.backgroundColor = "gray";
            selectedSong = tds[rand].children[4].getElementsByClassName('playBtn')[0]
            const songName = selectedSong.parentElement.parentElement.children[1].innerHTML;
            const singer = selectedSong.parentElement.parentElement.children[3].innerHTML;
            document.getElementById('songName').innerHTML = 'Playing ' + songName + ' By ' + singer
            play(tds[rand].children[4].getElementsByClassName('playBtn')[0].dataset.id)
            setTimeout((myTimer) => {
                if (songElement.paused || songElement.currentTime <= 0) {
    
                    var audioSrc = 'data:audio/mp3;base64,' + m;
                    songElement.src = audioSrc;
                    songElement.load();
                    songElement.play();
                    masterPlay.classList.remove('fa-play-circle');
                    masterPlay.classList.add('fa-pause-circle');
                } else {
                    songElement.pause();
                    masterPlay.classList.remove('fa-pause-circle');
                    masterPlay.classList.add('fa-play-circle');
    
                }
            }, 2000);
           
        }else if(orderSong){
            console.log("test")
            nextSong()
        }else if(repeat){
            songElement.play();
        }
       

    }
})

myProgresBar.addEventListener('change', () => {
    songElement.currentTime = myProgresBar.value * songElement.duration / 100;
})

document.getElementById('previous').addEventListener('click', () => {
    previousSong()
})

document.getElementById('nextSong').addEventListener('click', () => {
    nextSong()
})

document.getElementById('randomSong').addEventListener('click', function () {
    random = !random;
    if (random) {
        const rpt = document.getElementById('repeatSong')
        const ord = document.getElementById('orderListSong')
       
        rpt.classList.remove('text-primary')
        ord.classList.remove('text-primary')
        this.classList.add('text-primary')
        repeat = false
        orderSong = false
    } else {
        this.classList.remove('text-primary')
    }
})
document.getElementById('repeatSong').addEventListener('click', function () {
    repeat = !repeat;
    if (repeat) {
        const rnd = document.getElementById('randomSong')
        const ord = document.getElementById('orderListSong')
        rnd.classList.remove('text-primary')
        ord.classList.remove('text-primary')
        random = false
        orderSong = false

        this.classList.add('text-primary')
    } else {
        this.classList.remove('text-primary')
    }
})

document.getElementById('orderListSong').addEventListener('click', function () {
    orderSong = !orderSong;
    if (orderSong) {
        const rnd = document.getElementById('randomSong')
        const ord = document.getElementById('repeatSong')
        rnd.classList.remove('text-primary')
        ord.classList.remove('text-primary')
        repeat = false
        random = false

        this.classList.add('text-primary')
    } else {
        this.classList.remove('text-primary')
    }
})


document.getElementById('searchBtn').addEventListener('click', function () {
    const searchText = document.getElementById('searchInput').value
    clearTable()
    searchByText(searchText);
    
})


async function searchByText(text){
    console.log(text)
    document.getElementById("resultText").innerHTML = `Results of '${text}'`;
    myHeaders = new Headers({
        'Authorization': 'Token ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    let products = await fetch('http://localhost:3000/music/search?searchText='+text, {
        headers: myHeaders,
        method: 'GET'
    }).then(response => response.json());
    console.log(products)
     if(products.success == true){
         console.log(products.data)
         products.data.forEach(prod => {

            renderMyMusicList(prod, count)
            count++;
        });
     }

    
}

function clearTable(){
    const tds = document.getElementById("myMusicList").getElementsByTagName("tr")
    const len =  tds.length-1;
    console.log(tds)
    for(let i=1 ; i<=len;i++){
        console.log(i)
        tds[1].remove()
       
    }
    count=1
}







