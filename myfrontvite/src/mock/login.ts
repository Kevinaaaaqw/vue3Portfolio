import { STATUS_CODES } from "http";
import { http, HttpResponse } from "msw";

export default [
    http.post('/login', ({ request }) => {
        return HttpResponse.json({
            message: 'it works :)'
        }, { status: 200 })

    })
]