function togglePopup(tipo){
    const T=document.getElementById('Pestana');
    T.innerHTML=``
    if(tipo=='Sugerencias'){
       
        T.innerHTML=`
        <div class="ContenedorBotones">
            <div class="boton">
              <form id="frmOrdenar"> 
                Ordenar<select name="cat" id="selCategoria">
                      <option value="">Seleccionar...</option>
                      <option value="ID_Queja">ID_Empleado</option>
                      <option value="Nombre">Nombre</option>
                      <option value="Apellido">Apellido</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Categoria">Categoria</option>
                      <option value="DepartamentoQueja">Departamento queja</option>

                </select>
                  <input type="text" id="txtBusqueda">
                 <input type="radio" name="por" value="asc">Ascendente
                  <input type="radio" name="por" value="desc">Descendente
              </form>
            </div>
            <div class="boton">
              <button onclick="Busqueda('Sugerencia')">Buscar</button>
            </div>
          </div>  

        <table id="Sugerencias">
    <thead>
      <tr>
      <th>ID_Sugerencia</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Departamento</th>
      <th>Sugerencia</th>
      </tr>
    </thead>
    <tbody id="InsertSugerencias">
      
    </tbody>
  </table>
        `;
        RecuperarSugerencias()
    }
    if(tipo=='Quejas'){
        
        T.innerHTML=`
          <div class="ContenedorBotones">
            <div class="boton">
              <form id="frmOrdenar"> 
                Ordenar<select name="cat" id="selCategoria">
                      <option value="">Seleccionar...</option>
                      <option value="ID_Queja">ID_Empleado</option>
                      <option value="Nombre">Nombre</option>
                      <option value="Apellido">Apellido</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Categoria">Categoria</option>
                      <option value="DepartamentoQueja">Departamento queja</option>

                </select>
                  <input type="text" id="txtBusqueda">
                 <input type="radio" name="por" value="asc">Ascendente
                  <input type="radio" name="por" value="desc">Descendente
              </form>
            </div>
            <div class="boton">
              <button onclick="Busqueda('Queja')">Buscar</button>
            </div>
          </div>  
        <table id="Sugerencias">
          <thead>
            <tr>
              <th>ID_Queja</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Departamento</th>
              <th>Categoria</th>
              <th>Departamento Queja</th>
              <th>Razon</th>
            </tr>
          </thead>
          <tbody id="InsertSugerencias">
            
          </tbody>
        </table>
        `;
        RecuperarQuejas()
    }
    if(tipo=='Usuarios'){
      T.innerHTML=`
      
        <div class="ContenedorBotones">
            <div class="boton" >
              <button onclick="togglePopupAddUsers()">Agregar Usuario</button>
            </div>
            <div class="boton">
              <form id="frmOrdenar"> 
                Ordenar<select name="cat" id="selCategoria">
                      <option value="">Seleccionar...</option>
                      <option value="ID_Queja">ID_Empleado</option>
                      <option value="Nombre">Nombre</option>
                      <option value="Apellido">Apellido</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Categoria">Categoria</option>
                      <option value="DepartamentoQueja">Departamento queja</option>

                </select>
                  <input type="text" id="txtBusqueda">
                 <input type="radio" name="por" value="asc">Ascendente
                  <input type="radio" name="por" value="desc">Descendente
              </form>
            </div>
            <div class="boton">
              <button onclick="Busqueda('Usuarios')">Buscar</button>
            </div>
          </div>  
          </div>
        <table id="Sugerencias">
    <thead>
      <tr>
      <th>ID Empleado</th>
      <th>Nombre</th>
      <th>Apellido</th>
      <th>Correo</th>
      <th>Departamento</th>
      <th>Empresa</th>
      <th>Usuario</th>
      <th>Contraseña</th>
      <th>Administrador</th>
      <th>Ultima sesion</th>
      <th>Opciones</th>
      </tr>
    </thead>
    <tbody id="InsertSugerencias">
      
    </tbody>
  </table>
        `;
        RecuperarUsuarios()
    }
    if(tipo=='Avisos'){
      T.innerHTML=`
        <div id="ContenedorText">

        <div id="Herramientas">
            
            <button id="SubirTxtbtn">Subir</button>
        </div>
        <div id="TextoAviso">
            <div id="textareas" contenteditable="true">Escribe tu texto</div>
        </div>
        

      </div>
      `
    }
}

