var Application = (function() {

    function Application() { 
        load("hide");
    }

    // HELPERS
    function load(status, text) {
        var btns = document.querySelectorAll("button, input");
        var loader = document.getElementById("loader");

        function setState(block) {
            for (var i = 0; i < btns.length; i++) {
                if (block) btns[i].setAttribute("disabled", "disabled");
                else btns[i].removeAttribute("disabled");
            }
        }

        if (text) {
            loader.classList.add("with-text");
            var span = document.createElement("span");
            span.innerHTML = text;
            loader.appendChild(span);
        }

        switch (status) {
            case "show":
                setState(true);
                loader.removeAttribute("hidden");
                document.body.classList.add("onload");
                break;
            default:
                var loaderText = loader.getElementsByTagName("span")[0] || null;
                setState();
                loader.classList.remove("with-text");
                document.body.classList.remove("onload");
                if (loaderText) loaderText.remove();
                loader.setAttribute("hidden", true);
        }
    }

    return Application;
})();

window.onload = new Application();
