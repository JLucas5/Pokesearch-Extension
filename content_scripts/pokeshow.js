(function() {
   
    if (window.hasRun) {
      return;
    }
    window.hasRun = true;

    let rotation = "left"
  
    function insertPokemon(pokeURL) {
      let pokeImage = document.createElement("img")
      pokeImage.setAttribute("src", pokeURL)
      pokeImage.style.height = "15vh"
      pokeImage.className = "poke-image"
      pokeImage.style.position = "absolute"
      pokeImage.style.zIndex = "1000"

      pokeImage.style.left = (Math.floor(Math.random() * 75) + 1) + "vw"
      pokeImage.style.top = (Math.floor(Math.random() * 75) + 1) + "vh"

      pokeImage.style.transitionDuration = "1s"

      pokeImage.style.transitionTimingFunction = "ease-in-out"
      pokeImage.style.webkitTransitionTimingFunction = "ease-in-out"

      document.body.appendChild(pokeImage);

    }
    

    function removeExistingPokes() {
      let existingPokes = document.querySelectorAll("#poke-image");
      for (let poke of existingPokes) {
        poke.remove();
      }
    }
    
    document.addEventListener("click", (e) => {
      
      if(e.target.classList.contains("poke-image")){
          if(e.target.walking === true){
            return
          }
          e.target.walking = true
          e.target.side = "left"
          window.setInterval(() => {
                if(e.target.side == "left"){
                    e.target.style.transform = "rotate(15deg)"
                    e.target.side = "right"
                }
                else if(e.target.side == "right"){
                    e.target.style.transform = "rotate(-15deg)" 
                    e.target.side = "left"             }
                    
            }, 1050)
            window.setInterval(() => {
              e.target.style.top = (Math.floor(Math.random() * 75) + 1) + "vh"
              e.target.style.left = (Math.floor(Math.random() * 75) + 1) + "vw"
            }, 2000)
        }
    })

    browser.runtime.onMessage.addListener((message) => {
      if (message.command === "pokeshow") {
            console.log("mensagem recebida")
            insertPokemon(message.pokeURL)
      } else if (message.command === "reset") {
            removeExistingPokes();
      }
    });
  
  })();