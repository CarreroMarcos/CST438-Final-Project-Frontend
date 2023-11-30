export async function createAccount(username, password, email) {
    await fetch("http://localhost:8080/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "alias": username,
            "email": email,
            "password": password,
            "role": "USER"
        })
    })
}

export async function saveSong(email, id) {
    await fetch('http://localhost:8080/userlibrary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            deezer_id: id
        })
    })
}

export async function unsaveSong(id) {
    await fetch('http://localhost:8080/userLibrary/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export async function isSongSaved(deezer_id) {
    let response = await fetch('http://localhost:8080/userlibrary')
    let data = await response.json();
    let songFound = false;
    data.forEach((song) => {
        // console.log(`Songs Deezer ID ${song.deezer_id}. Inputted Deezer ID ${deezer_id}`)
        if(song.deezer_id == deezer_id) {
            songFound = true;
        }
    })
    return songFound;
}

export async function getLibraryId(email, deezer_id) {
    let response = await fetch('http://localhost:8080/userlibrary')
    let data = await response.json();
    let foundSong = {};
    data.forEach((song) => {
        // console.log(`Songs Deezer ID ${song.deezer_id}. Inputted Deezer ID ${deezer_id}`)
        if(song.deezer_id == deezer_id && song.user_id === 0) {
            foundSong = song;
        }
    })
    return foundSong.library_id;
}