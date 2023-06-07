import React, { useEffect, useState } from 'react';

function CustomVideo({ url, className }) {
  const [container, setContainer] = useState();

  let mainVideo;
  let videoTimeline;
  let progressBar;
  let volumeBtn;
  let volumeSlider;
  let currentVidTime;
  let videoDuration;
  // let skipBackward;
  // let skipForward;
  // let playPauseBtn;
  // let speedBtn;
  let speedOptions;
  // let pipBtn;
  let fullScreenBtn;
  let timer;

  // Load Container and CSS Classes to control its element
  useEffect(() => {
    setContainer(document.querySelector('.container'));
  }, []);
  // If Container is not null then load its child elements as well, otherwise a querySelector cant be NULL error appears
  if (container !== null && container !== undefined) {
    mainVideo = container.querySelector('video');
    videoTimeline = container.querySelector('.video-timeline');
    progressBar = container.querySelector('.progress-bar');
    volumeBtn = container.querySelector('.volume i');
    volumeSlider = container.querySelector('.left input');
    currentVidTime = container.querySelector('.current-time');
    videoDuration = container.querySelector('.video-duration');
    // skipBackward = container.querySelector('.skip-backward i');
    // skipForward = container.querySelector('.skip-forward i');
    // playPauseBtn = container.querySelector('.play-pause i');
    // speedBtn = container.querySelector('.playback-speed span');
    speedOptions = container.querySelector('.speed-options');
    // pipBtn = container.querySelector('.pic-in-pic span');
    fullScreenBtn = container.querySelector('.fullscreen i');
  }

  // Hide controls if mouse moves
  if (container !== null && container !== undefined) {
    const hideControls = () => {
      if (mainVideo.paused) return;
      timer = setTimeout(() => {
        container.classList.remove('show-controls');
      }, 2000);
    };
    hideControls();

    container.addEventListener('mousemove', () => {
      container.classList.add('show-controls');
      clearTimeout(timer);
      hideControls();
    });
  }

  const [videoPlaying, setVideoPlaying] = useState(false);

  // Pause Video function
  const playVideo = () => {
    if (mainVideo !== undefined) {
      setVideoPlaying(true);
      mainVideo.play();
    }
  };
  // Play Video function
  const pauseVideo = () => {
    if (mainVideo !== undefined) {
      setVideoPlaying(false);
      mainVideo.pause();
    }
  };

  // Pause Video function
  const playForward = () => {
    if (mainVideo !== undefined) {
      mainVideo.currentTime += 5;
    }
  };
  // Play Video function
  const playBackwards = () => {
    if (mainVideo !== undefined) {
      mainVideo.currentTime -= 5;
    }
  };

  // Progress bar update
  const formatTime = (time) => {
    // eslint-disable-next-line
    let seconds = Math.floor(time % 60),
      minutes = Math.floor(time / 60) % 60,
      hours = Math.floor(time / 3600);

    seconds = seconds < 10 ? `0${seconds}` : seconds;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    hours = hours < 10 ? `0${hours}` : hours;

    if (hours === 0) {
      return `${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  // Video Content
  // eslint-disable-next-line
  if (container !== null && container !== undefined) {
    mainVideo.addEventListener('timeupdate', (e) => {
      // eslint-disable-next-line
      let { currentTime, duration } = e.target;
      // eslint-disable-next-line
      let percent = (currentTime / duration) * 100;
      progressBar.style.width = `${percent}%`;
      currentVidTime.innerText = formatTime(currentTime);
    });

    // Update Total Video Time
    mainVideo.addEventListener('loadeddata', () => {
      videoDuration.innerText = formatTime(mainVideo.duration);
    });

    // Update Progress bar on click, jumps to video time
    videoTimeline.addEventListener('click', (e) => {
      // eslint-disable-next-line
      let timelineWidth = videoTimeline.clientWidth;
      mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
    });

    // Make Video Timeline Draggable
    const draggableProgressBar = (e) => {
      // eslint-disable-next-line
      let timelineWidth = videoTimeline.clientWidth;
      progressBar.style.width = `${e.offsetX}px`;
      mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
      currentVidTime.innerText = formatTime(mainVideo.currentTime);
    };
    videoTimeline.addEventListener('mousedown', () =>
      videoTimeline.addEventListener('mousemove', draggableProgressBar),
    );
    document.addEventListener('mouseup', () =>
      videoTimeline.removeEventListener('mousemove', draggableProgressBar),
    );

    // Update timeline time on mouse move and hover
    videoTimeline.addEventListener('mousemove', (e) => {
      // eslint-disable-next-line
      let timelineWidth = videoTimeline.clientWidth;
      // eslint-disable-next-line
      let offsetX = e.offsetX;
      // eslint-disable-next-line
      let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
      const progressTime = videoTimeline.querySelector('span');
      offsetX = offsetX < 20 ? 20 : offsetX > timelineWidth - 20 ? timelineWidth - 20 : offsetX;
      progressTime.style.left = `${offsetX}px`;
      progressTime.innerText = formatTime(percent);
    });
  }

  // Volume Controls
  const muteUnmuteVolume = () => {
    if (!volumeBtn.classList.contains('fa-volume-high')) {
      mainVideo.volume = 0.5;
      volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
    } else {
      mainVideo.volume = 0.0;
      volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
    }
    volumeSlider.value = mainVideo.volume;
  };
  if (container !== null && container !== undefined) {
    // eslint-disable-next-line
    volumeSlider.addEventListener('input', (e) => {
      mainVideo.volume = e.target.value;
      if (e.target.value === 0) {
        return volumeBtn.classList.replace('fa-volume-high', 'fa-volume-xmark');
      }
      volumeBtn.classList.replace('fa-volume-xmark', 'fa-volume-high');
    });
  }

  // SPeed OPtions
  const toggleSpeedOptions = () => {
    if (container !== null && container !== undefined) {
      speedOptions.classList.toggle('show');
    }
  };

  if (container !== null && container !== undefined) {
    speedOptions.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        mainVideo.playbackRate = option.dataset.speed;
        speedOptions.querySelector('.active').classList.remove('active');
        option.classList.add('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (e.target.tagName !== 'SPAN' || e.target.className !== 'material-symbols-rounded') {
        speedOptions.classList.remove('show');
      }
    });
  }

  // PicInPic Button
  const togglePIP = () => {
    if (container !== null && container !== undefined) {
      mainVideo.requestPictureInPicture();
    }
  };

  // Fullscreen options
  if (container !== null && container !== undefined) {
    // eslint-disable-next-line
    fullScreenBtn.addEventListener('click', () => {
      container.classList.toggle('fullscreen');
      if (document.fullscreenElement) {
        fullScreenBtn.classList.replace('fa-compress', 'fa-expand');
        return document.exitFullscreen();
      }
      fullScreenBtn.classList.replace('fa-expand', 'fa-compress');
      container.requestFullscreen();
    });
  }

  return (
    <div>
      <div className="show-controls container">
        <div className="wrapper">
          <div className="video-timeline">
            <div className="progress-area">
              <span>00:00</span>
              <div className="progress-bar" />
            </div>
          </div>
          <ul className="video-controls">
            <li className="options left">
              {/* Volume Controls */}
              <button type="button" onClick={muteUnmuteVolume} className="volume">
                <i className="fa-solid fa-volume-high" />
              </button>
              <input type="range" min="0" max="1" step="any" />

              <div className="video-timer">
                <p className="current-time">00:00</p>
                <p className="separator"> / </p>
                <p className="video-duration">00:00</p>
              </div>
            </li>
            <li className="options center">
              <button type="button" onClick={playBackwards} className="skip-backward">
                <i className="fas fa-backward" />
              </button>
              {videoPlaying ? (
                <button type="button" onClick={pauseVideo} className="play-pause">
                  <i className="fas fa-pause" />
                </button>
              ) : (
                <button type="button" onClick={playVideo} className="play-pause">
                  <i className="fas fa-play" />
                </button>
              )}
              <button type="button" onClick={playForward} className="skip-forward">
                <i className="fas fa-forward" />
              </button>
            </li>
            <li className="options right">
              <div className="playback-content">
                <button type="button" onClick={toggleSpeedOptions} className="playback-speed">
                  <span className="material-symbols-rounded">slow_motion_video</span>
                </button>
                <ul className="speed-options">
                  <li data-speed="2">2x</li>
                  <li data-speed="1.5">1.5x</li>
                  <li data-speed="1" className="active">
                    Normal
                  </li>
                  <li data-speed="0.75">0.75x</li>
                  <li data-speed="0.5">0.5x</li>
                </ul>
              </div>
              <button type="button" onClick={togglePIP} className="pic-in-pic">
                <span className="material-icons">picture_in_picture_alt</span>
              </button>
              <button type="button" className="fullscreen">
                <i className="fa-solid fa-expand" />
              </button>
            </li>
          </ul>
        </div>
        <video className={className} src={url} />
      </div>
    </div>
  );
}
export default CustomVideo;
