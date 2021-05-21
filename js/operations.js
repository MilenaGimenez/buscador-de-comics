const privada = '37afe0670192f2777f64326bf4c80cc1e14ff271';
const publica = 'e9522784cddc10be1873e2688faf099b';
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');

let offset = 0;

const fetchData = () => {
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => printData(obj.data.results))
    .catch(error => console.error(error))
}

fetchData()

boton1.addEventListener('click', () => {
    offset -= 20;
    fetchData()
})

boton2.addEventListener('click', () => {
    offset += 20;
    fetchData()
})