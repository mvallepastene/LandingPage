
//Evento Change del input
const selectElement = document.querySelector('#name');

selectElement.addEventListener('change', (event) => {
    var dato = $("#name").val();
    buscarPais(dato);
});


//Funcion que llama a la API y retorna renderizada la información

function buscarPais (nombre){
var name = nombre;


//tarjeta a renderizar
var tar = '<div class="tarjeta">'
+'<div class="tarjeta-header"> Bandera: <img src="#FLAG#" width="25"/> <p>Nombre País:  #NAMECOUNTRY#</p></div>'
+'<div class="tarjeta-body">'
+'<p>Capital: #CAPITAL#</p>'
+'<p>Región: #REGION#</p>'
+'<p>Lengua: #LANGUAGE#</p>'
+'<p>Moneda: #CURRENCY# #NAME#</p>'
+'<p>Paises Limitrofes: #BORDERS#</p>'
+'</div>'
+'<div class="tarjeta-footer"></div>'
+'</div>';

$.ajax ({
    url:'https://restcountries.eu/rest/v2/name/'+name,
    dataType:'json',
    method: 'get',
    success: function(r){
        //almacenamos el resultado de la consulta para recorrer el arreglo de datos
        var datos = r;

        if(datos != null){
        var props = "";
        //recorremos el arreglo de informacion recibida
        datos.forEach(function(d, p){
            //creamos el Elemento Html que mostraremos en el body
             if(d != null){
                 var lang = d.languages;
                 var curr = d.currencies;
                 var x = tar;
                 x = x.replace("#FLAG#", d['flag']);
                 x = x.replace("#NAMECOUNTRY#", d['name']);
                 x = x.replace('#CAPITAL#', d['capital']);
                 x = x.replace("#REGION#", d['region']);
                 lang.forEach(function(l,d){
                    x = x.replace("#LANGUAGE#", l['nativeName']);
                 });
                 curr.forEach(function(c,d){
                    x = x.replace("#CURRENCY#", c['symbol']);
                    x = x.replace("#NAME#", c['name']);
                    
                 });
                 x = x.replace("#BORDERS#", d['borders']);
                
                 props += x;
             }

             
        } );
           
        //le pasamos los datos seteados a la tarjeta
        $('#tarjeta').html(props);
    }
    }
})
}