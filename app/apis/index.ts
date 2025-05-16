

export async function loader() {
    return Response.json({
        message: "My externally-accessed resource route",
    }, {status: 418})
}
