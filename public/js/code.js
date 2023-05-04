const seleccionarAtaque=document.getElementById("seleccion de ataque")
const botonMascota=document.getElementById("boton-seleccionar")
const botonReiniciar=document.getElementById("boton-Reiniciar")
const contenedorAtaques=document.getElementById("contenedor-ataques")

const seleccionarMascota=document.getElementById("seleccion de mascota")
const spanMascotaJugador=document.getElementById("Nombre-Mascota")

const spanPC=document.getElementById("Mascota-Enemigo")

const vidas=document.getElementById("vidas")
const vidasEnemigo=document.getElementById("vidas-enemigo")

const mensajes=document.getElementById("resultado")
const ataquedeljugador=document.getElementById("ataquejugador")
const ataqueEnemigo=document.getElementById("ataqueEnemigo")
const contenedorTarjetas=document.getElementById("contenedor-tarjetas")
const sectionVerMapa=document.getElementById("verMapa")
const mapa=document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let opcionMokepones
let losBichos = []
let ataquePC=[]
let ataquejugador=[]
let mokeponesEnemigos = []
let mascotaJugadorObjeto
let inputHipogue
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonAgua
let botonFuego 
let botonTierra 
let botones=[]
let indexAtaqueEnemigo
let indexAtaqueJugador
let victoriasJugador=0
let victoriasEnemigo=0
let count=3
let countdown=3
let lienzo = mapa.getContext("2d")//con esto ceramos el contecto y se nos permite realizar un dibujo en el canvas 
let intervalo
let mapaBackgrond = new Image()
mapaBackgrond.src = "/assets/mokemap.png"
let alturaBuscada
let anchoMapa = window.innerWidth - 20
const anchoMaximo= 540
if(anchoMapa>anchoMaximo){
    anchoMapa = anchoMaximo -100
}
alturaBuscada = anchoMapa *540/620
mapa.width = anchoMapa
mapa.height = alturaBuscada

class Mokepon{
    constructor(nombre,foto,vida,fotoMapa, id = null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques =[]
        this.ancho = 40
        this.alto = 40
        this.x = aleatorioPC(0, anchoMapa - this.ancho)
        this.y = aleatorioPC(0, alturaBuscada - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadx=0
        this.velocidady=0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
           )
    }
}
let HIPOGE = new Mokepon("Hipodoge", "/assets/Hipoge.png",5, "/assets/Copia de Hipoge.png")
let CAPIPEGO = new Mokepon("Capipepo", "/assets/capipego.png" , 5, "/assets/Copia de capipego.png")
let RATIGUEYA = new Mokepon("Ratigueya", "/assets/Ratigueya.png", 5, "/assets/Copia de Ratigueya.png")

const HIPOGEataques = [
    {nombre:"💧💧", id:"boton-agua"}, 
    {nombre:"💧💧", id:"boton-agua"},
    {nombre:"💧💧", id:"boton-agua"},
    {nombre:"🔥🔥", id:"boton-fuego"},
    {nombre:"🪴🪴", id:"boton-tierra"},
]
const CAPIPEGOataques = [
    {nombre:"🔥🔥", id:"boton-fuego"},
    {nombre:"🔥🔥", id:"boton-fuego"},
    {nombre:"🔥🔥", id:"boton-fuego"},
    {nombre:"💧💧", id:"boton-agua"},
    {nombre:"🪴🪴", id:"boton-tierra"},
]
const RATIGUEYAataques = [
    {nombre:"🪴🪴", id:"boton-tierra"},
    {nombre:"🪴🪴", id:"boton-tierra"},
    {nombre:"🪴🪴", id:"boton-tierra"},
    {nombre:"💧💧", id:"boton-agua"},
    {nombre:"🔥🔥", id:"boton-fuego"},
]
HIPOGE.ataques.push(...HIPOGEataques)

CAPIPEGO.ataques.push(...CAPIPEGOataques)

RATIGUEYA.ataques.push(...RATIGUEYAataques)
/*
HIPOGEenemigo.ataques.push(...HIPOGEataques)

CAPIPEGOenemigo.ataques.push(...CAPIPEGOataques)

RATIGUEYAenemigo.ataques.push(...RATIGUEYAataques)
*/
losBichos.push(HIPOGE, CAPIPEGO, RATIGUEYA) 

