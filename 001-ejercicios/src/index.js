import {
  materiasAprobadasByNombreAlumno,
  expandirInfoUniversidadByNombre,
  promedioDeEdad,
  alumnosConPromedioMayorA,
  materiasSinAlumnosAnotados,
  promedioDeEdadByUniversidadId,
} from './moduloEjercicios';

import baseDeDatos from './basededatos';


// materiasAprobadasByNombreAlumno
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasAprobadasByNombreAlumno.');

const materiasAprobadasPorSuzana = materiasAprobadasByNombreAlumno(
  'Suzana Mendez'
);
console.log('Materias aprobadas por Suzana:', materiasAprobadasPorSuzana);

const materiasAprobadasPorAlina = materiasAprobadasByNombreAlumno(
  'Alina Robles'
);
console.log('Materias aprobadas por Alina:', materiasAprobadasPorAlina);

// expandirInfoUniversidadByNombre
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios expandirInfoUniversidadByNombre.');

const infoUniversidadComahue = expandirInfoUniversidadByNombre(
  'Universidad del Comahue'
);
console.log('Info comahue:', infoUniversidadComahue);

const infoUniversidadRio = expandirInfoUniversidadByNombre(
  'Universidad de Rio Negro'
);
console.log('Info rio negro:', infoUniversidadRio);


// promedioDeEdad
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios promedioDeEdad.');
console.log('Promedio de Edades:', promedioDeEdad());

// alumnosConPromedioMayorA 
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios alumnosConPromedioMayorA.');
const alumnosPromedioMayor4 = alumnosConPromedioMayorA(4);
console.log('Alumnos con promedio mayor a 4:', alumnosPromedioMayor4);

const alumnosPromedioMayor7 = alumnosConPromedioMayorA(7);
console.log('Alumnos con promedio mayor a 7:', alumnosPromedioMayor7);

const alumnosPromedioMayor9 = alumnosConPromedioMayorA(9);
console.log('Alumnos con promedio mayor a 9:', alumnosPromedioMayor9);

// materiasSinAlumnosAnotados 
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios materiasSinAlumnosAnotados.');
console.log('Materias sin alumnos anotados:', materiasSinAlumnosAnotados());


// promedioDeEdadByUniversidadId
console.log('------------------------------------------------------');
console.log('Ejecutando ejercicios promedioDeEdadByUniversidadId.');

const promedioUniversidadComahue = promedioDeEdadByUniversidadId(1);
console.log('Promedio comahue:', promedioUniversidadComahue);

const promedioUniversidadRio = promedioDeEdadByUniversidadId(2);
console.log('Promedio rio negro:', promedioUniversidadRio);