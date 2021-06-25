const privada = '37afe0670192f2777f64326bf4c80cc1e14ff271';
const publica = 'e9522784cddc10be1873e2688faf099b';
const timestamp = Date.now();
const hash = md5(timestamp + privada + publica);

const btnFirst = document.getElementById('btn-first');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');

let offset = 0;
let resultsCount = 0

const fetchData = () => {
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => printData(obj.data.results))
    .catch(error => console.error(error))
};

fetchData()

const fetchTotalComics = () => {
    const url = 'https://gateway.marvel.com:443/v1/public/comics?apikey=e9522784cddc10be1873e2688faf099b'
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => resultsCount = obj.data.total)
    .catch(error => console.error(error))
};

fetchTotalComics()

//----Fetch personajes

const fetchPersonajes = () => {
    const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publica}&hash=${hash}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(datos => printPersonajes(datos.data.results))
    .catch(err => console.error(err))
};

//----------------- PAGINADORES PREVIOUS & NEXT -----------------
btnFirst.addEventListener('click', () => {
    offset = 0
    fetchData() 
    offset === 0 ? btnPrevious.setAttribute("disabled", true) : false
    offset === 0 ? btnFirst.setAttribute("disabled", true) : false 
    console.log(`btnFirst: el offset es de ${offset}`);
});

//boton del problema
btnPrevious.addEventListener('click', () => {
    console.log('offset actual', offset)
    fetchData()   
    fetchTotalComics()
    //obtenerUltimoComic()
    
    offset -= 20;
    offset === 0 ? btnPrevious.setAttribute("disabled", true) : false  
    offset === 0 ? btnFirst.setAttribute("disabled", true) : false   

    //se desbloquean los dos ultimos
    offset !== 0 ? btnNext.removeAttribute("disabled") : false    
    offset !== 0 ? btnLast.removeAttribute("disabled") : false  

    console.log(`btnPrevious: el offset es de ${offset}`);
});

btnNext.addEventListener('click', () => {
    offset += 20;    
    fetchData()
    offset !== 0 ? btnPrevious.removeAttribute("disabled") : false    
    offset !== 0 ? btnFirst.removeAttribute("disabled") : false   
    
    console.log(`btnNext: el offset es de ${offset}`);
});

/* const obtenerUltimoComic = () => {
    btnLast.addEventListener('click', () => {
        console.log(`soy el offset antes de todo: ${offset}`);
        let cuenta = resultsCount - 20;
        //console.log('suma offset y cuenta', offset += cuenta);
        offset += cuenta
        console.log(`soy el offset: ${offset}`);
        console.log('soy cuenta', cuenta);
        
        //cuando se apreta el ultimo se bloquean los dos ultimos
        offset = resultsCount - 20 ? btnNext.setAttribute("disabled", true) : false   
        offset = resultsCount - 20 ? btnLast.setAttribute("disabled", true) : false 

        //cuando se apreta el ultimo se desbloquean los dos primeros
        offset = resultsCount - 20 ? btnPrevious.removeAttribute("disabled") : false 
        offset = resultsCount - 20 ? btnFirst.removeAttribute("disabled") : false

        //console.log(`btnLast: el offset es de ${offset}`);

        console.log(`btnLast: el resultsCount es de ${resultsCount}`);
        console.log(`la cuenta da ${cuenta}`);
        console.log(typeof cuenta);

        fetchData() 
        fetchTotalComics()
    });  
} */

/* const obtenerUltimoComic = () => { */
    btnLast.addEventListener('click', () => {
        console.log('offset antes apretar last', offset)
        offset += resultsCount - 20;
        fetchData() 

        //cuando se apreta el ultimo se bloquean los dos ultimos
        offset = resultsCount - 20 ? btnNext.setAttribute("disabled", true) : false   
        offset = resultsCount - 20 ? btnLast.setAttribute("disabled", true) : false 

        //cuando se apreta el ultimo se desbloquean los dos primeros
        offset = resultsCount - 20 ? btnPrevious.removeAttribute("disabled") : false 
        offset = resultsCount - 20 ? btnFirst.removeAttribute("disabled") : false

        console.log('offset tras apretar last', offset)
    });  
/* }

obtenerUltimoComic() */

//--------------FUNCION DE BUSCAR
const funcionBuscar = () => {
    if (eleccion === 'personajes') {
        fetchPersonajes()
        root.classList.add("is-hidden") 
        rootPersonajes.classList.remove("is-hidden")
    } else {
        rootPersonajes.classList.add("is-hidden") 
        root.classList.remove("is-hidden")
    }
}