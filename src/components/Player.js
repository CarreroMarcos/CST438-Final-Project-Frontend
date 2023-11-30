import {Howl, Howler} from 'howler';
import { useState } from 'react';
import React from 'react';
import { Heart, Pause, Play, Volume2, VolumeX } from 'react-feather';

export class Player {
    static currentlyPlaying = -1
    static duration = 30
    static play_time = 0;
    static intervalId;
    static title = ""
    static artist = ""
    static art = ""
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
        this.title = songOBJ.title;
        this.artist = songOBJ.artist;
        this.art = songOBJ.cover_art
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
    const [title, setTitle] = useState("")
    const [artist, setArtist] = useState("");
    const [art, setArt] = useState("");
    const [playing, setPlaying] = useState(false);
    const [mute, setMute] = useState(false);
    const [playtime, setPlaytime] = useState(0)

    Player.onLoadSong(() => {
        setArt(Player.art);
        setTitle(Player.title);
        setArtist(Player.artist);
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

    return (
        <div className='player'>
            <img className='player_background' src={art}></img>
            <span className='play_progress' style={{width: `${playtime * 1/29.0}%`}}/>
            <div className='play_info'>
                {(playing) ? <button onClick={() => Player.pause()}><Pause /></button>: <button onClick={() => Player.restart()}><Play /></button>}
                <button onClick={() => Player.mute()}>{(mute) ? <VolumeX /> : <Volume2 />}</button>
                <button id="heart"><Heart /></button>
                <h5>{title} - {artist}</h5>
            </div>
        </div>
    )
}