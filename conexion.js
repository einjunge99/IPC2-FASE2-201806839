var mysql = require('mysql');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "proyectoIPC"
});

//-------------------------LOGIN--------------------------//

app.get('/login/:carne/:contra', (request, response) => {
    var carne = request.params.carne;
    var contra = request.params.contra;
    var miQuery = "select t1.cod_USUARIO, t1.nombre,t1.fk_cod_ROL from usuario as t1 where t1.carne=" + carne + " and t1.contra=\'" + contra + "\'";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });

})



//---------------------------AGREGAR ELEMENTOS-------------------//

app.post('/agregarCurso', (request, response) => {
    var nombre = request.body.nombre;
    var descripcion = request.body.descripcion;
    var miQuery = "INSERT INTO Curso (nombre, descripcion) VALUES(" +
        "\'" + nombre + "\'" + ",\'" + descripcion + "\');"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarActividad', (request, response) => {
    var descripcion = request.body.descripcion;
    var ponderacion = request.body.ponderacion;
    var limite = request.body.limite;
    var fecha = request.body.fecha;
    var archivo = request.body.archivo;
    var fk_cod_CURSO = request.body.fk_cod_CURSO;
    var miQuery = "INSERT INTO actividad (descripcion, ponderacion,limite,fecha,archivo,fk_cod_ASIGNACION,completa) VALUES(" +
        "\'" + descripcion + "\'" + "," + ponderacion + ", \'" + limite + "\',\'" + fecha + "\',\'" + archivo + "\', " + fk_cod_CURSO + ",\'" + fecha + " " + limite + "\');"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarDetalle/:codigo/:inicio/:fin/:seccion/:usuario', (request, response) => {
    var codigo = request.params.codigo;
    var inicio = request.params.inicio;
    var fin = request.params.fin;
    var seccion = request.params.seccion;
    var usuario = request.params.usuario;

    var resultado = [];

    var miQuery = "SELECT t1.cod_ASIGNACION FROM asignacion_curso t1 WHERE t1.seccion=\'" + seccion + "\' and t1.inicio=\'" + inicio + "\' and t1.fin=\'" + fin + "\' and t1.fk_cod_CURSO=" + codigo + "; ";
    console.log("esta aquiiiiiiiiiiiiiiiiii")
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                resultado = row.cod_ASIGNACION;
            });
            agregarFuncion(resultado, usuario)
        }
    });
    resultado = null;
})

function agregarFuncion(resultado, usuario) {
    console.log("esta aquiiiiiiiiiiiiiiiiii x2")
    var miQuery = "INSERT into asignacion_detalle (fk_cod_USUARIO,fk_cod_ASIGNACION) values(" + usuario + "," + resultado + ");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
        }
    });
}


app.post('/agregarUsuario', (request, response) => {
    var nombre = request.body.nombre;
    var carne = request.body.carne;
    var contra = request.body.contra;
    var correo = request.body.correo;
    var rol = request.body.fk_cod_ROL;
    var miQuery = "INSERT INTO Usuario (nombre, carne,contra,correo,fk_cod_ROL) VALUES(" +
        "\'" + nombre + "\'" + "," + carne + "" + ",\'" + contra + "\'" + ",\'" + correo + "\'" + "," + rol + ");"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarNotaUsuario/:act/:nota/:user', (request, response) => {
    var actividad = request.params.act;
    var nota = request.params.nota;
    var user = request.params.user;
    var miQuery = "INSERT INTO asignacion_actividad (fk_cod_ACTIVIDAD,fk_cod_USUARIO,nota) VALUES(" +
        "" + actividad + "" + "," + user + "" + "," + nota + ");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarEntregaUsuario', (request, response) => {
    var actividad = request.body.fk_cod_ACTIVIDAD;
    var nota = request.body.nota;
    var user = request.body.fk_cod_USUARIO;
    var cont = request.body.contenido;
    var miQuery = "INSERT INTO asignacion_actividad (fk_cod_ACTIVIDAD,fk_cod_USUARIO,nota,contenido) VALUES(" +
        "" + actividad + "" + "," + user + "" + "," + nota + ",\'" + cont + "\');"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})



