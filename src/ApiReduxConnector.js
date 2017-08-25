
const assign = Object.assign;

class ApiReduxConnector {

    constructor(api, nameSpace) {
        this._api = api;
        this._store = null;
        this._reducer = this._createReducer(nameSpace);
        this._cacheMapListener = this._cacheMapListener.bind(this);
        this._transactionMapListener = this._transactionMapListener.bind(this);
        this._viewMapListener = this._viewMapListener.bind(this);
    }

    _createReducer(nameSpace) {
        const defaultState = {
            cache: {}
            transactions: {},
            views: {},
        };
        return (state, action) => {
            if (typeof state === 'undefined') {
                state = defaultState;
            } 
            const actionTypeFrags = action.type.split('_');
            if (actionTypeFrags[0] === nameSpace) {
                actionTypeFrags.shift();
            }
            if (actionTypeFrags.length >= 2) {
                if (actionTypeFrags[1] === 'CACHE' && actionTypeFrags.length >= 3) {
                    const cacheUpdateState = {};
                    const itemType = actionTypeFrags[2].toLowerCase();
                    switch (actionTypeFrags[0]) {
                        case 'ADD':
                        case 'SET':
                            cacheUpdateState[itemType] = assign({}, defaultState['cache'][itemType], action.payload);
                            break;
                        case 'UPDATE':
                            cacheUpdateState[itemType] = assign({}, state['cache'][itemType], action.payload);
                            break;
                    }
                    const updateState = {};
                    updateState[updateKey] = assign({}, state['cache'], cacheUpdateState);
                    state = assign({}, state, updateState);
                }
                else {
                    const updateState = {};
                    const updateKey = .toLowerCase();
                    switch (actionTypeFrags[0]) {
                        case 'ADD':
                        case 'SET':
                            updateState[updateKey] = assign({}, defaultState[updateKey], action.payload);
                            break;
                        case 'UPDATE':
                            updateState[updateKey] = assign({}, state[updateKey], action.payload);
                            break;
                    }
                    state = assign({}, state, updateState);
                }
            }
            else (actionTypeFrags.length == 1) {
                switch (actionTypeFrags[0]) {
                    case 'ADD':
                    case 'SET':
                        state = assign({}, defaultState, action.payload);
                        break;
                    case 'UPDATE':
                        state = assign({}, state, action.payload);
                        break;
                }
            }
        };
    }

    _cacheMapListener() {
        const state = this._store.getState();

        // TODO BUILD cache map state

    }

    _transactionMapListener() {
        const state = this._store.getState();

        // TODO BUILD transaction map state

    }

    _viewMapListener() {
        const state = this._store.getState();

        // TODO BUILD view map state

    }

    _addListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).addListener(this._cacheMapListener);
        }
        this._api.transactions().addListener(this._transactionMapListener);
        this._api.views().addListener(this._viewMapListener);
    }

    _removeListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).removeListener(this._cacheMapListener);
        }
        this._api.transactions().removeListener(this._transactionMapListener);
        this._api.views().removeListener(this._viewMapListener);
    }

    reducer() {
        return this._reducer;
    }

    connectStore(store) {
        this._store = store;
        this._addListeners();
    }

    disconnectStore() {
        this._removeListeners();
        this._store = null;
    }
};

export default ApiReduxConnector;