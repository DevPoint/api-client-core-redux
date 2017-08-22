
export default {

    loadingStart: function(nameSpace, viewId, loadingMeta) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: false,
                loading: true,
                loadingFailed: false,
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize,
                    totalCount: 0
                },
                itemsIds: [];
            }
        };
    },


    loadingReady: function(nameSpace, viewId, itemsIds) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                outdated: false,
                loading: false,
                loadingFailed: false,
                loadingMeta: {
                    eagerType: loadingMeta.eagerType,
                    offset: loadingMeta.offset,
                    count: loadingMeta.count,
                    pageSize: loadingMeta.pageSize,
                    totalCount: loadingMeta.totalCount
                },
                itemsIds: itemsIds;
            }
        };
    },

    loadingFailed: function(nameSpace, viewId, errors, validationErrors) {
        const nameSpacePrefix = (nameSpace) ? '_' + nameSpace : '';
        return {
            type: nameSpacePrefix . 'UPDATE_VIEW',
            id: viewId,
            payload: {
                ready: true,
                processing: false,
                failed: true,
                errors: errors,
                validationErrors: validationErrors
            }
        };
    },

};