async function RecuperarSugerencias() {
    let response = await fetch("http://localhost:8080/Sugerencias", { 
        method: "GET"
      });
      
      let data = await response.json();
      console.log(data); 
      if(data!=null)
      {
        InsertarEnSugerencia(data)
      }
      else{
        const T=document.getElementById('Pestana');
        T.innerHTML=`<h1 style="color:red;">No existen Sugerencias</h2>`
      }
}



async function RecuperarQuejas() {
    let response = await fetch("http://localhost:8080/Quejas", { 
        method: "GET"
      });
      
      let data = await response.json();
      console.log(data); 
      if(data!=null)
      {

        InsertarEnQueja(data)
      }
      else{
        const T=document.getElementById('Pestana');
        T.innerHTML=`<h1 style="color:red;"></h2>`
      }
}


async function RecuperarUsuarios() {
  let response = await fetch("http://localhost:8080/Usuarios", { 
    method: "GET"
  });
  
  let data = await response.json();
  console.log(data);

  InsertarEnUsuarios(data);
   
}

function togglePopupAddUsers(){

  document.getElementById("Quejas").classList.toggle("active");
  Departamentos();
}


function Editar(id){
  console.log(id);
  document.getElementById("Quejas").classList.toggle("active");
  

}


async function llenarFormularioUsuarios(id) {
   
  const txtNombre=document.getElementById("Nombres");
  const txtApellidos=document.getElementById("Apellidos");
  const txtCorreo=document.getElementById("Correo");
  const txtDepartamento=document.getElementById("Departamento");
  const txtUsuario=document.getElementById("Usuario");
  const txtContrasena=document.getElementById("Contrasena");
  const txtAdm=document.getElementById("Adm");

  let response = await fetch(`http://localhost:8080/Usuarios/Filtrar?Categoria=ID_Empleado&Buscar=${id}`, { 
    method: "GET"

  });
  
  let data = await response.json();
 
  txtNombre.innerText=data.Nombre;
  txtApellidos.innerText=data.Apellido;
  txtCorreo.innerText=data.Correo;
  txtDepartamento.innerText=data.Departamento;
  txtUsuario.innerText=data.Usuario;
  txtContrasena.innerText=data.Contrasena;
  var EsAdmin=data.Adm;

  if(EsAdmin==1){
    txtAdm.checked=true;
  }
  else{
    txtAdm.checked=false;
  }

}

