

const app = () =>{
    const song = document.querySelector('.song'); 
    const play = document.querySelector('.play'); 
    const outline = document.querySelector('.moving-outline circle');
    const timeSelect = document.querySelectorAll('.select-time button');
    const video = document.querySelector('.default-vid video'); 

    
    // All the sounds 
    const sounds = document.querySelectorAll('.pick-sound button'); 

    // Time display 
    const timeDisplay = document.querySelector('.time-display'); 

    // outline length: 
    const outlineLength = outline.getTotalLength(); 

    // Duration 
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength; 
    outline.style.strokeDashoffset = outlineLength;

    // Pick different sounds. 

    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound'); 
            video.src = this.getAttribute('data-video'); 
            checkPlaying(song);
        })
    })

    // Play sound 
    play.addEventListener('click', ()=>{
        checkPlaying(song);
    }); 

    // Select sound 
    timeSelect.forEach(option => {
        option.addEventListener('click', function(){
            fakeDuration = this.getAttribute('data-time'); 
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`; 
        });
    })

    // Just play or pause songs 
    const checkPlaying = song =>{   
        if(song.paused){
            song.play(); 
            video.play();
            play.src="./svgs/pause.svg";

        }else {
            song.pause(); 
            video.pause();
            play.src = './svgs/play.svg';
            }
    }; 


    // Animate the circle 
    song.ontimeupdate = ()=>{
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime; 
        let seconds = Math.floor(elapsed % 60); 
        let minutes = Math.floor(elapsed / 60);


        // Animate the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength; 
        outline.style.strokeDashoffset = progress;

        // Animate the text
        timeDisplay.textContent = `${minutes}:${seconds}`; 
        if(currentTime >= fakeDuration){
            song.pause(); 
            song.currentTime = 0;
            play.src = './svgs/play.svg';  
            video.pause()
        }
    }
};

app();