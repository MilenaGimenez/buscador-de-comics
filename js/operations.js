const privada = '37afe0670192f2777f64326bf4c80cc1e14ff271';
const publica = 'e9522784cddc10be1873e2688faf099b';
const timestamp = Date.now();
const hash = md5(timestamp + privada + publica);

const btnFirst = document.getElementById('btn-first');
const btnPrevious = document.getElementById('btn-previous');
const btnNext = document.getElementById('btn-next');
const btnLast = document.getElementById('btn-last');

const searchInput = document.getElementById('search-input');
const searchType = document.getElementById('select-tipo');
const searchOrder = document.getElementById('search-order');
const searchBtn = document.getElementById('search-btn');



/* const containerComics = document.getElementById('container-comics');
const containerComicInfo = document.getElementById('container-comic-info');
const containerCharacterInfo = document.getElementById('container-character-info'); */

let offset = 0;
let resultsCount = 0
let input = searchInput.value;
let order = searchOrder.value;
let type = searchType.value;

//url = `https://gateway.marvel.com/v1/public/comics?&orderBy=title&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`

const fetchData = (input, order) => {
    //const urlPrueba = `https://gateway.marvel.com/v1/public/comics?&orderBy=title&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    let url;
    if (input !== "") {
        url = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
      } else {
        url = `https://gateway.marvel.com/v1/public/comics?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
      }
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(obj => printData(obj.data.results, obj.data.total))
    .catch(error => console.error(error))
    console.log(offset);
    console.log(url);
    console.log(`https://gateway.marvel.com/v1/public/comics?&orderBy=title&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`);
};

//fetchData()

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

const fetchPersonajes = (input, order) => {
    // const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publica}&hash=${hash}`
    resultsCount = undefined;
    let url;
    if (input !== "") {
        url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    } else {
        url = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    }
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



let characterId = '';
const getCharacterId = (id) => {
    resultsCount = undefined;
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
    fetch(url)
        .then(response => response.json())
        .then((obj) => {
            printInfoCharater(obj.data.results)
            resultsCount = obj.data.results[0].comics.available;
        })
        .catch(err => console.error(err))
    characterId = id
    getComicsCharacterId(characterId)
    return characterId
};

const getComicsCharacterId = (id) => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(obj => {printComicsCharacter(obj.data.results, obj.data.total)
        console.log(obj.data.total)})
        .catch(err => console.error(err))
};


//----------------------------btn subir arriba
const btnUpContainer = document.querySelector('.go-top-container');

window.onscroll = function(){
    if(document.documentElement.scrollTop > 100){
        btnUpContainer.classList.add('show')
    } else {
        btnUpContainer.classList.remove('show')
    }
}

btnUpContainer.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})


//-----------------------funcion de buscar (new code)



//Search-Nav

const fetchCharacters = (input, order) => {
    let url;
    if (input !== "") {
        url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${input}&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    } else {
        url = `https://gateway.marvel.com/v1/public/characters?&orderBy=${order}&limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    }
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
    
    /* let url2 = ''
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
    }; */
    // total = undefined;
    offset = 0;
    input = searchInput.value;
    type = searchType.value;
    order = searchOrder.value;
  
    if (type === "comics") {
      fetchData(input, order);
    }
  
    if (type === "characters") {
      fetchCharacters(input, order);
    }

}

searchBtn.addEventListener('click', () => {
    searchURLUpdate()
    containerCharacterInfo.classList.add('is-hidden')
    console.log(input = '');
});

searchType.addEventListener('change', () => {
    type = searchType.value
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

// // Pagination

const firstPage = (func) => {
    offset = 0;
    func();
    pageNumber = 1;
    return offset;
  };
  
  const previewsPage = (func) => {
    offset -= 20;
    func();
    pageNumber = Math.floor(offset / 20) + 1;
    return offset;
  };
  
  const nextPage = (func) => {
    offset += 20;
    func();
    pageNumber = Math.floor(offset / 20) + 1;
    return offset;
  };
  
  const lastPage = (func) => {
    const isExact = resultsCount % 20 === 0;
    const pages = Math.floor(resultsCount / 20);
    offset = (isExact ? pages - 1 : pages) * 20;
    offset = resultsCount - (resultsCount % 20);
    func();
    pageNumber = Math.floor(offset / 20) + 1;
    return offset;
  };

window.onload = () => {
    fetchData(input, order);
    //fetchData(url);
    //disabledBtn();
}