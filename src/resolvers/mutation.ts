import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';
import _ from 'lodash';

const mutation: IResolvers = {
  Mutation: {
      nuevoCurso(__: void, { curso }): any {
        const itemCurso = {
            id: String(database.cursos.length + 1),
            title: curso.title,
            description: curso.description,
            clases: curso.clases,
            time: curso.time,
            logo: curso.logo,
            level: curso.level,
            path: curso.path,
            teacher: curso.teacher,
            reviews: []
        }

        if (database.cursos.filter(item => item.title === itemCurso.title).length === 0) {
            database.cursos.push(itemCurso);
            return itemCurso;
        }

        return {
                id: '-1',
                title: `El curso ya existe con este titulo`,
                description: '',
                clases: '-1',
                time: 0.0,
                logo: '',
                level: 'TODOS',
                path: '',
                teacher: '',
                reviews: []    
        };
      },
      modificarCurso(__: void, { curso }): any {
          const elementoExiste = _.findIndex(database.cursos, function(o) {
              return o.id === curso.id
          });
          if (elementoExiste > -1) {
              const valoraciones = database.cursos[elementoExiste].reviews;
              curso.reviews = valoraciones;
              database.cursos[elementoExiste] = curso;
              return curso;
          }
          return {
            id: '-1',
            title: `El curso no existe en la base de datos`,
            description: '',
            clases: '-1',
            time: 0.0,
            logo: '',
            level: 'TODOS',
            path: '',
            teacher: '',
            reviews: []    
    };
  },
    eliminarCurso(__: void, { id }): any {
        const eliminarCurso = _.remove(database.cursos, function(curso) {
            return curso.id === id;
        });
        if (eliminarCurso[0] === undefined) {
            return {
                id: '-1',
                title: `El curso no se pudo eliminar`,
                description: '',
                clases: '-1',
                time: 0.0,
                logo: '',
                level: 'TODOS',
                path: '',
                teacher: '',
                reviews: []    
            };
        }
        return eliminarCurso[0];
    }
  }
};

export default mutation;