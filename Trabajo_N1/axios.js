
function buscador() {

	// valor de api_key
	let API_KEY = '523532';

	// rescato valor del formulario de busqueda y boton
	const artista = document.getElementById("buscar").value;

	// extracción de discografia por artista.  Modo async con axios
	const cargarDiscografia = async() => {
	try {
		const listaDiscografia = await axios.get(`https://theaudiodb.com/api/v1/json/${API_KEY}/searchalbum.php`, {
            params: {
                s: `${artista}`
            }
        })
	
		// console.log(respuesta);

		// Si la respuesta de la API es correcta 
		if(listaDiscografia.status === 200){

			let count2 = listaDiscografia.data.album.length;
			//console.log(count);

			// ciclo para recorrer y estraer la información del response en formato 
			
			if (count2 > 0) {
	
			for (x = 0; x < count2; x++) {
	
				//console.log(listaDiscografia.data.album[x].intYearReleased);
				//console.log(listaDiscografia.data.album[x].strAlbum);

				document.getElementById('discografia')
				.insertAdjacentHTML(
				  'beforeend',
				  `
				  	<div class="album">
				  		<img class="poster" src="${listaDiscografia.data.album[x].strAlbumThumb}">
				  		<h3 class="titulo">${listaDiscografia.data.album[x].strAlbum}</h3>
						<h5>${listaDiscografia.data.album[x].intYearReleased}</h5>
			  		</div>
				  `
				);
				}
			}

		} else if(respuesta.status === 401){
			console.log('Pusiste la llave mal');
		} else if(respuesta.status === 404){
			console.log('El album que buscas no existe');
		} else {
			console.log('Hubo un error y no sabemos que paso');
		}

	} catch(error){
		console.log(error);
	}

}


const obtenerIdArtista = async() => {

    // utilizando ASYNC
    try {
        // rescata información de artista
        const respuesta = await axios.get(`https://www.theaudiodb.com/api/v1/json/${API_KEY}/search.php?`, {
            params: {
                s: `${artista}`
            }
        })

        //console.log(respuesta.data);
        //console.log(respuesta.status);

        if (respuesta.status === 200) {

            //console.log(respuesta.data.artists[0].strArtist);
            //console.log(respuesta.data.artists[0].strArtistBanner);
			//console.log(respuesta.data.artists[0].strWebsite);
            //console.log(respuesta.data.artists.length);

            document.getElementById('contenedor')
            .insertAdjacentHTML(
              'beforeend',
              `
				<div class="container">
					<div class="row" style="margin-top: 80px;">
						<div class="col-4">
							<img src="${respuesta.data.artists[0].strArtistThumb}" class="img-fluid" alt="Responsive image" >
						</div>
					<div class="col-8">
						<h1>${respuesta.data.artists[0].strArtist}</h1>
						<p>${respuesta.data.artists[0].strStyle}</p>
						<p>${respuesta.data.artists[0].strGenre}</p>
						<p><a href="http://${respuesta.data.artists[0].strWebsite}"  target="_blank">${respuesta.data.artists[0].strWebsite}</a></p>
						<img src="${respuesta.data.artists[0].strArtistBanner}" class="img-fluid" alt="Responsive image">
					</div>
				</div>

            ` 
            );

			if (respuesta.data.artists[0].strBiographyES !== null) {

				document.getElementById('biografia')
                .insertAdjacentHTML(
                    'beforeend',
                    `
						<div class="container">
							<div class="row">
								<div class="col" style="margin-top: 40px;">
									<h2>Biografía</h2>
									<p id="biografia" style="text-align: justify">${respuesta.data.artists[0].strBiographyES}</p>
									<h2>Discografía</h2>
								</div>
							</div>
						</div>
                    `
                );

			} else {
				document.getElementById('biografia')
                .insertAdjacentHTML(
                    'beforeend',
                    `
						<div class="container">
							<div class="row">
								<div class="col" style="margin-top: 40px;">
									<h2>Biografía</h2>
									<p id="biografia" style="text-align: justify">Sin Información de Biografía</p>
									<h2>Discografía</h2>
								</div>
							</div>
						</div>
                    `
                );
			}
        }            

    } catch(error){
   console.log(' Esto no funciona.  Leer el error :  \n\n',error);
    }
}

obtenerIdArtista();
cargarDiscografia();
}