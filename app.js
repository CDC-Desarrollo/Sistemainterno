const express=require('express');
const app=express();
const path=require('path');
const mysql2 =require('mysql2');
require('dotenv').config();
app.use(express.json()); 
const fs =require('fs');

const bodyParser=require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'))

app.use(express.static(path.join(__dirname, 'Public')));

app.use(express.static(path.join(__dirname, 'Data')));

const nodemailer = require("nodemailer");
const connection=mysql2.createConnection({
    host:process.env.DB_Host,
    user:process.env.DB_User,
    password:process.env.DB_Password,
    database:process.env.DB_Name
})

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
      return console.error('Error conectando: ' + err.stack);
    }
    console.log('Conexion creada con exito');
  })
  


  
  // Cerrar la conexión
const CerrarConexion=function() {
  connection.end((err) => {
    if (err) {
      return console.error('Error al cerrar la conexión: ' + err.stack);
    }
    console.log('Conexión cerrada.');
  
  })
}

app.get('/', (req,res)=>{
    res.render('Login');
})

app.get('/PrincipalPage', (req,res)=>{
    res.render('PaginaPrincipal')
    
})

app.get('/Admin', (req,res)=>{
  res.render('LoginAdmin');
})

app.get('/PrincipalPageAdmin', (req,res)=>{
  res.render('PaginaPrincipalAdmin')
  
})

app.post('/LogIn',(req,res)=>{
  const { user, cont } = req.body;

  console.log(user)
      console.log(cont)
  connection.execute(
      
      'CALL IniciarSesion(?, ?)',
      [user, cont],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json(results[0]); 
      }
  );
});

app.post('/Queja',(req,res)=>{
  const {IDEmp,IDDep,QuejaDep, Categoria, RazonQueja } = req.body;

  connection.execute(
    'INSERT INTO `sic`.`queja` (`ID_Empleado`, `Departamento`, `DepartamentoQueja`, `Categoria`, `Razon`) VALUES (?, ?, ?, ?, ?)',
      [IDEmp,IDDep,QuejaDep, Categoria, RazonQueja],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json(
            {status:"200",
            message:"El envio de la queja fue exitoso",
            results}
          ); 
      }
  );
})

app.get('/Departamento', (req,res)=>{

  connection.execute(
    'select * from Departamento',
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  }
  )

})

app.get('/Quejas', (req,res)=>{

  connection.execute(
    'select * from Vista_Quejas',
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
})


app.get('/Quejas/Filtrar', (req,res)=>{
    let consultaCat=req.query.Categoria;
    let consultaBusqueda=req.query.Buscar;

      connection.execute(
        'call FiltrarQuejas(?,?)',
        [consultaCat,consultaBusqueda],
        (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json(results); 
      })
        
})


app.get('/Quejas/Ordenar', (req,res)=>{
  let consultaCat=req.query.Categoria;
  let consultaOrden=req.query.Ordenar

    connection.execute(
      'call OrdenarQuejas(?,?)',
      [consultaCat,consultaOrden],
      (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); 
    })
      
})


app.get('/Quejas/Filtrar/Ordenar', (req,res)=>{
  let consultaCat=req.query.Categoria;
  let consultaBusqueda=req.query.Buscar;
  let consultaOrden=req.query.Ordenar

    connection.execute(
      'call FiltrarQuejasOrdenar(?,?,?)',
      [consultaCat,consultaBusqueda,consultaOrden],
      (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); 
    })
      
})

app.get('/Sugerencias',(req,res)=>{
  connection.execute(
    'select * from Vista_Sugerencia',
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
  
})

app.get('/Sugerencias/Filtrar', (req,res)=>{
  let consultaCat=req.query.Categoria;
  let consultaBusqueda=req.query.Buscar;

    connection.execute(
      'call FiltrarSugerencias(?,?)',
      [consultaCat,consultaBusqueda],
      (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); 
    })
      
})


