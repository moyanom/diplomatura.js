import basededatos from './basededatos';

/**
 * Obtiene la lista de materias aprobadas (nota >= 4) para el nombre de alumno dado.
 * En caso de no existir el alumno, devolver undefined.
 * En caso de que no encuentre ninguna materia para el alumno, devuelve un array vacio []
 * Ejemplo del formato del resultado suponiendo que el alumno cursa dos materias y tiene mas de 4.
 *  [
    {
      id: 1,
      nombre: 'Análisis matemático',
      profesores: [1, 2],
      universidad: 1,
    },
    {
      id: 2,
      nombre: 'Corte y confección de sabanas',
      profesores: [3],
      universidad: 2,
    }
  ]
 * @param {nombreAlumno} nombreAlumno
 */
export const materiasAprobadasByNombreAlumno = (nombreAlumno) => {
  // Ejemplo de como accedo a datos dentro de la base de datos
  let materiasAprobadas = [];
  let k = 0;

  for (let i=0; i < basededatos.alumnos.length; i++)
  {
    if (basededatos.alumnos[i].nombre === nombreAlumno){
      let idAlumno = basededatos.alumnos[i].id;
      for(let j=0; j < basededatos.calificaciones.length; j++){
      
        if (basededatos.calificaciones[j].alumno === idAlumno && basededatos.calificaciones[j].nota >= 4)
        {
          materiasAprobadas[k] = basededatos.materias[basededatos.calificaciones[j].materia];
          k++;
        }

      }
      break;
    }
  }
  // console.log(basededatos.alumnos);
  return materiasAprobadas;
};

/**
 * Devuelve informacion ampliada sobre una universidad.
 * Si no existe la universidad con dicho nombre, devolvemos undefined.
 * Ademas de devolver el objeto universidad,
 * agregar la lista de materias dictadas por la universidad y
 * tambien agrega informacion de los profesores y alumnos que participan.
 * Ejemplo de formato del resultado (pueden no ser correctos los datos en el ejemplo):
 *{
      id: 1,
      nombre: 'Universidad del Comahue',
      direccion: {
        calle: 'Av. Siempre viva',
        numero: 2043,
        provincia: 'Neuquen',
      },
      materias: [
        {
          id: 1,
          nombre: 'Análisis matemático',
          profesores: [1, 2],
          universidad: 1,
        },
        {
          id: 4,
          nombre: 'Programación orientada a objetos',
          profesores: [1, 3],
          universidad: 1,
        },
      ],
      profesores:[
        { id: 1, nombre: 'Jorge Esteban Quito' },
        { id: 2, nombre: 'Marta Raca' },
        { id: 3, nombre: 'Silvia Torre Negra' },
      ],
      alumnos: [
         { id: 1, nombre: 'Rigoberto Manchu', edad: 22, provincia: 1 },
         { id: 2, nombre: 'Alina Robles', edad: 21, provincia: 2 },
      ]
    }
 * @param {string} nombreUniversidad
 */



 export const expandirInfoUniversidadByNombre = (nombreUniversidad) => {
  
  /*Obtengo la Universidad*/
  const univer = basededatos.universidades.find(value => value.nombre === nombreUniversidad);

  /*Obtengo las materias de la universidad*/
  univer.materias = basededatos.materias.filter(value => value.universidad === univer.id);
  
  /*Obtengo los profesores de las materias de la universidad*/
  univer.profesores = [];
  univer.alumnos = [];
  for (const mat of univer.materias) {
    for (const profid of mat.profesores)
      if (univer.profesores.findIndex( value => value.id === profid) === -1) 
        univer.profesores.push(basededatos.profesores.find(value => value.id === profid));
  }

  /*Obtengo los alumnos de las materias de la universidad*/
  for (const calif of basededatos.calificaciones){
    if((univer.materias.findIndex(value => value.id === calif.materia) > -1) && (univer.alumnos.findIndex(value => value.id === calif.alumno) === -1)){
      univer.alumnos.push(basededatos.alumnos.find(value => value.id === calif.alumno));
    }
  }
  
  
  return univer;
};

// /**
//  * Devuelve el promedio de edad de los alumnos.
//  */
const promedioArray = (numeros) => {
  
  if (numeros.length === 0) return 0;
  
  let suma = 0;
  for(const valor of numeros){
    suma += valor;
  }
  return  suma/numeros.length;
}
export const promedioDeEdad = () => promedioArray(basededatos.alumnos.map(value => value.edad));

// /**
//  * Devuelve la lista de alumnos con promedio mayor al numero pasado
//  * por parametro.
//  * @param {number} promedio
//  */
const promedioAlumno = (idAlumno) => 
 promedioArray(basededatos.calificaciones.filter(value => value.alumno === idAlumno).map(value => value.nota));

export const alumnosConPromedioMayorA = (promedio) => {
  let resultado = [];
  for (const alu of basededatos.alumnos){
    let promedioAl = promedioAlumno(alu.id);
    if (promedioAl > promedio){
      alu.promedio = promedioAl;
      resultado.push(alu);
    }
  }
  return resultado;
 };

// /**
//  * Devuelve la lista de materias sin alumnos
//  */
export const materiasSinAlumnosAnotados = () => {
  let resultado = [];
  for (const mat of basededatos.materias){
    if (basededatos.calificaciones.filter(value => value.materia === mat.id).length === 0)
      resultado.push(mat);
  }
  return resultado;
};

// /**
//  * Devuelve el promdedio de edad segun el id de la universidad.
//  * @param {number} universidadId
//  */

export const promedioDeEdadByUniversidadId = (universidadId) => {
  let uniExpand = expandirInfoUniversidadByNombre(basededatos.universidades.find(value => value.id === universidadId).nombre);
  return promedioArray(uniExpand.alumnos.map(value => value.edad)); 

};
