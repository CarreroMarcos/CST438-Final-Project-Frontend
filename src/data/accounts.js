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

export async function loginAccount(username, password) {
    let res = await fetch("http://localhost:8080/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    const jwtToken = res.headers.get('Authorization');
    if (jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        return true;
    }
}

export async function saveSong(token, id) {
    await fetch('http://localhost:8080/userlibrary', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : token
        },
        body: JSON.stringify({
            deezer_id: id
        })
    })
}

export async function unsaveSong(id, token) {
    await fetch('http://localhost:8080/userLibrary/delete/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

export async function isSongSaved(deezer_id, token) {
    let response = await fetch('http://localhost:8080/userlibrary', {
        headers: {
            'Authorization': token
        }
    })
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

export async function getLibraryId(token, deezer_id) {
    let response = await fetch('http://localhost:8080/userlibrary', {
        headers: {
            'Authorization': token
        }
    })
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