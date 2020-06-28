"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * As you can see, the viaHandler requires the /functions/get-index.handler function and calls it with the
 * event payload {}, and an empty context object {}.And to make it easier to validate the response, it also
 * parses JSON response body if the Content-Type header is application/json or omitted (which would default
 * to application/json anyway).
 *
 * The reason why we're JSON parsing body is also to mirror the behaviour of the HTTP client axios,
 * which we'll use later when implementing our acceptance tests.
 */
const APP_ROOT = '../../';
const _ = require('lodash');
const aws4 = require('aws4');
const URL = require('url');
const http = require('axios');
const { promisify } = require('util');
/**
 * To allow the when module to toggle between "invoke function locally" and
 * "call the deployed API", we can use an environment variable that is set
 * when we run the test.
 *
 * for integration tests we call TEST_MODE=handler at runtime
 * for e2e tests we call TEST_MODE=http at runtime
 */
const mode = process.env.TEST_MODE;
const viaHandler = async (event, functionName) => {
    // sinnce we are using the middy middleware lib on our functions (which helps us access ssm), we need to promisify the callback that the middy wrapped handlers onw return.
    const handler = promisify(require(`${APP_ROOT}/functions/${functionName}`).handler);
    const context = {};
    // literally just call the function with an event and context object
    const response = await handler(event, context);
    const contentType = _.get(response, 'headers.Content-Type', 'application/json');
    if (_.get(response, 'body') && contentType === 'application/json') {
        response.body = JSON.parse(response.body);
    }
    return response;
};
/**
 *
 * Since axios has a different response structure to our Lambda function, we need the respondFrom method massage the axios response to what we need
 */
const respondFrom = async (httpRes) => {
    return {
        statusCode: httpRes.status,
        body: httpRes.data,
        headers: {
            'Content-Type': httpRes.headers['content-type'],
            ...http.headers
        }
    };
};
/**
 * When you send HTTP requests to AWS, you sign the requests so that AWS can identify who sent them.
 * We sign requests with our AWS access key, which consists of an access key ID and secret access key.
 *
 * Signing makes sure that the request has been sent by someone with a valid access key.
 *
 * For this test we are signing the request for API Gateway. Amazon API Gateway requires that you authenticate
 * every request you send by signing the request.
 *
 * For payload-less methods, such as GET, the SignedHeaders string, used to sign the request using Signature Version 4,
 * must include host;x-amz-date.
 * For method requiring payloads, such as POST, the SignedHeaders string must also include content-type.
 * Unlike other AWS services, such as DynamoDB, the x-amz-target header is not required to compute the Authorization header value.
 *
 * More Infor here: https://docs.aws.amazon.com/apigateway/api-reference/signing-requests/
 */
const signHttpRequest = (url) => {
    const urlData = URL.parse(url);
    const opts = {
        host: urlData.hostname,
        path: urlData.pathname
    };
    aws4.sign(opts);
    return opts.headers;
};
/**
 * viaHttp method makes a HTTP request to the relative path on
 * the rootUrl environment variable (which we configured in the
 * serverless.yml and loaded through .env file that's generated
 * before every test).
 *
 * You can pass in an opts object to pass in additional arguments:
 *    body: useful for POST and PUT requests.
 *    iam_auth: we should sign the HTTP request using our IAM credentials (which is what the signHttpRequest method is for)
 *    auth: include this as the Authorization header, used for authenticating against Cognito-protected endpoints (i.e. search-restaurants)
 */
