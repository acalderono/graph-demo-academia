import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';
const query: IResolvers = {
    Query: {
        estudiantes(): any {
            return database.estudiantes;
        },
        estudiante(__: void, { id }): any {
            // se obtiene el primer resultadado, seleccionado el primero [0]
            const result = database.estudiantes.filter(estudiante => estudiante.id === id)[0];
            return result !== undefined ? result : { id: '-1', name: `No se ha encontrado el estudiante con el ID ${id}`, email: '', courses: [ ] };
        },
        cursos(): any {
            return database.cursos;
        },
        curso(__: void, { id }): any {
            const result = database.cursos.filter(curso => curso.id === id)[0];
            return result !== undefined ? result : { id: '-1', title: `No se ha encontrado el curso con el ID ${id}`, description: '', clases: -1, time: 0.0, logo: '', level: "TODOS", path: '', teacher: '', reviews: [] }
        }
    }
};

export default query;