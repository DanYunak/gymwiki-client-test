import { all } from '@redux-saga/core/effects'
import { watchHandleAllExercises } from '../../widgets/Exercises/model/sagas/handleAllExercises'
import { watchCreateExercise } from '../../widgets/Exercises/model/sagas/createExercise'
import { watchEditExercise } from '../../widgets/Exercises/model/sagas/editExercise'
import { watchDeleteExercise } from '../../widgets/Exercises/model/sagas/deleteExercise'

export function* exercisesRootSaga() {
    yield all([
        watchHandleAllExercises(),
        watchCreateExercise(),
        watchEditExercise(),
        watchDeleteExercise()
    ])
}