app.get('/Sugerencias/Ordenar', (req,res)=>{
let consultaCat=req.query.Categoria;
let consultaOrden=req.query.Ordenar

  connection.execute(
    'call OrdenarSugerencias(?,?)',
    [consultaCat,consultaOrden],
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
    
})


app.get('/Sugerencias/Filtrar/Ordenar', (req,res)=>{
let consultaCat=req.query.Categoria;
let consultaBusqueda=req.query.Buscar;
let consultaOrden=req.query.Ordenar

  connection.execute(
    'call FiltrarSugerenciasOrdenar(?,?,?)',
    [consultaCat,consultaBusqueda,consultaOrden],
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
    
})

app.get('/Usuarios', (req,res)=>{
  connection.execute(
    'select * from Vista_Empleados_Departamentos',
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  }
  )
})

app.post('/Usuarios/Agregar', (req,res)=>{
  const {Nombres, Apellidos, Correo, Departamento, Usuario, Contrasena, Adm}=req.body;
  connection.execute(
    'insert into Empleado(`Nombre`, `Apellido`,`Correo`,`Departamento`, `usuario`, `contrasena`, `Adm`)values(?,?,?,?,?,?,?)',
    [Nombres,Apellidos, Correo, Departamento, Usuario, Contrasena, Adm],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json(results); 
      }
  )
})

app.get('/Usuarios/Filtrar', (req,res)=>{
  let consultaCat=req.query.Categoria;
  let consultaBusqueda=req.query.Buscar;

    connection.execute(
      'call FiltrarEmpleados(?,?)',
      [consultaCat,consultaBusqueda],
      (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results); 
    })
      
})


app.get('/Usuarios/Ordenar', (req,res)=>{
let consultaCat=req.query.Categoria;
let consultaOrden=req.query.Ordenar

  connection.execute(
    'call OrdenarEmpleados(?,?)',
    [consultaCat,consultaOrden],
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
    
})


app.get('/Usuarios/Filtrar/Ordenar', (req,res)=>{
let consultaCat=req.query.Categoria;
let consultaBusqueda=req.query.Buscar;
let consultaOrden=req.query.Ordenar

  connection.execute(
    'call FiltrarEmpleadosOrdenar(?,?,?)',
    [consultaCat,consultaBusqueda,consultaOrden],
    (err, results) => {
      if (err) {
          return res.status(500).json({ error: err.message });
      }
      res.json(results); 
  })
    
})



app.get('/Avisos',(req,res)=>{
  const filePath=path.join(__dirname,'data','Avisos.txt');
  console.log(filePath);
  
  fs.readFile(filePath,'utf8', (err,data)=>{
    if(err){
      return res.status(500).send('Error al leer el archivo');
    }
    res.send(data);
  });
});

app.post('/EditarAvisos',(req,res)=>{
  const filePath=path.join(__dirname,'data','Avisos.txt');
  const newContent = req.body.content; 

  fs.writeFile(filePath, newContent, 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir el archivo:', err);
      return res.status(500).send('Error al escribir el archivo');
    }
    res.send('Archivo actualizado con éxito');
  });
})
var transporter = nodemailer.createTransport({
  host: "controldecarga.com",
  port: 465,
  auth: {
    user: "desarrollo2@controldecarga.com",
    pass: "D3s4rr01i0!*"
  }
});
// Función para enviar el correo

const sendEmail = async (to, subject, text,cc) => {
try {
  const info = await transporter.sendMail({
    from: '"Sistema interno" <desarrollo2@controldecarga.com>', // Remitente
    to, // Destinatario
    cc,
    subject, // Asunto del correo
    text, // Contenido en texto plano
    // html: '<b>Mensaje en HTML</b>' // Opcional, contenido en HTML
  });

  console.log('Correo enviado: %s', info.messageId);
} catch (error) {
  console.error('Error al enviar correo:', error);
}
};

app.post('/EnviarCorreo', (req,res)=>{
  const{to, subject, text,cc}=req.body;
  
  sendEmail(to,subject,text,cc)
  .then(() => console.log('Correo enviado correctamente'))
  .catch(error => console.error('Error al enviar el correo:', error));
  res.json({"message":"mensaje"})
})

app.listen(8080,(req,res)=>{
console.log("servidor en marcha en http://localhost:8080/Admin")
})