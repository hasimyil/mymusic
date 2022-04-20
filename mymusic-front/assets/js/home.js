

const token = sessionStorage.getItem('token')
let count = 1;
let playlistCount = 1;

window.onload = function () {
    getSongs()
    getPlayList()

    document.addEventListener('click', function (e) {
        if (e.target && e.target.id == 'addBtn') {
            //do something
           
            addSongToList(e.target.dataset.id)
        }
    });
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
    cell1.innerHTML = count;
    cell2.innerHTML = prod.name;
    cell3.innerHTML = prod.title;
    cell4.innerHTML = prod.singer;
    cell5.innerHTML = `<td class="text-right">
    <button type="button"  rel="tooltip" id="addBtn" data-id="${prod.id}"  class="btn btn-info btn-icon btn-sm addBtn btn-simple" data-original-title="" title="">
      <i class="ni ni-fat-add pt-1"></i>
    </button>
   
  </td>`;
}

function renderMyPlayList(prod) {
    const tbl = document.getElementById("myPlayList");
    const row = tbl.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    cell1.innerHTML = playlistCount;
    cell2.innerHTML = prod.name;
    cell3.innerHTML = prod.title;
    cell4.innerHTML = prod.singer;
    cell5.innerHTML = `<td class="text-right">
    <button type="button"  rel="tooltip" id="addBtn" data-id="${prod.id}"  class="btn btn-info btn-icon btn-sm addBtn btn-simple" data-original-title="" title="">
      <i class="ni ni-fat-add pt-1"></i>
    </button>
   
  </td>`;
  playlistCount++
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
function clear(){
    var tableObj = document.getElementsByTagName("myPlayList")[0];
    var coloumns = tableObj.getElementsByTagName("tr");
   console.log(coloumns)
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
    console.log(products)

    products.data.forEach(prod => {

        renderMyPlayList(prod)
    });
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


}

function playSong(){
    let masterPlay= document.getElementById('masterPlay')
    document.addEventListener('time')
    let ss = new Audio()
}


