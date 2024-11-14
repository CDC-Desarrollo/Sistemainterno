
async function RecuperarAviso() {
    const texto=document.getElementById('AvisosEditar');

    let response = await fetch("http://localhost:8080/Avisos", { 
        method: "GET"
      });
      
      let data = await response.text();
      console.log(data);

    texto.innerHTML=`<p id="TextoAvisos"></p>`
    
    var TextoAv=document.getElementById('TextoAvisos');

    TextoAv.innerHTML=data;
    

    
}