//Filtrado 
function Busqueda(Seccion){
  var Sec=Seccion
  const cat = document.getElementById('selCategoria')
  const busq = document.getElementById('txtBusqueda')
  busqueda=busq.value;
 const seleccion = document.querySelector('input[name="por"]:checked');
  var sel="";

  if (seleccion) {
      console.log("Orden:", seleccion.value);
      sel=seleccion.value;
  } 

  if(cat.value!=""){
    console.log("entro a cat")

    if(busqueda!=""&&sel!=""){
      //Categoria, Seleccion y Orden
      BuscarOrden(Sec,cat.value,busqueda,sel)
      
    }
    else{
      if(sel!="")
      {
        console.log(sel)
        Orden(Sec,cat.value,sel)
      }
      else
      {
        if(busqueda!=""){
          Buscar(Sec,cat.value,busqueda)
          
        }
        else{
          console.log('no entra')
        }
      }
    }

  }
  else{
    console.log("no entro");
  }
}

  async function BuscarOrden(Seccion,lblCategoria,lblBusqueda,lblOrden) {
    if(Seccion='Queja')
    {
          let response = await fetch(`http://localhost:8080/Quejas/Filtrar/Ordenar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}&Ordenar=${lblOrden}`, { 
          method: "GET"
        });
        
        let data = await response.json();
        InsertarEnQueja(data[0])    
    }
    if(Seccion="Sugerencia"){
          let response = await fetch(`http://localhost:8080/Sugerencias/Filtrar/Ordenar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}&Ordenar=${lblOrden}`, { 
            method: "GET"
          });
          
          let data = await response.json();
          InsertarEnSugerencia(data[0])  
    }
    if(Seccion="Usuario"){
          let response = await fetch(`http://localhost:8080/Usuarios/Filtrar/Ordenar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}&Ordenar=${lblOrden}`, { 
            method: "GET"
          });
          
          let data = await response.json();
          InsertarEnUsuarios(data[0])  
    }

  }

  async function Buscar(Seccion, lblCategoria,lblBusqueda) {
   if(Seccion='Queja')
    { 
          let response = await fetch(`http://localhost:8080/Quejas/Filtrar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}`, { 
          method: "GET"

        });
        
        let data = await response.json();
        InsertarEnQueja(data[0]) 
   }
   if(Seccion="Sugerencia"){
        let response = await fetch(`http://localhost:8080/Sugerencias/Filtrar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}`, { 
          method: "GET"

        });
        
        let data = await response.json();
        InsertarEnSugerencia(data[0]) 
    }
   if(Seccion="Usuario"){
        let response = await fetch(`http://localhost:8080/Usuarios/Filtrar?Categoria=${lblCategoria}&Buscar=${lblBusqueda}`, { 
          method: "GET"

        });
        
        let data = await response.json();
        InsertarEnUsuarios(data[0]) 
   }
  }

  async function Orden(Seccion,lblCategoria,lblOrden) {
    if(Seccion='Queja')
    {
          let response = await fetch(`http://localhost:8080/Quejas/Ordenar?Categoria=${lblCategoria}&Ordenar=${lblOrden}`, { 
          method: "GET"

        });
        
        let data = await response.json();
        InsertarEnQueja(data[0])  
    }
    if(Seccion="Sugerencia"){
          let response = await fetch(`http://localhost:8080/Sugerencias/Ordenar?Categoria=${lblCategoria}&Ordenar=${lblOrden}`, { 
            method: "GET"
          });
          let data = await response.json();
          InsertarEnSugerencia(data[0])  
    }
    if(Seccion="Usuario"){
          let response = await fetch(`http://localhost:8080/Usuarios/Ordenar?Categoria=${lblCategoria}&Ordenar=${lblOrden}`, { 
            method: "GET"
          });
          let data = await response.json();
          InsertarEnUsuarios(data[0])  
    }
  }




document.getElementById('btnAgregarUsuarios').addEventListener('click', async()=>{ 
  const checkbox=document.getElementById('Adm');
  if(checkbox.checked){
    checkbox.value='1';
  }
  else{
    checkbox.setAttribute('value', '0'); 
  }
  
  let form=document.getElementById('frmAggUsuario');
  let fromdata=new FormData(form);
  if (!fromdata.has('Adm')) {
    fromdata.append('Adm', '0');
}
  const cadenaAgregarUsuario=new URLSearchParams(fromdata).toString()
 console.log(cadenaAgregarUsuario) 
 
  let response = await fetch("http://localhost:8080/Usuarios/Agregar", { 
    method: "POST",
    headers: {"Content-Type":"application/x-www-form-urlencoded"},
    body: cadenaAgregarUsuario
  });
  
  let data = await response.text();
  console.log(data);
  
  

});