const viaHttp = async (relPath, method, opts) => {
    const url = `${process.env.rootUrl}/${relPath}`;
    console.info(`invoking via HTTP ${method} ${url}`);
    try {
        const data = _.get(opts, "body");
        let headers = {};
        if (_.get(opts, "iam_auth", false) === true) {
            headers = signHttpRequest(url);
        }
        const authHeader = _.get(opts, "auth");
        if (authHeader) {
            headers.Authorization = authHeader;
        }
        const httpReq = http.request({
            method, url, headers, data
        });
        const res = await httpReq;
        return respondFrom(res);
    }
    catch (err) {
        if (err.status) {
            return {
                statusCode: err.status,
                headers: err.response.headers
            };
        }
        else {
            throw err;
        }
    }
};
const we_invoke_get_index = async () => {
    switch (mode) {
        case 'handler':
            return await viaHandler({}, 'get-index');
        case 'http':
            return await viaHttp('', 'GET', null);
        default:
            throw new Error(`unsupported mode: ${mode}`);
    }
};
const we_invoke_get_restaurants = async () => {
    switch (mode) {
        case 'handler':
            return await viaHandler({}, 'get-restaurants');
        case 'http':
            return await viaHttp('restaurants', 'GET', { iam_auth: true });
        default:
            throw new Error(`unsupported mode: ${mode}`);
    }
};
const we_invoke_search_restaurants = async (theme, user) => {
    const body = JSON.stringify({ theme });
    switch (mode) {
        case 'handler':
            return await viaHandler({ body }, 'search-restaurants');
        case 'http':
            const auth = user.idToken;
            return await viaHttp('restaurants/search', 'POST', { body, auth });
        default:
            throw new Error(`unsupported mode: ${mode}`);
    }
};
const we_invoke_place_order = async (user, restaurantName) => {
    const body = JSON.stringify({ restaurantName });
    switch (mode) {
        case 'handler':
            return await viaHandler({ body }, 'place-order');
        case 'http':
            const auth = user.idToken;
            return await viaHttp('orders', 'POST', { body, auth });
        default:
            throw new Error(`unsupported mode: ${mode}`);
    }
};
const we_invoke_notify_restaurant = async (event) => {
    if (mode === 'handler') {
        await viaHandler(event, 'notify-restaurant');
    }
    else {
        throw new Error('not supported');
    }
};
exports.when = {
    we_invoke_get_index,
    we_invoke_get_restaurants,
    we_invoke_search_restaurants,
    we_invoke_place_order,
    we_invoke_notify_restaurant
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2hlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndoZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQTtBQUN6QixNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDM0IsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQzVCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUMxQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDN0IsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtBQUVyQzs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUE7QUFFbEMsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxZQUFpQixFQUFFLEVBQUU7SUFDekQsMktBQTJLO0lBQzNLLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxRQUFRLGNBQWMsWUFBWSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUVuRixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUE7SUFFbEIsb0VBQW9FO0lBQ3BFLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM5QyxNQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxzQkFBc0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hGLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksV0FBVyxLQUFLLGtCQUFrQixFQUFFO1FBQ2pFLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLFFBQVEsQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDSCxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsT0FBWSxFQUFFLEVBQUU7SUFDekMsT0FBTztRQUNMLFVBQVUsRUFBRSxPQUFPLENBQUMsTUFBTTtRQUMxQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7UUFDbEIsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQy9DLEdBQUcsSUFBSSxDQUFDLE9BQU87U0FDaEI7S0FDRixDQUFBO0FBQ0gsQ0FBQyxDQUFBO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtJQUNuQyxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzlCLE1BQU0sSUFBSSxHQUFRO1FBQ2hCLElBQUksRUFBRSxPQUFPLENBQUMsUUFBUTtRQUN0QixJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDdkIsQ0FBQTtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDZixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxPQUFZLEVBQUUsTUFBVyxFQUFFLElBQVMsRUFBRSxFQUFFO0lBQzdELE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxFQUFFLENBQUE7SUFDL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsTUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFFbEQsSUFBSTtRQUNGLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2hDLElBQUksT0FBTyxHQUFRLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDM0MsT0FBTyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUMvQjtRQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RDLElBQUksVUFBVSxFQUFFO1lBQ2QsT0FBTyxDQUFDLGFBQWEsR0FBRyxVQUFVLENBQUE7U0FDbkM7UUFFRCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUk7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUE7UUFFekIsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDeEI7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUNkLE9BQU87Z0JBQ0wsVUFBVSxFQUFFLEdBQUcsQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPO2FBQzlCLENBQUE7U0FDRjthQUFNO1lBQ0wsTUFBTSxHQUFHLENBQUE7U0FDVjtLQUNGO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxLQUFLLElBQUksRUFBRTtJQUNyQyxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssU0FBUztZQUNaLE9BQU8sTUFBTSxVQUFVLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzFDLEtBQUssTUFBTTtZQUNULE9BQU8sTUFBTSxPQUFPLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUN2QztZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUE7S0FDL0M7QUFDSCxDQUFDLENBQUE7QUFDRCxNQUFNLHlCQUF5QixHQUFHLEtBQUssSUFBSSxFQUFFO0lBQzNDLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxTQUFTO1lBQ1osT0FBTyxNQUFNLFVBQVUsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtRQUNoRCxLQUFLLE1BQU07WUFDVCxPQUFPLE1BQU0sT0FBTyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUNoRTtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLElBQUksRUFBRSxDQUFDLENBQUE7S0FDL0M7QUFDSCxDQUFDLENBQUE7QUFDRCxNQUFNLDRCQUE0QixHQUFHLEtBQUssRUFBRSxLQUFVLEVBQUUsSUFBUyxFQUFFLEVBQUU7SUFDbkUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFFdEMsUUFBUSxJQUFJLEVBQUU7UUFDWixLQUFLLFNBQVM7WUFDWixPQUFPLE1BQU0sVUFBVSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQTtRQUN6RCxLQUFLLE1BQU07WUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQ3pCLE9BQU8sTUFBTSxPQUFPLENBQUMsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDcEU7WUFDRSxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixJQUFJLEVBQUUsQ0FBQyxDQUFBO0tBQy9DO0FBQ0gsQ0FBQyxDQUFBO0FBRUQsTUFBTSxxQkFBcUIsR0FBRyxLQUFLLEVBQUUsSUFBUyxFQUFFLGNBQWtCLEVBQUUsRUFBRTtJQUNwRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQTtJQUUvQyxRQUFRLElBQUksRUFBRTtRQUNaLEtBQUssU0FBUztZQUNaLE9BQU8sTUFBTSxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQTtRQUNsRCxLQUFLLE1BQU07WUFDVCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQ3pCLE9BQU8sTUFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQ3hEO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxFQUFFLENBQUMsQ0FBQTtLQUMvQztBQUNILENBQUMsQ0FBQTtBQUVELE1BQU0sMkJBQTJCLEdBQUcsS0FBSyxFQUFFLEtBQVUsRUFBRSxFQUFFO0lBQ3ZELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUN0QixNQUFNLFVBQVUsQ0FBQyxLQUFLLEVBQUUsbUJBQW1CLENBQUMsQ0FBQTtLQUM3QztTQUFNO1FBQ0wsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtLQUNqQztBQUNILENBQUMsQ0FBQTtBQUVZLFFBQUEsSUFBSSxHQUFHO0lBQ2xCLG1CQUFtQjtJQUNuQix5QkFBeUI7SUFDekIsNEJBQTRCO0lBQzVCLHFCQUFxQjtJQUNyQiwyQkFBMkI7Q0FDNUIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQXMgeW91IGNhbiBzZWUsIHRoZSB2aWFIYW5kbGVyIHJlcXVpcmVzIHRoZSAvZnVuY3Rpb25zL2dldC1pbmRleC5oYW5kbGVyIGZ1bmN0aW9uIGFuZCBjYWxscyBpdCB3aXRoIHRoZVxuICogZXZlbnQgcGF5bG9hZCB7fSwgYW5kIGFuIGVtcHR5IGNvbnRleHQgb2JqZWN0IHt9LkFuZCB0byBtYWtlIGl0IGVhc2llciB0byB2YWxpZGF0ZSB0aGUgcmVzcG9uc2UsIGl0IGFsc29cbiAqIHBhcnNlcyBKU09OIHJlc3BvbnNlIGJvZHkgaWYgdGhlIENvbnRlbnQtVHlwZSBoZWFkZXIgaXMgYXBwbGljYXRpb24vanNvbiBvciBvbWl0dGVkICh3aGljaCB3b3VsZCBkZWZhdWx0XG4gKiB0byBhcHBsaWNhdGlvbi9qc29uIGFueXdheSkuXG4gKiBcbiAqIFRoZSByZWFzb24gd2h5IHdlJ3JlIEpTT04gcGFyc2luZyBib2R5IGlzIGFsc28gdG8gbWlycm9yIHRoZSBiZWhhdmlvdXIgb2YgdGhlIEhUVFAgY2xpZW50IGF4aW9zLFxuICogd2hpY2ggd2UnbGwgdXNlIGxhdGVyIHdoZW4gaW1wbGVtZW50aW5nIG91ciBhY2NlcHRhbmNlIHRlc3RzLlxuICovXG5jb25zdCBBUFBfUk9PVCA9ICcuLi8uLi8nXG5jb25zdCBfID0gcmVxdWlyZSgnbG9kYXNoJylcbmNvbnN0IGF3czQgPSByZXF1aXJlKCdhd3M0JylcbmNvbnN0IFVSTCA9IHJlcXVpcmUoJ3VybCcpXG5jb25zdCBodHRwID0gcmVxdWlyZSgnYXhpb3MnKVxuY29uc3QgeyBwcm9taXNpZnkgfSA9IHJlcXVpcmUoJ3V0aWwnKVxuXG4vKipcbiAqIFRvIGFsbG93IHRoZSB3aGVuIG1vZHVsZSB0byB0b2dnbGUgYmV0d2VlbiBcImludm9rZSBmdW5jdGlvbiBsb2NhbGx5XCIgYW5kXG4gKiBcImNhbGwgdGhlIGRlcGxveWVkIEFQSVwiLCB3ZSBjYW4gdXNlIGFuIGVudmlyb25tZW50IHZhcmlhYmxlIHRoYXQgaXMgc2V0XG4gKiB3aGVuIHdlIHJ1biB0aGUgdGVzdC5cbiAqIFxuICogZm9yIGludGVncmF0aW9uIHRlc3RzIHdlIGNhbGwgVEVTVF9NT0RFPWhhbmRsZXIgYXQgcnVudGltZVxuICogZm9yIGUyZSB0ZXN0cyB3ZSBjYWxsIFRFU1RfTU9ERT1odHRwIGF0IHJ1bnRpbWVcbiAqL1xuY29uc3QgbW9kZSA9IHByb2Nlc3MuZW52LlRFU1RfTU9ERVxuXG5jb25zdCB2aWFIYW5kbGVyID0gYXN5bmMgKGV2ZW50OiBhbnksIGZ1bmN0aW9uTmFtZTogYW55KSA9PiB7XG4gIC8vIHNpbm5jZSB3ZSBhcmUgdXNpbmcgdGhlIG1pZGR5IG1pZGRsZXdhcmUgbGliIG9uIG91ciBmdW5jdGlvbnMgKHdoaWNoIGhlbHBzIHVzIGFjY2VzcyBzc20pLCB3ZSBuZWVkIHRvIHByb21pc2lmeSB0aGUgY2FsbGJhY2sgdGhhdCB0aGUgbWlkZHkgd3JhcHBlZCBoYW5kbGVycyBvbncgcmV0dXJuLlxuICBjb25zdCBoYW5kbGVyID0gcHJvbWlzaWZ5KHJlcXVpcmUoYCR7QVBQX1JPT1R9L2Z1bmN0aW9ucy8ke2Z1bmN0aW9uTmFtZX1gKS5oYW5kbGVyKVxuXG4gIGNvbnN0IGNvbnRleHQgPSB7fVxuXG4gIC8vIGxpdGVyYWxseSBqdXN0IGNhbGwgdGhlIGZ1bmN0aW9uIHdpdGggYW4gZXZlbnQgYW5kIGNvbnRleHQgb2JqZWN0XG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlcihldmVudCwgY29udGV4dClcbiAgY29uc3QgY29udGVudFR5cGUgPSBfLmdldChyZXNwb25zZSwgJ2hlYWRlcnMuQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgaWYgKF8uZ2V0KHJlc3BvbnNlLCAnYm9keScpICYmIGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5wYXJzZShyZXNwb25zZS5ib2R5KTtcbiAgfVxuICByZXR1cm4gcmVzcG9uc2Vcbn1cblxuLyoqXG4gKiBcbiAqIFNpbmNlIGF4aW9zIGhhcyBhIGRpZmZlcmVudCByZXNwb25zZSBzdHJ1Y3R1cmUgdG8gb3VyIExhbWJkYSBmdW5jdGlvbiwgd2UgbmVlZCB0aGUgcmVzcG9uZEZyb20gbWV0aG9kIG1hc3NhZ2UgdGhlIGF4aW9zIHJlc3BvbnNlIHRvIHdoYXQgd2UgbmVlZCBcbiAqL1xuY29uc3QgcmVzcG9uZEZyb20gPSBhc3luYyAoaHR0cFJlczogYW55KSA9PiB7XG4gIHJldHVybiB7XG4gICAgc3RhdHVzQ29kZTogaHR0cFJlcy5zdGF0dXMsXG4gICAgYm9keTogaHR0cFJlcy5kYXRhLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiBodHRwUmVzLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddLFxuICAgICAgLi4uaHR0cC5oZWFkZXJzXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogV2hlbiB5b3Ugc2VuZCBIVFRQIHJlcXVlc3RzIHRvIEFXUywgeW91IHNpZ24gdGhlIHJlcXVlc3RzIHNvIHRoYXQgQVdTIGNhbiBpZGVudGlmeSB3aG8gc2VudCB0aGVtLlxuICogV2Ugc2lnbiByZXF1ZXN0cyB3aXRoIG91ciBBV1MgYWNjZXNzIGtleSwgd2hpY2ggY29uc2lzdHMgb2YgYW4gYWNjZXNzIGtleSBJRCBhbmQgc2VjcmV0IGFjY2VzcyBrZXkuXG4gKiBcbiAqIFNpZ25pbmcgbWFrZXMgc3VyZSB0aGF0IHRoZSByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgYnkgc29tZW9uZSB3aXRoIGEgdmFsaWQgYWNjZXNzIGtleS5cbiAqIFxuICogRm9yIHRoaXMgdGVzdCB3ZSBhcmUgc2lnbmluZyB0aGUgcmVxdWVzdCBmb3IgQVBJIEdhdGV3YXkuIEFtYXpvbiBBUEkgR2F0ZXdheSByZXF1aXJlcyB0aGF0IHlvdSBhdXRoZW50aWNhdGVcbiAqIGV2ZXJ5IHJlcXVlc3QgeW91IHNlbmQgYnkgc2lnbmluZyB0aGUgcmVxdWVzdC5cbiAqIFxuICogRm9yIHBheWxvYWQtbGVzcyBtZXRob2RzLCBzdWNoIGFzIEdFVCwgdGhlIFNpZ25lZEhlYWRlcnMgc3RyaW5nLCB1c2VkIHRvIHNpZ24gdGhlIHJlcXVlc3QgdXNpbmcgU2lnbmF0dXJlIFZlcnNpb24gNCxcbiAqIG11c3QgaW5jbHVkZSBob3N0O3gtYW16LWRhdGUuXG4gKiBGb3IgbWV0aG9kIHJlcXVpcmluZyBwYXlsb2Fkcywgc3VjaCBhcyBQT1NULCB0aGUgU2lnbmVkSGVhZGVycyBzdHJpbmcgbXVzdCBhbHNvIGluY2x1ZGUgY29udGVudC10eXBlLlxuICogVW5saWtlIG90aGVyIEFXUyBzZXJ2aWNlcywgc3VjaCBhcyBEeW5hbW9EQiwgdGhlIHgtYW16LXRhcmdldCBoZWFkZXIgaXMgbm90IHJlcXVpcmVkIHRvIGNvbXB1dGUgdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyIHZhbHVlLlxuICogXG4gKiBNb3JlIEluZm9yIGhlcmU6IGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9hcGlnYXRld2F5L2FwaS1yZWZlcmVuY2Uvc2lnbmluZy1yZXF1ZXN0cy9cbiAqL1xuY29uc3Qgc2lnbkh0dHBSZXF1ZXN0ID0gKHVybDogYW55KSA9PiB7XG4gIGNvbnN0IHVybERhdGEgPSBVUkwucGFyc2UodXJsKVxuICBjb25zdCBvcHRzOiBhbnkgPSB7XG4gICAgaG9zdDogdXJsRGF0YS5ob3N0bmFtZSxcbiAgICBwYXRoOiB1cmxEYXRhLnBhdGhuYW1lXG4gIH1cblxuICBhd3M0LnNpZ24ob3B0cylcbiAgcmV0dXJuIG9wdHMuaGVhZGVyc1xufVxuXG4vKipcbiAqIHZpYUh0dHAgbWV0aG9kIG1ha2VzIGEgSFRUUCByZXF1ZXN0IHRvIHRoZSByZWxhdGl2ZSBwYXRoIG9uXG4gKiB0aGUgcm9vdFVybCBlbnZpcm9ubWVudCB2YXJpYWJsZSAod2hpY2ggd2UgY29uZmlndXJlZCBpbiB0aGVcbiAqIHNlcnZlcmxlc3MueW1sIGFuZCBsb2FkZWQgdGhyb3VnaCAuZW52IGZpbGUgdGhhdCdzIGdlbmVyYXRlZFxuICogYmVmb3JlIGV2ZXJ5IHRlc3QpLlxuICogXG4gKiBZb3UgY2FuIHBhc3MgaW4gYW4gb3B0cyBvYmplY3QgdG8gcGFzcyBpbiBhZGRpdGlvbmFsIGFyZ3VtZW50czpcbiAqICAgIGJvZHk6IHVzZWZ1bCBmb3IgUE9TVCBhbmQgUFVUIHJlcXVlc3RzLlxuICogICAgaWFtX2F1dGg6IHdlIHNob3VsZCBzaWduIHRoZSBIVFRQIHJlcXVlc3QgdXNpbmcgb3VyIElBTSBjcmVkZW50aWFscyAod2hpY2ggaXMgd2hhdCB0aGUgc2lnbkh0dHBSZXF1ZXN0IG1ldGhvZCBpcyBmb3IpXG4gKiAgICBhdXRoOiBpbmNsdWRlIHRoaXMgYXMgdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLCB1c2VkIGZvciBhdXRoZW50aWNhdGluZyBhZ2FpbnN0IENvZ25pdG8tcHJvdGVjdGVkIGVuZHBvaW50cyAoaS5lLiBzZWFyY2gtcmVzdGF1cmFudHMpXG4gKi9cbmNvbnN0IHZpYUh0dHAgPSBhc3luYyAocmVsUGF0aDogYW55LCBtZXRob2Q6IGFueSwgb3B0czogYW55KSA9PiB7XG4gIGNvbnN0IHVybCA9IGAke3Byb2Nlc3MuZW52LnJvb3RVcmx9LyR7cmVsUGF0aH1gXG4gIGNvbnNvbGUuaW5mbyhgaW52b2tpbmcgdmlhIEhUVFAgJHttZXRob2R9ICR7dXJsfWApXG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gXy5nZXQob3B0cywgXCJib2R5XCIpXG4gICAgbGV0IGhlYWRlcnM6IGFueSA9IHt9O1xuICAgIGlmIChfLmdldChvcHRzLCBcImlhbV9hdXRoXCIsIGZhbHNlKSA9PT0gdHJ1ZSkge1xuICAgICAgaGVhZGVycyA9IHNpZ25IdHRwUmVxdWVzdCh1cmwpXG4gICAgfVxuXG4gICAgY29uc3QgYXV0aEhlYWRlciA9IF8uZ2V0KG9wdHMsIFwiYXV0aFwiKVxuICAgIGlmIChhdXRoSGVhZGVyKSB7XG4gICAgICBoZWFkZXJzLkF1dGhvcml6YXRpb24gPSBhdXRoSGVhZGVyXG4gICAgfVxuXG4gICAgY29uc3QgaHR0cFJlcSA9IGh0dHAucmVxdWVzdCh7XG4gICAgICBtZXRob2QsIHVybCwgaGVhZGVycywgZGF0YVxuICAgIH0pXG5cbiAgICBjb25zdCByZXMgPSBhd2FpdCBodHRwUmVxXG5cbiAgICByZXR1cm4gcmVzcG9uZEZyb20ocmVzKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLnN0YXR1cykge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhdHVzQ29kZTogZXJyLnN0YXR1cyxcbiAgICAgICAgaGVhZGVyczogZXJyLnJlc3BvbnNlLmhlYWRlcnNcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHdlX2ludm9rZV9nZXRfaW5kZXggPSBhc3luYyAoKSA9PiB7XG4gIHN3aXRjaCAobW9kZSkge1xuICAgIGNhc2UgJ2hhbmRsZXInOlxuICAgICAgcmV0dXJuIGF3YWl0IHZpYUhhbmRsZXIoe30sICdnZXQtaW5kZXgnKVxuICAgIGNhc2UgJ2h0dHAnOlxuICAgICAgcmV0dXJuIGF3YWl0IHZpYUh0dHAoJycsICdHRVQnLCBudWxsKVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHVuc3VwcG9ydGVkIG1vZGU6ICR7bW9kZX1gKVxuICB9XG59XG5jb25zdCB3ZV9pbnZva2VfZ2V0X3Jlc3RhdXJhbnRzID0gYXN5bmMgKCkgPT4ge1xuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlICdoYW5kbGVyJzpcbiAgICAgIHJldHVybiBhd2FpdCB2aWFIYW5kbGVyKHt9LCAnZ2V0LXJlc3RhdXJhbnRzJylcbiAgICBjYXNlICdodHRwJzpcbiAgICAgIHJldHVybiBhd2FpdCB2aWFIdHRwKCdyZXN0YXVyYW50cycsICdHRVQnLCB7IGlhbV9hdXRoOiB0cnVlIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbW9kZTogJHttb2RlfWApXG4gIH1cbn1cbmNvbnN0IHdlX2ludm9rZV9zZWFyY2hfcmVzdGF1cmFudHMgPSBhc3luYyAodGhlbWU6IGFueSwgdXNlcjogYW55KSA9PiB7XG4gIGNvbnN0IGJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IHRoZW1lIH0pXG5cbiAgc3dpdGNoIChtb2RlKSB7XG4gICAgY2FzZSAnaGFuZGxlcic6XG4gICAgICByZXR1cm4gYXdhaXQgdmlhSGFuZGxlcih7IGJvZHkgfSwgJ3NlYXJjaC1yZXN0YXVyYW50cycpXG4gICAgY2FzZSAnaHR0cCc6XG4gICAgICBjb25zdCBhdXRoID0gdXNlci5pZFRva2VuXG4gICAgICByZXR1cm4gYXdhaXQgdmlhSHR0cCgncmVzdGF1cmFudHMvc2VhcmNoJywgJ1BPU1QnLCB7IGJvZHksIGF1dGggfSlcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKGB1bnN1cHBvcnRlZCBtb2RlOiAke21vZGV9YClcbiAgfVxufVxuXG5jb25zdCB3ZV9pbnZva2VfcGxhY2Vfb3JkZXIgPSBhc3luYyAodXNlcjogYW55LCByZXN0YXVyYW50TmFtZTphbnkpID0+IHtcbiAgY29uc3QgYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgcmVzdGF1cmFudE5hbWUgfSlcblxuICBzd2l0Y2ggKG1vZGUpIHtcbiAgICBjYXNlICdoYW5kbGVyJzpcbiAgICAgIHJldHVybiBhd2FpdCB2aWFIYW5kbGVyKHsgYm9keSB9LCAncGxhY2Utb3JkZXInKVxuICAgIGNhc2UgJ2h0dHAnOlxuICAgICAgY29uc3QgYXV0aCA9IHVzZXIuaWRUb2tlblxuICAgICAgcmV0dXJuIGF3YWl0IHZpYUh0dHAoJ29yZGVycycsICdQT1NUJywgeyBib2R5LCBhdXRoIH0pXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5zdXBwb3J0ZWQgbW9kZTogJHttb2RlfWApXG4gIH1cbn1cblxuY29uc3Qgd2VfaW52b2tlX25vdGlmeV9yZXN0YXVyYW50ID0gYXN5bmMgKGV2ZW50OiBhbnkpID0+IHtcbiAgaWYgKG1vZGUgPT09ICdoYW5kbGVyJykge1xuICAgIGF3YWl0IHZpYUhhbmRsZXIoZXZlbnQsICdub3RpZnktcmVzdGF1cmFudCcpXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydGVkJylcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgd2hlbiA9IHtcbiAgd2VfaW52b2tlX2dldF9pbmRleCxcbiAgd2VfaW52b2tlX2dldF9yZXN0YXVyYW50cyxcbiAgd2VfaW52b2tlX3NlYXJjaF9yZXN0YXVyYW50cyxcbiAgd2VfaW52b2tlX3BsYWNlX29yZGVyLFxuICB3ZV9pbnZva2Vfbm90aWZ5X3Jlc3RhdXJhbnRcbn1cbiJdfQ==