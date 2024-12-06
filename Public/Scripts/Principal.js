
function togglePopupQuejas(){
    document.getElementById("Quejas").classList.toggle("active");
    Departamentos();
  }

  function togglePopupSugerencias(){
    document.getElementById("Sugerencias").classList.toggle("active");
    Departamentos();
  }

  async function Departamentos() {
        let response = await fetch('http://localhost:8080/Departamento', { 
          method: "GET"
        });

        let data = await response.json();
        console.log(data);
        currentPlace=document.getElementById('QuejaDep')
        currentPlace.innerHTML = ''; 
        var opcion =document.createElement('option');
          opcion.value='';
          
          var texto=document.createTextNode('Seleccion...');
          opcion.appendChild(texto);
          
          currentPlace.appendChild(opcion)

        data.forEach(Departamento => {
          var opcion =document.createElement('option');
          opcion.value=Departamento.ID_Departamento;
          
          var texto=document.createTextNode(Departamento.Nombre);
          opcion.appendChild(texto);
          
          currentPlace.appendChild(opcion)
        });
        // mostrarDep(data)
    }

    document.getElementById('btnEnviarQueja').addEventListener('click', async()=>{
       let form=document.getElementById('frmQueja');
       let fromdata=new FormData(form);
       const cadenaInicioSesion=new URLSearchParams(fromdata).toString()

       const IDDep=sessionStorage.getItem('Departamento');
       const IDEmp=sessionStorage.getItem('ID_Empleado');
       console.log(IDDep,IDEmp);
       

        const params=new URLSearchParams(cadenaInicioSesion)
        const quejaDep = params.get('QuejaDep');
        const categoria = params.get('Categoria');
        const razonQueja = params.get('RazonQueja');
        console.log(quejaDep,categoria,razonQueja)

        let bodyContent = JSON.stringify(
          {"IDEmp":IDEmp,
          "IDDep":IDDep,
          "QuejaDep":quejaDep, 
          "Categoria":categoria, 
          "RazonQueja":razonQueja
        });

          let response = await fetch("http://localhost:8080/Queja", { 
            method: "POST",
            headers:{ "Content-Type":"application/json"} ,
            body: bodyContent
            
          });

          let data=await response.json();
          console.log(data);
          if(data.status=200){
            EnviarCorreo()
          }
    })

    async function EnviarCorreo() {
      const CorreoEmp=sessionStorage.getItem('Correo'); 

        let bodyContent = JSON.stringify({
            "to":"sistemas2@controldecarga.com",
            "subject":"SistemaInterno",
            "text":"Han subido quejas al SIC",
            "cc":CorreoEmp
          });


          let response = await fetch("http://localhost:8080/EnviarCorreo", { 
            method: "POST",
            headers:{ "Content-Type":"application/json"} ,
            body: bodyContent
          });

          let data = await response.text();
          console.log(data);

    }
