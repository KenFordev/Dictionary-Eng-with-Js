const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningConEl = document.getElementById("meaning-container");
const titleEl =  document.getElementById("title");
const meaning =  document.getElementById("meaning");
const audioEl =  document.getElementById("audio");


async function fetchAPI (word) {
    try {
        infoTextEl.style.display = "block";
        meaningConEl.style.display = "none";
        
        infoTextEl.innerText = `Searching the meaning of "${word}"...`

        const urlApi = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(urlApi).then((res) => res.json());
        
        if(result.title){
            
            titleEl.innerText = `${result.title} "${word}"`;
            meaning.innerText = "N/A";
            audio.style.display = "none";
        }else {
            audio.style.display = "inline-flex";
            titleEl.innerText = result[0].word;
            meaning.innerText = result[0].meanings[0].definitions[0].definition;
            audio.src = result[0].phonetics[0].audio;
        }
        meaningConEl.style.display = "block";
        infoTextEl.style.display = "none";
        
        

    } catch (error) {
        console.log(error);
    }
    
}

inputEl.addEventListener("keyup", (e) => {
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
})