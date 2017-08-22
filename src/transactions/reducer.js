
const assign = Object.assign;

export const defaultInsertTransaction = {
    transactionId: null,
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    data: {},
    errors: [],
    validationErrors: null
};

export const defaultUpdateTransaction = {
    transactionId: null,
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    data: {},
    errors: [],
    validationErrors: null
};

export const defaultDeleteTransaction = {
    transactionId: null,
    ready: false,
    processing: true,
    failed: false,
    itemId: null,
    errors: []
};

export const defaultLoginTransaction = {
    transactionId: null,
    ready: false,
    processing: true,
    failed: false,
    userId: null,
    credentials: {},
    errors: [],
    validationErrors: null
};

export const defaultRegisterTransaction = {
    transactionId: null,
    ready: false,
    processing: true,
    failed: false,
    token: '',
    errors: [],
};

function reducer(state, action) {
    const actionTypeFrags = action.type.split('_');
    const updateTransaction = { transactionId: action.id };
    if (action.payload) {
        for (let propKey in action.payload) {
            updateTransaction[propKey] = action.payload[propKey];
        }
    }
    let defaultTransaction = {};
    if (actionTypeFrags.length >= 3) {
        switch (actionTypeFrags[2]) {
            case 'INSERT':
                defaultTransaction = defaultInsertTransaction;
                break;
            case 'UPDATE':
                defaultTransaction = defaultUpdateTransaction;
                break;
            case 'DELETE':
                defaultTransaction = defaultDeleteTransaction;
                break;
            case 'LOGIN':
                defaultTransaction = defaultLoginTransaction;
                break;
            case 'REGISTER':
                defaultTransaction = defaultRegisterTransaction;
                break;
        }
    }
    let updateState = null;
    switch (actionTypeFrags[0]) {
        case 'ADD':
        case 'SET':
            updateState = assign({}, state);
            updateState[action.id] = assign({}, defaultTransaction, updateTransaction);
            state = assign({}, state, updateState);
            break;
        case 'UPDATE':
            updateState = assign({}, state);
            updateState[action.id] = assign({}, state[action.id], updateTransaction);
            state = assign({}, state, updateState);
            break;
        case 'REMOVE':
            state = assign({}, state);
            delete state[action.id];
            break;
    }
    return state;
};

export default reducer;
