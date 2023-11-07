export async function getTopSongs() {
    let response = await fetch("https://api.deezer.com/chart/0/tracks");
    let data = await response.json();
    return data.data;
}