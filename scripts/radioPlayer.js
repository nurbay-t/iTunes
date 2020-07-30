export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolumeIcon = document.querySelector('.radio-volume-icon');
    const radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;
    radioVolume.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-pause');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-pause');
            radioStop.classList.remove('fa-play');
        }
    }

    const changeIconVolume = () => {
        if (audio.volume === 0) {
            radioVolumeIcon.classList.add('fa-volume-off')
            radioVolumeIcon.classList.remove('fa-volume-up');
            radioVolumeIcon.classList.remove('fa-volume-down');
        } else if (audio.volume < 0.5) {
            radioVolumeIcon.classList.add('fa-volume-down')
            radioVolumeIcon.classList.remove('fa-volume-up');
            radioVolumeIcon.classList.remove('fa-volume-off');
        } else {
            radioVolumeIcon.classList.add('fa-volume-up')
            radioVolumeIcon.classList.remove('fa-volume-down');
            radioVolumeIcon.classList.remove('fa-volume-off');
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }


    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        const urlImg = parent.querySelector('.radio-img').src;
        const title = parent.querySelector('.radio-name').textContent;

        radioCoverImg.src = urlImg;
        radioHeaderBig.textContent = title;
        radioStop.disabled = false;
        radioVolume.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
        selectItem(parent);
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused)
            audio.play();
        else
            audio.pause();
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        changeIconVolume();
    });
}