class Sound{
    constructor(source)
    {
        this.sound = document.createElement("audio");
        this.sound.src = source;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }

    setLoop()
    {
        this.sound.loop = 1;
    }

    play()
    {
      this.sound.play();
    }
    stop()
    {
        this.sound.pause();
    }
}

