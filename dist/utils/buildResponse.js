"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonResponse = void 0;
function JsonResponse(res, data) {
    res.status(data.statusCode).json({
        status: data.status,
        content: {
            meta: data.meta,
            data: data.data,
        },
    });
}
exports.JsonResponse = JsonResponse;
