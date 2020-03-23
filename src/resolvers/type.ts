import { IResolvers } from 'graphql-tools';
import { database } from './../data/data.store';
import _ from 'lodash';

const type: IResolvers = {
    Estudiante: {
        courses: parent => {
            const cursoLista: Array<any> = [];
            parent.courses.map((curso: string) => {
                cursoLista.push(_.filter(database.cursos, ['id', curso])[0])
            });
            return cursoLista;
        }
    },
    Curso: {
        students: parent => {
            const listaEstudiantes: Array<any> = [];
            const idCurso = parent.id;
            database.estudiantes.map((estudiante: any) => {
                if (estudiante.courses.filter((id: any) => id === idCurso) > 0) {
                    listaEstudiantes.push(estudiante);
                }
            });
            return listaEstudiantes;
        },
        path: parent => `https://www.udemy.com${parent.path}`
    }
};

export default type;