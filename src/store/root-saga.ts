import {all, call} from 'typed-redux-saga/macro';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

// in here we are initializing generator function with multiply
export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas)]);
}