function carga(){
    seleccionarAtaque.style.display="none"
    sectionVerMapa.style.display="none"

    losBichos.forEach((mokepon) =>{
        opcionMokepones =`
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>     
        <p class="text">${mokepon.nombre}</p>
       <img class="image"src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
       <input type="radio" name="Mascota" id=${mokepon.nombre} />
        `
        contenedorTarjetas.innerHTML += opcionMokepones

         inputHipogue=document.getElementById("Hipodoge")
         inputCapipepo=document.getElementById("Capipepo")
         inputRatigueya=document.getElementById("Ratigueya")
    })
    botonMascota.addEventListener("click",SeleccionarMascota)
    botonReiniciar.addEventListener("click",reiniciar)
    botonReiniciar.style.display="none"
    unirseJuego()
}
function unirseJuego(){
    fetch("http://192.168.20.24:8080/unirse")//peticion que tarda un tiempo en "llegar" asincrona 
    .then(function (res) {
        console.log(res)
            if(res.ok){
                res.text()
                .then(function(respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
            }
    })
}
    function SeleccionarMascota(){

    if ((inputHipogue.checked)){
        spanMascotaJugador.innerHTML=inputHipogue.id
        mascotaJugador = inputHipogue.id
    }
     else if ((inputCapipepo.checked) ){
        spanMascotaJugador.innerHTML=inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }
     else if ((inputRatigueya.checked)){
        spanMascotaJugador.innerHTML=inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }
    else{
        alert("seleccionaste NADA ")
        return
    }
    
    seleccionarMascota.style.display="none"

    seleccionarMokepon(mascotaJugador)
    Extraerataques(mascotaJugador)
    IniciarMapa()
    sectionVerMapa.style.display="flex"
}   
function seleccionarMokepon(mascotaJugador){

    fetch(`http://192.168.20.24:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers: { //tipo de dato a enviar

            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
        //no usamos then ya que el dato solo se envia al servidor
    })
}
function Extraerataques(x){
    let ataques
    for (let i= 0; i < losBichos.length; i++) {
       if(x == losBichos[i].nombre){
        ataques= losBichos[i].ataques
       }
        
    }

    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque)=>{
        ataquesMokepon=`
        <button class="tarjeta-de-mokepon-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonAgua= document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")

}
function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener("click", (e)=>{ 
         if(e.target.textContent === "🔥🔥"){
            ataquejugador.push("FUEGO")
            console.log(ataquejugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }
         else if(e.target.textContent === "💧💧"){
            ataquejugador.push("AGUA")
            console.log(ataquejugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }
         else if (e.target.textContent === "🪴🪴"){
            ataquejugador.push("TIERRA")
            console.log(ataquejugador)
            boton.style.background = "#112f58"
            boton.disabled = true
         }
         if(ataquejugador.length == 5){
            enviarAtaques()
         }
         
        })
    })
   
}
function enviarAtaques(){
    fetch(`http://192.168.20.24:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataquejugador
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques(){
    fetch(`http://192.168.20.24:8080/mokepon/${enemigoId}/ataques`)
    .then(function (res){
        if (res.ok){
            res.json()
            .then(function({ataques}){
                if(ataques.length == 5){
                    ataquePC = ataques
                    combate()
                }
            })
        }
    })
}

function MascotaPC(enemigo){    
      
    spanPC.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

}

function aleatorioPC(min,max){

    return Math.floor(Math.random()*(max-min+1)+min)

}  
function ataquecpu(){
   let ataquePc=aleatorioPC(0,ataquesMokeponEnemigo.length -1)
    if(ataquePc==0 || ataquePc ==1){
        ataquePC.push("FUEGO")
        
    }
    else if(ataquePc==3|| ataquePc==4){
        ataquePC.push("AGUA")
        
    }
    else {
        ataquePC.push("TIERRA") 
        
    }
    console.log(ataquePC)
    iniciarPelea()
}
function iniciarPelea(){
  if(ataquejugador.length == 5) {
    combate() 
  }
}


function ambosOponentes(jugador,enemigo){
    indexAtaqueJugador = ataquejugador[jugador]
    indexAtaqueEnemigo = ataquePC[enemigo]
}
function combate(){
    clearInterval(intervalo)
    for (let i = 0; i < ataquejugador.length; i++) {
        console.log(ataquejugador[i])//toma el elemneto que se encuentra en el array en la posi 1
        if(ataquejugador[i] == ataquePC[i]) {
            ambosOponentes(i, i)
            Elements("EMPATE")
        }  
        else if(ataquejugador[i]=="FUEGO" && ataquePC[i]=="TIERRA") {
            ambosOponentes(i,i)
            Elements("GANASTE")
            victoriasJugador++
            vidas.innerHTML=victoriasJugador
        }
        else if(ataquejugador[i]=="AGUA" && ataquePC[i]=="FUEGO"){
            ambosOponentes(i,i)
            Elements("GANASTE")
            victoriasJugador++
            vidas.innerHTML=victoriasJugador
        }
        else if(ataquejugador[i]=="TIERRA" && ataquePC[i]=="AGUA"){
            ambosOponentes(i,i)
            victoriasJugador++
            vidas.innerHTML=victoriasJugador
        }   
        else{
            ambosOponentes(i,i)// se tiene que definir ya ques tamso hablando de una conbiancion diferente
            Elements("PERDISTE")
            victoriasEnemigo++
            vidasEnemigo.innerHTML=victoriasEnemigo
        }
    }
    
        vidasJuego()
}
function vidasJuego(){
    if(victoriasJugador==victoriasEnemigo){ 
    mensajeFinal("Empate!!")
    }
    else if(victoriasJugador>victoriasEnemigo){
    mensajeFinal("Ganaste!!")
    }
    else{
        mensajeFinal("Perdiste :(")
    }
    
}
function Elements(resultado){
    let nuevoAtaqueJugador =document.createElement("p")
    let nuevoAtaqueEnemigo =document.createElement("p")

    mensajes.innerHTML=resultado
    nuevoAtaqueJugador.innerHTML=indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML=indexAtaqueEnemigo


    ataquedeljugador.appendChild(nuevoAtaqueJugador)
    ataqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}
function mensajeFinal(resultadoFinal){
    mensajes.innerHTML=resultadoFinal

    botonReiniciar.style.display="block"
    }
    function reiniciar(){
     location.reload()
    }
    function pintarCanvas(){
        
        mascotaJugadorObjeto.x= mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadx
        mascotaJugadorObjeto.y= mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidady
        lienzo.clearRect(0,0,mapa.width , mapa.height)
        lienzo.drawImage(
            mapaBackgrond,
            0,
            0,
            mapa.width,
            mapa.height
        )
            mascotaJugadorObjeto.pintarMokepon()

            enviarposicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
            mokeponesEnemigos.forEach(function(mokepon){
                mokepon.pintarMokepon()
                revisarColision(mokepon)
            })
       
    }
    function moverArriba(){
        mascotaJugadorObjeto.velocidady=-5
    }
    function moverDerecha(){
        mascotaJugadorObjeto.velocidadx=5
    }
    function moverAbajo(){
        mascotaJugadorObjeto.velocidady=5
    }
    function moverIzquierda(){
        mascotaJugadorObjeto.velocidadx=-5
    }
    function detenerMovimiento(){
        mascotaJugadorObjeto.velocidadx=0
        mascotaJugadorObjeto.velocidady=0
    }

    function enviarposicion(x,y){
        fetch(`http://192.168.20.24:8080/mokepon/${jugadorId}/posicion`, {
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                x,
                y
            })
        })
        .then(function(res){
            if(res.ok){
                res.json()
               .then(function ({ enemigos }) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo= null
                        const mokeponNombre = enemigo.mokepon.nombre|| ""
                        if(mokeponNombre == "Hipodoge"){
                        mokeponEnemigo = new Mokepon("Hipodoge", "/assets/Hipoge.png",5, "/assets/Copia de Hipoge.png", enemigo.id)
                        }
                        else if(mokeponNombre == "Capipepo"){
                        mokeponEnemigo = new Mokepon("Capipepo", "/assets/capipego.png" , 5, "/assets/Copia de capipego.png", enemigo.id)
                        }
                        else if (mokeponNombre == "Ratigueya"){
                        mokeponEnemigo = new Mokepon("Ratigueya", "/assets/Ratigueya.png", 5, "/assets/Copia de Ratigueya.png", enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y

                        return mokeponEnemigo
                    })
                })
            }
        })
    }

    function PresionTeclas(event){
        switch(event.key){
            case "ArrowUp":
                moverArriba()
                break;
            case "ArrowDown":
                moverAbajo()
                break;
            case "ArrowLeft":
                moverIzquierda()
                break;
            case "ArrowRight":
                moverDerecha()
                break;
            default:
                break;
                
        }
    }
    function IniciarMapa(){
        
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
        intervalo = setInterval(pintarCanvas, 50 )
        //funcion que llama la funcion cada 50 milisegundos 
        window.addEventListener("keydown",PresionTeclas)
        window.addEventListener("keyup", detenerMovimiento)
    }
    function obtenerObjetoMascota(){
        for (let i= 0; i < losBichos.length; i++) {
            if(mascotaJugador == losBichos[i].nombre){
           return losBichos[i]
            }
             
         }
    }
    function revisarColision(enemigo){
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x 

        const arribaMascota = mascotaJugadorObjeto.y
        const abajoMascota= mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = mascotaJugadorObjeto.x 
        if(
            abajoMascota < arribaEnemigo||
            arribaMascota > abajoEnemigo||
            derechaMascota < izquierdaEnemigo||
            izquierdaMascota > derechaEnemigo
        ){
            return
        }
        detenerMovimiento()
        clearInterval(intervalo)
        console.log(" se detecto una colison")
        enemigoId = enemigo.id
        sectionVerMapa.style.display = "none"
        seleccionarAtaque.style.display ="flex"
        MascotaPC(enemigo)

        //alert("hay colision " + enemigo.nombre)
    }
window.addEventListener("load",carga)