// Insertar Departamentos en los cbb
async function Departamentos() {
  let response = await fetch('http://localhost:8080/Departamento', { 
    method: "GET"
  });

  let data = await response.json();
  console.log(data);
  currentPlace=document.getElementById('Dep')
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

//Busqueda de usuarios
// async function Buscar() { 

//       let form=document.getElementById('frmFiltrar');
//       let fromdata=new FormData(form);
//       const cadenaInicioSesion=new URLSearchParams(fromdata).toString()

//       let response = await fetch("http://localhost:8080/Usuarios/Busqueda", { 
//         method: "POST",
//         headers: {'Content-Type': 'application/x-www-form-urlencoded' },
//         body: cadenaInicioSesion
//       });
      
//       let data = await response.json();
//       console.log(data);

//       InsertarEnUsuarios(data[0])
// }


        //Este metodo es en el cual se hacen las insercciones en queja
function InsertarEnQueja(data) {
  const TabSug=document.getElementById("InsertSugerencias")
  TabSug.innerHTML='';
  data.forEach(Q => {
    var tabReng = document.createElement('tr');

    var idCell = document.createElement('td');
    idCell.textContent = Q.ID_Queja;

    var nombreCell = document.createElement('td');
    nombreCell.textContent = Q.Nombre;

    var apellidoCell = document.createElement('td');
    apellidoCell.textContent = Q.Apellido;

    var departamentoCell = document.createElement('td');
    departamentoCell.textContent = Q.Departamento;

    var categoriaCell=document.createElement('td');
    categoriaCell.textContent=Q.Categoria;

    var departamentoQCell=document.createElement('td');
    departamentoQCell.textContent=Q.DepartamentoQueja;

    var RazonCell = document.createElement('td');
    RazonCell.textContent = Q.Razon;

    // Agregar las celdas a la fila
    tabReng.appendChild(idCell);
    tabReng.appendChild(nombreCell);
    tabReng.appendChild(apellidoCell);
    tabReng.appendChild(departamentoCell);
    tabReng.appendChild(categoriaCell);
    tabReng.appendChild(departamentoQCell);
    tabReng.appendChild(RazonCell);

    // Agregar la fila al cuerpo de la tabla
    TabSug.appendChild(tabReng);
});
}

//En este apartado se incertan los datos obtenidos en Sugerencia para mostrar en la tabla sugerencia
function InsertarEnSugerencia(data){
      
  const TabSug=document.getElementById("InsertSugerencias")
  TabSug.innerHTML='';
  data.forEach(S => {
    var tabReng = document.createElement('tr');

    var idCell = document.createElement('td');
    idCell.textContent = S.ID_Sugerencia;

    var nombreCell = document.createElement('td');
    nombreCell.textContent = S.Nombre;

    var apellidoCell = document.createElement('td');
    apellidoCell.textContent = S.Apellido;

    var departamentoCell = document.createElement('td');
    departamentoCell.textContent = S.Departamento;

    var sugerenciaCell = document.createElement('td');
    sugerenciaCell.textContent = S.Sugerencia;

    // Agregar las celdas a la fila
    tabReng.appendChild(idCell);
    tabReng.appendChild(nombreCell);
    tabReng.appendChild(apellidoCell);
    tabReng.appendChild(departamentoCell);
    tabReng.appendChild(sugerenciaCell);

    // Agregar la fila al cuerpo de la tabla
    TabSug.appendChild(tabReng);
});

}
//En este apartado se insertan en la tabla usuarios
function InsertarEnUsuarios(data){
  const TabSug=document.getElementById("InsertSugerencias");
  TabSug.innerHTML='';

  data.forEach(U => {

  var tabReng = document.createElement('tr');

  var idCell = document.createElement('td');
  idCell.textContent = U.ID_Empleado;

  var nombreCell = document.createElement('td');
  nombreCell.textContent = U.Nombre;

  var apellidoCell = document.createElement('td');
  apellidoCell.textContent = U.Apellido;


  var correoCell=document.createElement('td');
  correoCell.textContent=U.Correo;

  var departamentoCell = document.createElement('td');
  departamentoCell.textContent = U.Departamento;

  var empresaCell=document.createElement('td');
  empresaCell.textContent=U.Empresa;

  var usuarioCell=document.createElement('td');
  usuarioCell.textContent=U.Usuario;

  var contrasenaCell=document.createElement('td');
  contrasenaCell.textContent=U.Contrasena;

  var EsAdmin=U.Adm;

  var adminCell = document.createElement('td');
  var vofAdm=document.createElement('input');
  vofAdm.type='checkbox';
  if(EsAdmin==1){
    vofAdm.checked=true;
  }
  vofAdm.disabled=true;
  adminCell.appendChild(vofAdm);

  var ultInCell=document.createElement('td');
  ultInCell.textContent=U.UltimoInicio;

  var OpEliminar=document.createElement('div');
  OpEliminar.setAttribute('onclick', 'Eliminar("' + U.ID_Empleado + '")');
  OpEliminar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25"><title>Eliminar</title><g id="_32.Trash" data-name="32.Trash"><circle cx="12" cy="12" r="11" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><line x1="6" y1="10" x2="18" y2="10" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><line x1="11" y1="7" x2="13" y2="7" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><polyline points="9 10 9 17 15 17 15 10" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/></g></svg>`
 
  var OpEditar=document.createElement('div');
  OpEditar.setAttribute('onclick', 'Editar("' + U.ID_Empleado+ '")');
  OpEditar.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 25"><title>Editar</title><g id="_18.Pencil" data-name="18.Pencil"><circle cx="12" cy="12" r="11" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><polygon points="15.071 7.101 8 14.172 8 17 10.828 17 17.899 9.929 15.071 7.101" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/><line x1="12" y1="10.172" x2="14.828" y2="13" style="fill:none;stroke:#000;stroke-miterlimit:10;stroke-width:2px"/></g></svg>`
 
  var opcionesCell=document.createElement('td');
  opcionesCell.appendChild(OpEliminar);
  opcionesCell.appendChild(OpEditar);
  


  // Agregar las celdas a la fila
  tabReng.appendChild(idCell);
  tabReng.appendChild(nombreCell);
  tabReng.appendChild(apellidoCell);
  tabReng.appendChild(correoCell);
  tabReng.appendChild(departamentoCell);
  tabReng.appendChild(empresaCell);
  tabReng.appendChild(usuarioCell);
  tabReng.appendChild(contrasenaCell);
  tabReng.appendChild(adminCell);
  tabReng.appendChild(ultInCell);
  tabReng.appendChild(opcionesCell);

  // Agregar la fila al cuerpo de la tabla
  TabSug.appendChild(tabReng);

  });
}

function Popup() {

  const modal=document.getElementById('popup')

  modal.innerHTML=`
   <div class="overlay" onclick="togglePopupAddUsers()"></div>
  <div class="content" style=" background-color: whitesmoke;width:fit-content;
  height: fit-content; overflow:hidden; box-sizing:border-box; border:20px solid rgba(108, 192, 74, 1); border-radius: 30px; padding: 0;; ">
    <div class="cont"style="width: fit-content ;height:fit-content;">
      <div class="Cerrar" onclick="togglePopupAddUsers()">&times;</div>
      <h2 style="color: rgba(108, 192, 74, 1) ;">Registrar Usuario</h2>


          
        <form action="" id="frmAggUsuario">
  
            <div class="Q">
              <label for="Nombres">Nombres</label>
              <input type="text" name="Nombres">
            </div>
            <div class="Q">
              <label for="Apellidos">Apellidos</label>
              <input type="text" name="Apellidos">
            </div>
  
            <div class="Q">
              <label for="Correo">Correo</label>
              <input type="email" name="Correo">
            </div>
            <div class="Q" id="Departamento">
              <label for="Dep">Departamento</label>
              <select name="Dep" id="Dep">
                  <option value=""> seleccionar...</option>
              </select>
            </div>
  
            <div class="Q">
              <label for="Ususario">Usuario</label>
              <input type="text" name="Usuario">
            </div>
  
            <div class="Q">
              <label for="Contraseña">Contraseña</label>
              <input type="text" name="contrasena">
            </div>
  
            <div class="Q"><label for="Adm">Usuario Administrador</label>
            <input type="checkbox" name="Adm"  id="Adm" value="0"></div>
        </form>
  
      <div class="enviar" style="padding: 10px;">
        <button type="button" id="btnAgregarUsuarios"> <b>Enviar</b></button>
      </div>
   
    </div>
    
  </div>
  `
  
}

document.getElementById('CerrarUsuarios').addEventListener('click', async()=>{
  RecuperarUsuarios()
})



function LimpiarFormularioUsuarios(){
   
  const txtNombre=document.getElementById("Nombres");
  const txtApellidos=document.getElementById("Apellidos");
  const txtCorreo=document.getElementById("Correo");
  const txtDepartamento=document.getElementById("Departamento");
  const txtUsuario=document.getElementById("Usuario");
  const txtContrasena=document.getElementById("Contrasena");
  const txtAdm=document.getElementById("Adm");

  txtNombre.innerText='';
  txtApellidos.innerText='';
  txtCorreo.innerText='';
  txtDepartamento.innerText='';
  txtUsuario.innerText='';
  txtContrasena.innerText='';
  txtAdm.checked=false;

}

const doc=document.getElementById('ContenedorText')
console.log(doc);
