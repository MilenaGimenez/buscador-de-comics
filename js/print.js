const root = document.getElementById('root');
const rootPersonajes = document.getElementById('root-personajes');
const select = document.getElementById('select-tipo');
let eleccion 
select.addEventListener('click', (e) => {
    eleccion = e.target.value
})

const printData = arr => {
    let cajita = '';
    arr.forEach(comic => {
        const {title, thumbnail: {extension, path}} = comic;

        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        cajita += 
            `<div class="column is-one-fifth">
                <figure>
                    <a href="#">
                        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                        <p class="american-font">${title}</p>
                    </a>
                </figure>
            </div>`    
    });
    root.innerHTML = cajita;
}

//----------------- PINTAR PERSONAJES -----------------
const printPersonajes = arr => {
    let cajita = '';
    arr.forEach(comic => {
        const {id, name, thumbnail: {extension, path}} = comic;
        console.log()

        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";

        cajita += 
            `<div class="column is-2" onclick="obtenerid(${id})">
                <div class="card">
                    <figure class="image is-4by5 personaje-container">
                        <a href="#">
                            <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="personaje-thumbnail">
                        </a>
                    </figure>

                    <div class="card-content has-background-black has-text-light">
                        <p class="american-font">${name}</p>
                    </div>
                </div>
            </div>`    
    });
    rootPersonajes.innerHTML = cajita;
}