const privada = '37afe0670192f2777f64326bf4c80cc1e14ff271';
const publica = 'e9522784cddc10be1873e2688faf099b';
const timestamp = Date.now();
const hash = md5(timestamp + privada + publica);

const btnFirst = document.getElementById('btn-first');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');

let offset = 0;

const fetchData = () => {
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => printData(obj.data.results))
    .catch(error => console.error(error))
}

fetchData()

//----------------- PAGINADORES PREVIOUS & NEXT -----------------
btnFirst.addEventListener('click', () => {
    offset = 0
    fetchData() 
    offset === 0 ? btnPrevious.setAttribute("disabled", true) : false
    offset === 0 ? btnFirst.setAttribute("disabled", true) : false 
});

btnPrevious.addEventListener('click', () => {
    offset -= 20;
    fetchData()   
    offset === 0 ? btnPrevious.setAttribute("disabled", true) : false  
    offset === 0 ? btnFirst.setAttribute("disabled", true) : false   
});

btnNext.addEventListener('click', () => {
    offset += 20;    
    fetchData()
    offset !== 0 ? btnPrevious.removeAttribute("disabled") : false    
    offset !== 0 ? btnFirst.removeAttribute("disabled") : false    
});