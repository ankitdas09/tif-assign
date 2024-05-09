import express from "express";
function JsonResponse(
    res: express.Response,
    data: { statusCode: number; status: boolean; data?: any; meta?: any }
) {
    res.status(data.statusCode).json({
        status: data.status,
        content: {
            meta: data.meta,
            data: data.data,
        },
    });
}

export { JsonResponse };
