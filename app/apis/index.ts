

export async function loader() {
    return Response.json({
        message: "My API",
    }, {
        status: 418
    })
}
