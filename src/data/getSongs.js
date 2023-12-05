export async function getTopSongs() {
    let response = await fetch('http://localhost:8080/chart')
    let data = await response.json();
    return data
}

export async function search(query) {
  let response = await fetch('http://localhost:8080/search/'+query)
  let data = await response.json();
  return data
}

export async function getRandomWord() {
  let wordRes = await fetch('https://random-word-api.herokuapp.com/word?lang=en')
  let word = await wordRes.json();
  return word;
}