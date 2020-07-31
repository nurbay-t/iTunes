import { addZero} from './supScripts.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const updateTime = () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progress = (currentTime / duration) * 100;
        
        audioProgressTiming.style.width = progress +'%'; 

        let minutesPassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);
        let minutesTotal = Math.floor(duration / 60) || 0;
        let secondsTotal = Math.floor(duration % 60) || 0;

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`; 
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    }

    const loadTrack = () => {
        const isPaused = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPaused)
            audioPlayer.pause();
        else
            audioPlayer.play();

        audioPlayer.addEventListener('canplay', () => {
            updateTime();
        });
    }


    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        const track = playlist[trackIndex];

        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused)
                audioPlayer.play();
            else
                audioPlayer.pause();

            audioImg.src = `./audio/${track}.jpg`
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            if (trackIndex !== 0)
                trackIndex--;
            else
                trackIndex = playlist.length - 1;

            loadTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            if (trackIndex !== playlist.length - 1)
                trackIndex++;
            else
                trackIndex = 0;

            loadTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        if (trackIndex !== playlist.length - 1)
            trackIndex++;
        else
            trackIndex = 0;

        loadTrack();
    });

    audioPlayer.addEventListener('timeupdate', updateTime);

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const totalWidth = audioProgress.clientWidth;
        const progress = x / totalWidth * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.pause = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');
        }   
    };
};
