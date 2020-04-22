import httpStatus from 'http-status-codes';
import rUpdate from 'react-addons-update';

export const sendResponse = (res, params) => {

    let resContent = rUpdate({}, { $merge: params });

    const { error } = resContent;
    resContent.OK = !error;

    res.status(httpStatus[params.type || 'OK']);

    if (params.type === 'UNAUTHORIZED') {
        resContent.message = resContent.message || 'You are not authroized to perform this action.';
    }
    else if (params.type === 'INTERNAL_SERVER_ERROR') {
        resContent.message = resContent.message || 'Something went wrong while processing your request. Try again later.';
    }
    else if (params.type === 'BAD_REQUEST') {
        resContent.message = resContent.message || 'Required fields are incorrect / missing.';
    }
    else {
        if (resContent.data instanceof Array) {
            resContent.count = resContent.data.length;
        }
        else if (resContent.data && resContent.data.nModified === 1) {
            delete resContent.data;
        }
    }

    res.json(resContent);
};

export const handleModelRes = (promise, res, options = {}) => {
    promise.then(
        dbRes => {
            console.log('res.req.url = %o', res.req.url);
            sendResponse(res, {
                data: options.onSuccess ? options.onSuccess(dbRes) : dbRes,
                message: options.success || ''
            })
        }, dbErr => {
            console.log(dbErr);
            if (/invalid/i.test(dbErr.message) || /must be array/i.test(dbErr.message)) {
                return sendResponse(res, {
                    error: 'Invalid values',
                    message: dbErr.message || options.error,
                    type: 'BAD_REQUEST'
                })
            }
            return sendResponse(res, {
                error: dbErr,
                message: options.error || 'Cannot handle request. Try again later',
                type: 'INTERNAL_SERVER_ERROR'
            });
        }
    ).catch(dbReason => {
        console.log(dbReason);
        sendResponse(res, {
            error: dbReason,
            message: options.error || 'Cannot handle request. Try again later',
            type: 'INTERNAL_SERVER_ERROR'
        });
    });
};