app.post('/agregarCursoDetalle', (request, response) => {
    var codigo = request.body.codigo;
    console.log("DESDE NODEJS" + codigo);
    var semestre = request.body.semestre;
    var seccion = request.body.seccion;
    var inicio = request.body.inicio;
    var fin = request.body.fin;
    var anio = request.body.anio;
    var cod = [];

    var miQuery = "SELECT t1.cod_CURSO FROM curso t1 WHERE t1.nombre = " + "\'" + codigo + "\';"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                cod = row.cod_CURSO;
            });

            agregar(semestre, seccion, inicio, fin, anio, cod);
        
        }
    });
})

function agregar(semestre, seccion, inicio, fin, anio, cod) {
    console.log("DESDE NODEJS resultado" + cod);
    var miQuery = "INSERT into " +
        "asignacion_curso(semestre,seccion,inicio,fin,anio,fk_cod_CURSO) VALUES (" +
        "" + semestre + ", " +
        "\'" + seccion + "\'," +
        "\'" + inicio + "\' , " +
        "\'" + fin + "\' , " +
        "" + anio + " , " +
        cod + ");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            cod = null;
        }
    });
}

app.post('/agregarTicket', (request, response) => {
    console.log("ENTRO ACA")
    var asunto = request.body.asunto;
    var contenido = request.body.contenido;
    var estado = request.body.estado;
    var user = request.body.fk_cod_USUARIO;
    var asignacion = request.body.fk_cod_ASIGNACION;
    var miQuery = "INSERT INTO ticket (asunto,contenido, estado,fk_cod_USUARIO,fk_cod_ASIGNACION) VALUES(" +
        "\'" + asunto + "\'" + ",\'" + contenido + "\'" + ",\'" + estado + "\', " + user + "," + asignacion + ");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarForo', (request, response) => {
    var titulo =request.body.titulo;
    var descripcion = request.body.descripcion;
    var limite = request.body.limite;
    var fecha = request.body.fecha;
    var asignacion = request.body.fk_cod_ASIGNACION;
    console.log(titulo+" "+descripcion);
    var miQuery = "INSERT INTO foro (titulo ,descripcion ,fecha ,limite ,completa ,fk_cod_ASIGNACION ) VALUES(" +
        "\'" + titulo + "\'" + ",\'" + descripcion + "\'" + ",\'" + fecha + "\', \'" + limite + "\', \'" +  fecha + " " + limite + "\',"+asignacion+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarForoMensaje', (request, response) => {
    var mensaje=request.body.comentario;
    var user=request.body.fk_cod_USUARIO;
    var foro=request.body.fk_cod_FORO;
    var fecha=request.body.fecha;
    var miQuery = "INSERT INTO asignacion_foro (comentario,fecha,fk_cod_USUARIO,fk_cod_FORO ) VALUES(" +
        "\'" + mensaje + "\',\'"+fecha+"\'," + user + ","+foro+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.post('/agregarForoRespuesta', (request, response) => {
    var mensaje=request.body.comentario;
    var user=request.body.fk_cod_USUARIO;
    var foro=request.body.fk_cod_AFORO;
    var fecha=request.body.fecha;
    var miQuery = "INSERT INTO asignacion_respuesta (comentario,fecha,fk_cod_USUARIO,fk_cod_AFORO ) VALUES(" +
        "\'" + mensaje + "\',\'"+fecha+"\'," + user + ","+foro+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.post('/agregarAsistencia', (request, response) => {
    var fecha=request.body.fecha;
    var user=request.body.fk_cod_USUARIO;
    var curso=request.body.fk_cod_ASIGNACION;
    var miQuery = "INSERT INTO asistencia(estado,fecha,fk_cod_USUARIO,fk_cod_ASIGNACION) values('TRUE',\'"+fecha+"\',"+user+","+curso+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarEvaluacion', (request, response) => {
    var titulo=request.body.titulo;
    var curso=request.body.fk_cod_ASIGNACION;
    var aleatorio=request.body.aleatorio;
    var miQuery = "INSERT INTO evaluacion(titulo,estado,fk_cod_ASIGNACION,aleatorio) values(\'"+titulo+"\','ACTIVAR',"+curso+",\'"+aleatorio+"\');";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarPregunta', (request, response) => {
    var desc=request.body.descripcion;
    var estado=request.body.estado;
    var evaluacion=request.body.fk_cod_EVALUACION;
    var miQuery = "INSERT INTO pregunta_evaluacion(descripcion,estado,fk_cod_EVALUACION) values(\'"+desc+"\',\'"+estado+"\',"+evaluacion+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/agregarTestUsuario', (request, response) => {
    var test=request.body.fk_cod_EVALUACION
    var user=request.body.fk_cod_USUARIO;
    var miQuery = "INSERT INTO asignacion_evaluacion(fk_cod_USUARIO,fk_cod_EVALUACION) values("+user+","+test+");";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


//------------------------OBTENER ELEMENTOS---------------------//


app.get('/fechaLimite', (request, response) => {
    var miQuery = "select DATE_FORMAT(fecha, '%Y/%m/%d') as fechaLimite from limite";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.get('/cursos', (request, response) => {
    var miQuery = "select asignacion_curso.semestre,asignacion_curso.anio,asignacion_curso.fk_cod_CURSO,asignacion_curso.cod_ASIGNACION,curso.descripcion,asignacion_curso.seccion,TIME_FORMAT(asignacion_curso.inicio, '%h:%i') as inicio, TIME_FORMAT(asignacion_curso.fin, '%h:%i') as fin from curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

//-----------------cursos que tiene aux, no los que tenga EL aux----------//
app.get('/cursosAsignadosAux', (request, response) => {
    var miQuery = "select asignacion_curso.cod_ASIGNACION,TIME_FORMAT(asignacion_curso.inicio, '%h:%i') as inicio, TIME_FORMAT(asignacion_curso.fin, '%h:%i') as fin,curso.nombre,curso.descripcion, asignacion_curso.semestre, asignacion_curso.anio,asignacion_curso.seccion, usuario.nombre as aux, usuario.carne, usuario.cod_USUARIO from usuario join asignacion_detalle on asignacion_detalle.fk_cod_USUARIO=usuario.cod_USUARIO join asignacion_curso on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION join curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO where usuario.fk_cod_ROL=3";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.get('/anios', (request, response) => {
    var miQuery = "select DISTINCT anio from asignacion_curso";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})




app.get('/comprobar/:sem/:sec/:cod/:anio', (request, response) => {

    var semestre = request.params.sem;
    var seccion = request.params.sec;
    var codigo = request.params.cod;
    var anio=request.params.anio;
    console.log("SEMESTRE: "+semestre+" SECCION: "+seccion+" COD: "+codigo+" ANIO: "+anio )
    var miQuery = `SELECT asignacion_curso.semestre as semestre, asignacion_curso.seccion as seccion,curso.cod_CURSO as cod_CURSO, asignacion_curso.anio as anio FROM curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO WHERE curso.nombre = '${codigo}' and asignacion_curso.seccion='${seccion}' and asignacion_curso.anio='${anio}' and asignacion_curso.semestre='${semestre}'`;
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
    
        }
    });

})

app.get('/comprobarCodigo/:cod', (request, response) => {
    var codigo = request.params.cod;
    var miQuery = `SELECT * from curso WHERE nombre = '${codigo}'`;
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
    
        }
    });

})




//------------------------------------------------------------------//



app.get('/usuarios', (request, response) => {
    var numero = request.params.codigo;
    var miQuery = "select * from usuario join rol on usuario.fk_cod_ROL=rol.cod_ROL where usuario.fk_cod_ROL!=1 ";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.get('/alumnosValidar/:cod', (request, response) => {
    var cod=request.params.cod;
    var miQuery =  `SELECT*from curso join asignacion_curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO join asignacion_detalle on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION where asignacion_curso.fk_cod_CURSO='${cod}'`;
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})



app.get('/busquedaAux/:codigo', (request, response) => {
    var numero = request.params.codigo;
    var miQuery = "SELECT * FROM usuario WHERE cod_USUARIO = " + numero + ";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.get('/busquedaHorario/:codigo', (request, response) => {
    var numero = request.params.codigo;
    var miQuery = "SELECT TIME_FORMAT(t1.inicio, '%h:%i') as inicio, TIME_FORMAT(t1.fin, '%h:%i') as fin from (select asignacion_curso.fin as fin, asignacion_curso.inicio as inicio, asignacion_curso.cod_ASIGNACION as cod_ASIGNACION from asignacion_curso join curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO where curso.nombre=\'"+numero+"\') t1 where not EXISTS (select 1 from asignacion_curso JOIN asignacion_detalle on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION join usuario on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO where usuario.fk_cod_ROL=3 and asignacion_detalle.fk_cod_ASIGNACION=t1.cod_ASIGNACION )";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.get('/busquedaHorario_E/:codigo/:id', (request, response) => {
    var numero = request.params.codigo;
    var id = request.params.id;
    var miQuery = "select  DISTINCT TIME_FORMAT(asignacion_curso.inicio, '%h:%i') as inicio,TIME_FORMAT(asignacion_curso.fin, '%h:%i') as fin from curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO and NOT EXISTS (" +
        " SELECT null FROM asignacion_detalle t1" +
        " WHERE asignacion_curso.cod_ASIGNACION=t1.fk_cod_ASIGNACION" +
        " and t1.fk_cod_USUARIO=" + id + ")" +
        " and asignacion_curso.fk_cod_CURSO=" + numero + ";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})
app.get('/busquedaSeccion/:codigo/:inicio/:fin', (request, response) => {
    var numero = request.params.codigo;
    var inicio = request.params.inicio;
    var fin = request.params.fin;
    var miQuery = "SELECT TIME_FORMAT(t1.inicio, '%h:%i') as inicio, TIME_FORMAT(t1.fin, '%h:%i') as fin, t1.seccion from (select asignacion_curso.seccion as seccion, asignacion_curso.fin as fin, asignacion_curso.inicio as inicio, asignacion_curso.cod_ASIGNACION as cod_ASIGNACION from asignacion_curso join curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO where curso.nombre=\'"+numero+"\' and asignacion_curso.inicio=\'"+inicio+"\' and asignacion_curso.fin=\'"+fin+"\') t1 where not EXISTS (  select 1 from asignacion_curso JOIN asignacion_detalle on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION join usuario on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO where usuario.fk_cod_ROL=3 and asignacion_detalle.fk_cod_ASIGNACION=t1.cod_ASIGNACION )";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.get('/busquedaSeccion_E/:codigo/:inicio/:fin/:id', (request, response) => {
    var numero = request.params.codigo;
    var inicio = request.params.inicio;
    var fin = request.params.fin;
    var id = request.params.id;
    var miQuery = "select asignacion_curso.seccion  from curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO and NOT EXISTS (" +
        " SELECT null FROM asignacion_detalle t1" +
        " WHERE asignacion_curso.cod_ASIGNACION=t1.fk_cod_ASIGNACION" +
        " and t1.fk_cod_USUARIO=" + id + ")" +
        " and asignacion_curso.fk_cod_CURSO=" + numero + "" +
        " and asignacion_curso.fin=\'" + fin + "\' and asignacion_curso.inicio=\'" + inicio + "\'";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.get('/obtenerCurso', (request, response) => {
    var miQuery = "SELECT*from (select curso.nombre,curso.descripcion,asignacion_curso.cod_ASIGNACION as cod_ASIGNACION from asignacion_curso join curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO) t1 where not EXISTS ( select 1 from asignacion_curso JOIN asignacion_detalle on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION join usuario on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO where usuario.fk_cod_ROL=3 and asignacion_detalle.fk_cod_ASIGNACION=t1.cod_ASIGNACION)";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerActividad/:curso', (request, response) => {
    var curso = request.params.curso;
    var miQuery = "select t1.cod_ACTIVIDAD,t1.descripcion, t1.ponderacion, TIME_FORMAT(t1.limite, '%h:%i') as limite, DATE_FORMAT(t1.fecha, '%Y/%m/%d') as fecha  from actividad t1 where fk_cod_ASIGNACION=" + curso + ";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })

});

app.get('/obtenerCurso2', (request, response) => {
    var miQuery = "select curso.cod_CURSO, curso.nombre, curso.descripcion from curso;";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })

});

app.get('/obtenerCurso3/:codigo', (request, response) => {
    var codigo = request.params.codigo;
    var miQuery = "SELECT* from(SELECT DISTINCT curso.nombre,curso.descripcion as descripcion from curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO) t1 where not exists "+
    "(SELECT 1 from curso join asignacion_curso on curso.cod_CURSO=asignacion_curso.fk_cod_CURSO join asignacion_detalle on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join usuario on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO WHERE  usuario.fk_cod_ROL=2 and usuario.cod_USUARIO="+codigo+" and curso.descripcion=t1.descripcion ) "
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })

});


app.get('/obtenerCursoUsuario/:codigo', (request, response) => {
    var codigo = request.params.codigo;
    var miQuery = "select asignacion_curso.cod_ASIGNACION,asignacion_detalle.nota, asignacion_curso.cod_ASIGNACION, curso.nombre, curso.descripcion, TIME_FORMAT(asignacion_curso.inicio, '%h:%i') as inicio,TIME_FORMAT(asignacion_curso.fin, '%h:%i') as fin,asignacion_curso.seccion from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION JOIN curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO where usuario.cod_USUARIO=" + codigo + "";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })

});



app.get('/obtenerAux', (request, response) => {
    var miQuery = "SELECT *FROM usuario where fk_cod_ROL='3';";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});


app.get('/obtenerEstudiantesActividad/:curso/:actividad', (request, response) => {
    var curso = request.params.curso;
    var actividad = request.params.actividad;
    var miQuery = "select *from (SELECT  actividad.archivo as archivo, usuario.carne as carne, usuario.nombre as nombre,usuario.cod_USUARIO as cod_USUARIO from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join actividad on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION where asignacion_curso.cod_ASIGNACION=" + curso + " and actividad.cod_ACTIVIDAD=" + actividad + " and usuario.fk_cod_ROL='2') t1 where not exists" +
        "(select 1 from asignacion_actividad join usuario on asignacion_actividad.fk_cod_USUARIO=usuario.cod_USUARIO join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION  join actividad on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION where asignacion_actividad.fk_cod_USUARIO=t1.cod_USUARIO and asignacion_actividad.fk_cod_ACTIVIDAD=" + actividad + ")"
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerActividades/:asignacion/:estudiante', (request, response) => {
    var asignacion = request.params.asignacion;
    var estudiante = request.params.estudiante;
    var miQuery = "select *from (SELECT  DATE_FORMAT(actividad.fecha, '%Y/%m/%d') as fecha, TIME_FORMAT(actividad.limite, '%h:%i') as limite, TIME_FORMAT(actividad.completa , '%Y/%m/%d %h:%i') as completa, actividad.archivo, actividad.descripcion, actividad.cod_ACTIVIDAD as cod_ACTIVIDAD, usuario.nombre as nombre,usuario.cod_USUARIO as cod_USUARIO from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join actividad on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION  where  asignacion_curso.cod_ASIGNACION=" + asignacion + " and usuario.fk_cod_ROL='2' and usuario.cod_USUARIO=" + estudiante + ") t1 " +
        "where not exists (select 1 from asignacion_actividad join usuario on asignacion_actividad.fk_cod_USUARIO=usuario.cod_USUARIO join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION  join actividad on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION where asignacion_actividad.fk_cod_USUARIO=t1.cod_USUARIO and asignacion_actividad.fk_cod_ACTIVIDAD=t1.cod_ACTIVIDAD )";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })

});
//----------------------------------------------------------//
//-------------ESTE ES SOLO PARA UN ESTUDIANTE--------------//

app.get('/obtenerEstudianteActividadNota/:asignacion/:estudiante', (request, response) => {
    var asignacion = request.params.asignacion;
    var usuario = request.params.estudiante;
    console.log(asignacion+" "+usuario);
    var miQuery = "select actividad.descripcion,actividad.archivo,actividad.completa,DATE_FORMAT(actividad.fecha, '%Y/%m/%d') as fecha, TIME_FORMAT(actividad.limite, '%h:%i') as limite,asignacion_actividad.contenido, asignacion_actividad.nota from actividad join asignacion_curso on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO join asignacion_actividad on asignacion_actividad.fk_cod_ACTIVIDAD=actividad.cod_ACTIVIDAD join usuario on usuario.cod_USUARIO=asignacion_actividad.fk_cod_USUARIO where usuario.cod_USUARIO=" + usuario + " and asignacion_curso.cod_ASIGNACION=" + asignacion + " ";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

//----------------------------------------------------------//
//---------ESTE YA ES PARA TODOS LOS ESTUDIANTES------------//
app.get('/obtenerEstudiantesActividadNota/:curso/:actividad', (request, response) => {
    var curso = request.params.curso;
    var actividad = request.params.actividad;
    var miQuery = "select asignacion_actividad.contenido,asignacion_actividad.nota,actividad.archivo, usuario.cod_USUARIO, usuario.nombre, usuario.carne from asignacion_actividad join usuario on asignacion_actividad.fk_cod_USUARIO=usuario.cod_USUARIO join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join actividad on actividad.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION  where asignacion_curso.cod_ASIGNACION=" + curso + " and actividad.cod_ACTIVIDAD=" + actividad + " and asignacion_actividad.fk_cod_ACTIVIDAD=" + actividad + " and usuario.fk_cod_ROL='2'";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});



app.get('/obtenerTicket/:curso/:user', (request, response) => {
    var user=request.params.user;
    var curso=request.params.curso;
    var miQuery = "SELECT ticket.contenido, ticket.asunto, ticket.estado, ticket.accion from ticket join usuario on ticket.fk_cod_USUARIO=usuario.cod_USUARIO join asignacion_curso on asignacion_curso.cod_ASIGNACION=ticket.fk_cod_ASIGNACION where ticket.fk_cod_ASIGNACION="+curso+" and ticket.fk_cod_USUARIO="+user+";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerTicketAdmin', (request, response) => {
    var miQuery = "select curso.descripcion, asignacion_curso.seccion,usuario.nombre, usuario.carne, ticket.cod_TICKET,ticket.contenido,ticket.estado,ticket.asunto,ticket.accion from usuario join asignacion_detalle on asignacion_detalle.fk_cod_USUARIO=usuario.cod_USUARIO join ticket on asignacion_detalle.fk_cod_ASIGNACION=ticket.fk_cod_ASIGNACION join asignacion_curso on ticket.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO WHERE usuario.fk_cod_ROL='3' and ticket.estado='RECIBIDO';";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerTicketAtendido', (request, response) => {
    var miQuery = "select curso.descripcion, asignacion_curso.seccion,usuario.nombre, usuario.carne, ticket.cod_TICKET,ticket.contenido,ticket.estado,ticket.asunto,ticket.accion from usuario join asignacion_detalle on asignacion_detalle.fk_cod_USUARIO=usuario.cod_USUARIO join ticket on asignacion_detalle.fk_cod_ASIGNACION=ticket.fk_cod_ASIGNACION join asignacion_curso on ticket.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO WHERE usuario.fk_cod_ROL='3' and ticket.estado='FINALIZADO';";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerTicketAux/:curso/:user', (request, response) => {
    var user=request.params.user;
    var curso=request.params.curso;
    var miQuery = "select ticket.accion,curso.descripcion, asignacion_curso.seccion,usuario.nombre, usuario.carne, ticket.cod_TICKET,ticket.contenido,ticket.estado,ticket.asunto from usuario join asignacion_detalle on asignacion_detalle.fk_cod_USUARIO=usuario.cod_USUARIO join ticket on asignacion_detalle.fk_cod_ASIGNACION=ticket.fk_cod_ASIGNACION join asignacion_curso on ticket.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join curso on asignacion_curso.fk_cod_CURSO=curso.cod_CURSO WHERE usuario.fk_cod_ROL='3' and usuario.cod_USUARIO="+user+" and ticket.fk_cod_ASIGNACION="+curso+"   ;";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerForo/:curso', (request, response) => {
    var curso=request.params.curso
    var miQuery = "select foro.cod_FORO,foro.titulo, foro.descripcion, DATE_FORMAT(foro.fecha, '%Y/%m/%d') as fecha, TIME_FORMAT(foro.limite, '%h:%i') as limite, TIME_FORMAT(foro.completa , '%Y/%m/%d %h:%i') as completa from foro where fk_cod_ASIGNACION="+curso+" and  descripcion!='';";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});


app.get('/obtenerAuxChat/:curso', (request, response) => {
    var curso=request.params.curso
    var miQuery = "select usuario.cod_USUARIO from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION WHERE usuario.fk_cod_ROL='3' and asignacion_detalle.fk_cod_ASIGNACION="+curso+"";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});


app.get('/obtenerChats/:curso', (request, response) => {
    var curso=request.params.curso
    var miQuery = "select cod_FORO from foro where titulo='' and descripcion='' and fk_cod_ASIGNACION="+curso+";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});


app.get('/obtenerMensajesForo/:cod', (request, response) => {
    var foro=request.params.cod
    var miQuery = "select t1.cod_AFORO,usuario.cod_USUARIO,usuario.nombre,usuario.carne,TIME_FORMAT(t1.fecha , '%Y/%m/%d %H:%i:%s') as fecha, t1.comentario,t1.fk_cod_USUARIO from asignacion_foro t1 JOIN usuario on usuario.cod_USUARIO=t1.fk_cod_USUARIO where t1.fk_cod_FORO="+foro+" order by fecha DESC";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerRespuestas', (request, response) => {
    var miQuery = "select asignacion_respuesta.fk_cod_USUARIO,asignacion_respuesta.fk_cod_AFORO, asignacion_respuesta.comentario,usuario.nombre,TIME_FORMAT(asignacion_respuesta.fecha, '%Y/%m/%d %H:%i:%s') as fecha FROM asignacion_respuesta join usuario on asignacion_respuesta.fk_cod_USUARIO=usuario.cod_USUARIO order by fecha desc";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerForoDatos/:cod', (request, response) => {
    var foro=request.params.cod
    var miQuery = "select TIME_FORMAT(t1.completa , '%Y/%m/%d %H:%i:%s') as completa, t1.titulo, t1.descripcion from foro t1 where t1.cod_FORO="+foro+" ";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerEstudiantes/:cod/:fecha', (request, response) => {

    var curso=request.params.cod
    var fecha=request.params.fecha
    var miQuery = "select *from (select usuario.carne,usuario.nombre,usuario.cod_USUARIO as cod_USUARIO from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_curso.cod_ASIGNACION=asignacion_detalle.fk_cod_ASIGNACION where usuario.fk_cod_ROL='2' and asignacion_detalle.fk_cod_ASIGNACION="+curso+") t1 where not exists (select 1 from usuario join asistencia on asistencia.fk_cod_USUARIO=usuario.cod_USUARIO where usuario.fk_cod_ROL=2 and asistencia.fk_cod_ASIGNACION="+curso+" and asistencia.fecha=\'"+fecha+"\' and usuario.cod_USUARIO=t1.cod_USUARIO )    "
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerAsistentes/:cod/:fecha', (request, response) => {

    var curso=request.params.cod
    var fecha=request.params.fecha
    var miQuery = "select usuario.carne,usuario.nombre,usuario.cod_USUARIO, asistencia.estado,asistencia.cod_ASISTENCIA   from usuario  join asistencia on asistencia.fk_cod_USUARIO=usuario.cod_USUARIO where usuario.fk_cod_ROL=2 and asistencia.fk_cod_ASIGNACION="+curso+" and asistencia.fecha=\'"+fecha+"\' "
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerEvaluacion/:cod/', (request, response) => {
    var curso=request.params.cod
    var miQuery = "select cod_EVALUACION, titulo, estado from evaluacion where fk_cod_ASIGNACION="+curso+" "
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerPreguntas/:cod/', (request, response) => {
    var cod=request.params.cod
    var miQuery = "select evaluacion.aleatorio,pregunta_evaluacion.descripcion, pregunta_evaluacion.estado from pregunta_evaluacion join evaluacion on evaluacion.cod_EVALUACION=pregunta_evaluacion.fk_cod_EVALUACION where pregunta_evaluacion.fk_cod_EVALUACION="+cod+" "
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerTestEstudiante/:cod/:user/', (request, response) => {
    var cod=request.params.cod
    var user=request.params.user
    var miQuery = `select * from (SELECT usuario.cod_USUARIO as cod_USUARIO , evaluacion.titulo, evaluacion.cod_EVALUACION as cod_EVALUACION, evaluacion.estado from usuario join asignacion_detalle on usuario.cod_USUARIO=asignacion_detalle.fk_cod_USUARIO join asignacion_curso on asignacion_detalle.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION join evaluacion on evaluacion.fk_cod_ASIGNACION=asignacion_curso.cod_ASIGNACION where evaluacion.fk_cod_ASIGNACION=${cod} and usuario.cod_USUARIO=${user}) t1 where not EXISTS (SELECT *from evaluacion JOIN asignacion_evaluacion on evaluacion.cod_EVALUACION=asignacion_evaluacion.fk_cod_EVALUACION where asignacion_evaluacion.fk_cod_USUARIO=t1.cod_USUARIO and asignacion_evaluacion.fk_cod_EVALUACION=t1.cod_EVALUACION)`
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});

app.get('/obtenerTestResult/:cod/:user/', (request, response) => {
    var cod=request.params.cod
    var user=request.params.user
    var miQuery = `SELECT asignacion_evaluacion.nota,evaluacion.titulo from evaluacion JOIN asignacion_evaluacion on evaluacion.cod_EVALUACION=asignacion_evaluacion.fk_cod_EVALUACION where asignacion_evaluacion.fk_cod_USUARIO=${user} and evaluacion.fk_cod_ASIGNACION=${cod}`
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});



app.get('/obtenerTestEstudiante2/:cod/:user/', (request, response) => {
    var cod=request.params.cod
    var user=request.params.user
    var miQuery = "select * from asignacion_evaluacion where fk_cod_USUARIO="+user+" and fk_cod_EVALUACION="+cod+""
     conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            console.log(result);
            response.send(result);
        }
    })
});


 

//------------------------ELIMINAR ELEMENTOS---------------------//


app.post('/eliminarDetalle/:user/:codigo', (request, response) => {
    var user = request.params.user;
    var codigo = request.params.codigo;
    var miQuery = "delete  from asignacion_detalle where fk_cod_asignacion=" + codigo+ " and fk_cod_USUARIO=" + user + "";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
        }
    });
    resultado = null;
})





app.post('/eliminarAsignacion/:codigo', (request, response) => {
    var codigo = request.params.codigo;
    var miQuery = "delete  from curso where cod_CURSO="+codigo+" ";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            response.send(result);
        }
    });
})








//---------------------------ACTUALIZAR ELEMENTOS----------------//
app.post('/actualizarNotaUsuario/:act/:nota/:user', (request, response) => {
    var actividad = request.params.act;
    var nota = request.params.nota;
    var user = request.params.user;
    console.log("ACT: " + actividad + "USER: " + user);
    var miQuery = "UPDATE asignacion_actividad set nota=" + nota + " where fk_cod_ACTIVIDAD=" + actividad + " and fk_cod_USUARIO=" + user + ";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/actualizarTicketAdmin', (request, response) => {
    var ticket = request.body.asunto;
    var accion = request.body.contenido;
    var miQuery = "UPDATE ticket set accion=\'"+accion+"\', estado='FINALIZADO' where  cod_TICKET="+ticket+"";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/actualizarTicketEnviado', (request, response) => {
    var miQuery = "update ticket set estado='RECIBIDO' where estado='ENVIADO'";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/actualizarAsistencia/:cod/:estado', (request, response) => {
    var asistencia = request.params.cod;
    var estado = request.params.estado;
    var miQuery = "update asistencia set estado=\'"+estado+"\' where cod_ASISTENCIA="+asistencia+";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})


app.post('/actualizarEvaluacion/:cod/:estado', (request, response) => {
    var evaluacion = request.params.cod;
    var estado = request.params.estado;
    var miQuery = "update evaluacion set estado=\'"+estado+"\' where cod_EVALUACION="+evaluacion+";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/actualizarTest/:cod/:user/:nota', (request, response) => {
    var evaluacion = request.params.cod;
    var user = request.params.user;
    var nota =request.params.nota;
    var miQuery = "update asignacion_evaluacion set nota="+nota+" where fk_cod_EVALUACION="+evaluacion+" and fk_cod_USUARIO="+user+";";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})

app.post('/actualizarLimite/:fecha', (request, response) => {
    var fecha = request.params.fecha;
    var miQuery = "update limite set fecha=\'"+fecha+"\'";
    conexion.query(miQuery, function (err, result) {
        if (err) {
            throw err;
        } else {
            console.log(result);
            response.send(result);
        }
    });
})





app.listen(4000, () => {
    console.log("Backend inicializado")

});

