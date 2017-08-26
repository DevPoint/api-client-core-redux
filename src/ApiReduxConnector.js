
const assign = Object.assign;

class ApiReduxConnector {

    constructor(api, nameSpace) {
        this._api = api;
        this._store = null;
        this._reducer = this._createReducer(nameSpace);
        this._listener = this._listener.bind(this);
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

    _listener() {
        const state = this._store.getState();

        // build new cache state
        const updateCacheState = {};
        for (let itemType in this._api.getCacheItemTypes()) {
            if (this._api.cache(itemType).changed) {
                const updateCacheMapState = {};
                const cacheMap = this._api.cache(itemType);
                const entriesAreObservables = cacheMap.entriesAreObservables;
                for (let itemId in cacheMap.ids()) {
                    const entry = cacheMap.find(itemId);
                    if (!entriesAreObservables || entry.changed) {

                    }
                }
            }
        }

        // build new transactions state
        const updateTransactionState = {};
        if (this._api.transactions().changed) {
            const transactionMap = this._api.transactions();
            for (let transactionId in transactionMap.ids()) {
                const transaction = transactionMap.find(transactionId);
                if (transaction.changed) {

                }
            }
        }

        // build new views state
        const updateViewState = {};
        if (this._api.views().changed) {
            const viewMap = this._api.views();
            for (let viewId in viewMap.ids()) {
                const view = viewMap.find(viewId);
                if (view.changed) {

                }
            }
        }

        // TODO update store state

        // TODO clear cache changes

        // TODO clear transactions changes

        // TODO clear views changes
    }

    _addListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).addListener(this._listener);
        }
        this._api.transactions().addListener(this._listener);
        this._api.views().addListener(this._listener);
    }

    _removeListeners() {
        for (let itemType in this._api.getCacheItemTypes()) {
            this._api.cache(itemType).removeListener(this._listener);
        }
        this._api.transactions().removeListener(this._listener);
        this._api.views().removeListener(this._listener);
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