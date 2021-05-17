//main.js encargado de pintar
const root = document.getElementById('root');
// const botton2 = document.getElementById('boton2');

const printData = arr => {
    let cajita = '';
    arr.forEach(comic => {
        //destructuracion
        const {title, thumbnail: {extension, path}} = comic;//de comic vamos a sacar el titulo y el thumbnail, lo guardamos en un objeto. el : es para entrar al contenido de otro objeto.
        //path es la url y extension la extension 
        //para las imagenes que no tienen img con un if se puede cambiar. hacer qoe ocupe el 100% del alto
        //para el paginado cambiar el  limit  yel offset, en la proxima cambiarle el offset a 20 si empezo en 0.
        //tiene que sumar 20 a offset y hacer una nueva peticion al fetch
        //deberíamos ponerle una condición de que si es 0 no siga restando

        const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
        const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
        cajita += 
            `<div class="column is-one-fifth">
                <figure>
                    <a href="#">
                        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                        <p>${title}</p>
                    </a>
                </figure>
            </div>`    
    });
    root.innerHTML = cajita;
}