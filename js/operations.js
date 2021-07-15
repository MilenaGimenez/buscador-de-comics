const privada = '37afe0670192f2777f64326bf4c80cc1e14ff271';
const publica = 'e9522784cddc10be1873e2688faf099b';
const timestamp = Date.now();
const hash = md5(timestamp + privada + publica);

const btnFirst = document.getElementById('btn-first');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');



/* const containerComics = document.getElementById('container-comics');
const containerComicInfo = document.getElementById('container-comic-info');
const containerCharacterInfo = document.getElementById('container-character-info'); */

let offset = 0;
let resultsCount = 0

url = `https://gateway.marvel.com/v1/public/comics?&orderBy=title&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`

const fetchData = (url) => {
    /* const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}` */
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => printData(obj.data.results, obj.data.total))
    .catch(error => console.error(error))
};

fetchData()

const fetchTotalComics = () => {
    const url = 'https://gateway.marvel.com:443/v1/public/comics?apikey=e9522784cddc10be1873e2688faf099b'
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => {resultsCount = obj.data.total
    console.log(obj.data)})
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

//-----Fetch Id (nuevo codigo)
let comicId = '';
const getId = id => {    
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
      .then(resp => resp.json())
      .then(obj => printDetailComic(obj.data.results))
      comicId = id
      getCharacterComicId(comicId)
      return comicId
};

//----Fetch id de personaje (nuevo codigo)
const getCharacterComicId = (id) => {
    let offsetComic = 0; 
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?limit=5&offset=${offsetComic}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => {
          const totalComics = obj.data.total;
          //checkOffset(totalComics)
          console.log(totalComics, offsetComic);
          console.log(obj.data.results)
          printCharactersComic(obj.data.results, comicCharactersResults, comicCharactersInfo)
        //   printCharactersInfo(obj.data.results)
        }
          )
          
        .catch(err => console.error(err))
        //new
        /* comicId = id
        getCharacterComicId(comicId)
        return comicId */
  };


//---Fetch info del personaje (codigo nuevo)
// const prueba = () => {alert('funciono')}
/* const getCharacterInfo = (id) => {
    let offsetComic = 0; 
    const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?limit=5&offset=${offsetComic}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => {
        //   const totalComics = obj.data.total;
          //checkOffset(totalComics)
        //   console.log(totalComics, offsetComic);
          console.log(obj.data.results)
          //printCharactersComic(obj.data.results, comicCharactersResults, comicCharactersInfo)
          printCharactersInfo(obj.data.results)
        //   console.log(printCharactersInfo)
        }
          )
          
        .catch(err => console.error(err))
  }; */

let characterId = '';
const getCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => printInfoCharater(obj.data.results))
        .catch(err => console.error(err))
    characterId = id
    getComicsCharacterId(characterId)
    return characterId
};

const getComicsCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then(obj => {printComicsCharacter(obj.data.results, obj.data.total)
        console.log(obj.data.total)})
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
/* const selectType = document.getElementById('select-tipo');

let eleccion 
selectType.addEventListener('click', (e) => {
    eleccion = e.target.value
    console.log(eleccion)
})

let busqueda = ''
const escribirInput = () => {
    searchInput.addEventListener('keyup', e => {
        busqueda = e.target.value
        console.log(busqueda)
    })     
}
const prueba = () => {
    const input = searchInput.value
    const type = searchType.value
    const order = searchOrder.value
    const url = `https://gateway.marvel.com/v1/public/${type}?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => {resultsCount = obj.data.total
    console.log(obj.data)
    buscarNombre(obj.data.results)})
    .catch(error => console.error(error))
};



const buscarNombre = (arr) => {
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}, id} = comic;

        console.log(comic)

        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        
    });
}

const funcionBuscar = () => {
    if (eleccion === 'personajes') {
        fetchPersonajes()
        root.classList.add("is-hidden") 
        rootPersonajes.classList.remove("is-hidden")

        containerCharacterInfo.classList.add("is-hidden") 
        containerComicInfo.classList.add("is-hidden") 
    } else {
        rootPersonajes.classList.add("is-hidden") 
        root.classList.remove("is-hidden")
        
    }
    escribirInput()
    prueba()
    console.log(busqueda)
} */


//-----------------------funcion de buscar (new code)
const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('select-tipo');
const searchOrder = document.getElementById('search-order');
const searchBtn = document.getElementById('search-btn');


//Search-Nav

const fetchCharacters = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            printCharactersComic(obj.data.results, '', root)
            /* total = obj.data.total
            totalResult.innerHTML = total */
            console.log(obj.data.results)
        })
        .catch(err => console.error(err))
};

const searchURLUpdate = () => {
    const input = searchInput.value
    const type = searchType.value
    const order = searchOrder.value
    let url2 = ''
    if (type === 'comics' && input != '') {
        url2 = `https://gateway.marvel.com/v1/public/${type}?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchData(url2)
    }
    if (type === 'comics' && input === '') {
        url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchData(url)
    }
    if (type === 'characters' && input != '') {
        const url3 = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchCharacters(url3)
    }
    if (type === 'characters' && input === '') {
        const url4 = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
        fetchCharacters(url4)
    };

}

searchBtn.addEventListener('click', searchURLUpdate);

searchType.addEventListener('change', () => {
    const type = searchType.value
    if (type === 'comics') {
        searchOrder.innerHTML = `
        <option value='title'>A/Z</option>
        <option value='-title'>Z/A</option>
        <option value='-focDate'>Más nuevos</option>
        <option value='focDate'>Más viejos</option> 
        `
    }
    if (type === 'characters') {
        searchOrder.innerHTML = `
        <option value='name'>A/Z</option>
        <option value='-name'>Z/A</option>
        `
    }
})

window.onload = () => {
    fetchData(url);
    //disabledBtn();
}