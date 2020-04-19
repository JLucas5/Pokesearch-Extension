function listenForClicks() {

    document.addEventListener("click", (e) => {

        function pokeNameToURL(pokeName) {
        switch (pokeName) {
            case "Snorlax":
            return browser.extension.getURL("pokes/Snorlax.png");
            case "Absol":
                return browser.extension.getURL("pokes/Absol.png");
                }
        }

        function pokeShow(tabs) {
            let url = pokeNameToURL(e.target.textContent)
            browser.tabs.sendMessage(tabs[0].id, {
                command: "pokeshow",
                pokeURL: url
            })
        }

        function reset(tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
                })
        }

        function reportError(error) {
        console.error(`Could not pokeshow: ${error}`);
        }

 
        if (e.target.classList.contains("button")) {
        browser.tabs.query({active: true, currentWindow: true})
        .then(pokeShow)
        .catch(reportError);
        }else if(e.target.classList.contains("reset")) {
            browser.tabs.query({active: true, currentWindow: true})
            .then(reset)
            .catch(reportError);
        }
    });
}

function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/pokeshow.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError)
