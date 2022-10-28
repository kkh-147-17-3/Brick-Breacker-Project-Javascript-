class SoundContainer{
    constructor(){
        this.isSfxMuted = false;
        this.brickSounds = {index: 0, arr:[]};
        this.bombSounds = {index: 0, arr:[]};
        this.laserSounds = {index: 0, arr:[]};
        this.ballUpSounds = {index: 0, arr:[]};
        this.audioCtx;
        this.audioSource;
        this.analyser;
        this.dataArray;

        this.bgmSounds = new Audio('sound/Backsound.mp3');
        this.bgmSounds.loop = true;
        for (let i = 0; i < 30; i++){
            let audio = new Audio('sound/poing.mp3');
            this.brickSounds.arr.push(audio);
        }

        for (let i = 0; i < 10; i++){
            let audio = new Audio('sound/bomb.mp3');
            this.bombSounds.arr.push(audio);
        }

        for (let i = 0; i < 10; i++){
            let audio = new Audio('sound/laser.mp3');
            this.laserSounds.arr.push(audio);
        }

        for (let i = 0; i < 10; i++){
            let audio = new Audio('sound/coin.mp3');
            this.ballUpSounds.arr.push(audio);
        }
    }

    playBgm(){
        this.bgmSounds.play();
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.audioSource = this.audioCtx.createMediaElementSource(this.bgmSounds);
        this.analyser = this.audioCtx.createAnalyser();
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioCtx.destination);
        this.analyser.fftSize = 128;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
    }

    pauseBgm(){
        this.bgmSounds.pause();
    }

    resumeBgm(){
        this.bgmSounds.play();
    }

    playSfx(type){
        if (this.isSfxMuted){
            return;
        }
        switch(type){
            case "brick":
                this.playBrick();
            break;
            case "bomb":
                this.playBomb();
            break;
            case "laser":
                this.playLaser();
            break;
            case "ballup":
                this.playBallUp();
            break;
        }
    }

    playBrick(){
        this.brickSounds.arr[this.brickSounds.index].play();
        this.brickSounds.index++;
        if (this.brickSounds.index == this.brickSounds.arr.length){
            this.brickSounds.index = 0;
        }
    }
    playBomb(){
        this.bombSounds.arr[this.bombSounds.index].play();
        this.bombSounds.index++;
        if (this.bombSounds.index == this.bombSounds.arr.length){
            this.bombSounds.index = 0;
        }
    }
    playLaser(){
        this.laserSounds.arr[this.laserSounds.index].play();
        this.laserSounds.index++;
        if ( this.laserSounds.index == this.laserSounds.arr.length){
            this.laserSounds.index = 0;
        }
    }

    playBallUp(){
        this.ballUpSounds.arr[this.ballUpSounds.index].play();
        this.ballUpSounds.index++;
        if ( this.ballUpSounds.index == this.ballUpSounds.arr.length){
            this.ballUpSounds.index = 0;
        }
    }

    getTitleEffectValue(){
        this.analyser.getByteFrequencyData(this.dataArray);
        // console.log(this.dataArray[46]);
        return this.dataArray[46] / 150 + 0.3;
    }


    adjustBGMVolume(val){
        this.bgmSounds.volume = val/100;
    }


    adjustSFXVolume(val){
        let brickSoundsObjArr = this.brickSounds.arr;
        for (let soundObj of brickSoundsObjArr){
            soundObj.volume = val/100;
        }
        let laserSoundsObjArr = this.laserSounds.arr;
        for (let soundObj of laserSoundsObjArr){
            soundObj.volume = val/100;
        }
        let ballUpSoundsObjArr = this.ballUpSounds.arr;
        for (let soundObj of ballUpSoundsObjArr){
            soundObj.volume = val/100;
        }
        let bombSoundsObjArr = this.bombSounds.arr;
        for (let soundObj of bombSoundsObjArr){
            soundObj.volume = val/100;
        }
    }
}

export default new SoundContainer();