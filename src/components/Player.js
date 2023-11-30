import {Howl, Howler} from 'howler';
import { useEffect, useState } from 'react';
import React from 'react';
import { Heart, Pause, Play, Volume2, VolumeX } from 'react-feather';
import { isSongSaved, saveSong } from '../data/accounts';
import { useNavigate } from 'react-router-dom';

export class Player {
    static currentlyPlaying = -1
    static duration = 30
    static play_time = 0;
    static intervalId;
    static song = {}
    static loadCallback = () => {}
    static playCallback = () => {}
    static muteCallback = () => {}
    static playTimeCallback = () => {}

    static loadSong (songOBJ) {
        Howler.stop();
        let song = new Howl({
            src: [songOBJ.preview]
        })
        this.currentlyPlaying = song;
        this.song = songOBJ
        song.play();
        song.volume(0.3)
        this.loadCallback();
        this.playCallback(true);

        clearInterval(this.intervalId)
        this.play_time = 0;
        this.playTimeCallback();
        this.intervalId = setInterval(() => {
            this.play_time += 1;
            this.playTimeCallback();

            if(this.play_time === 3000) {
                this.play_time = 0;
                this.playTimeCallback();
                this.playCallback(false);
                clearInterval(this.intervalId)
            }
        }, 10)
    }

    static onLoadSong(callback) {
       this.loadCallback = callback;
    }

    static onPlay(callback) {
        this.playCallback = callback
    }

    static setPlaytimeCallback(callback) {
        this.playTimeCallback = callback
    }

    static restart() {
        this.currentlyPlaying.play();
        this.playCallback(true)
        this.intervalId = setInterval(() => {
            this.play_time += 1;
            this.playTimeCallback();

            if(this.play_time === 3000) {
                this.play_time = 0;
                this.playTimeCallback();
                this.playCallback(false);
                clearInterval(this.intervalId)
            }
        }, 10)
    }

    static pause () {
        this.currentlyPlaying.pause();
        this.playCallback(false);
        clearInterval(this.intervalId)
    }

    static mute() {
        if(this.currentlyPlaying.volume() === 0){
            this.currentlyPlaying.volume(0.3)
            this.muteCallback(false)
        } else {
            this.currentlyPlaying.volume(0)
            this.muteCallback(true)
        }
    }

    static onMute(callback) {
        this.muteCallback = callback
    }
}

export default function PlayerComponent() {
    const [song, setSong] = useState({})
    const [playing, setPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [playtime, setPlaytime] = useState(0)
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("jwt")

        if(!token) return;

        async function checkSaved() {
            setLiked(await isSongSaved(song.deezer_id));
        }
        checkSaved();
    }, [liked, song])

    Player.onLoadSong(async () => {
        setSong(Player.song)
    })

    Player.onPlay((playing) => {
        setPlaying(playing);
    })

    Player.onMute((muted) => {
        setMute(muted)
    })

    Player.setPlaytimeCallback(() => {
        setPlaytime(Player.play_time)
    })

    const save = () => {
        const token = sessionStorage.getItem("jwt")

        if(!token) {
            return;
        }

        saveSong(token, song.deezer_id)
        setLiked(true)
    }
    

    return (
        <div className='player'>
            <span className='play_progress' style={{width: `${playtime * 1/29.0}%`}}/>
            <div className='play_info'>
                {(playing) ? <button onClick={() => Player.pause()}><Pause /></button>: <button onClick={() => Player.restart()}><Play /></button>}
                <button onClick={() => Player.mute()}>{(mute) ? <VolumeX /> : <Volume2 />}</button>
                {(liked) ? <button className="saved" id="heart"><Heart /></button> : <button id="heart" onClick={save}><Heart /></button>}
                {(song.cover_art) ? <img className='player_song_art' src={song.cover_art}></img> : false}
                <h5>{song.title} - {song.artist}</h5>
            </div>
        </div>
    )
}