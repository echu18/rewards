
export const allArrangements = () => {
    return $.ajax({
        url: `/api/arrangements`,
        method: 'GET'
    })
}


export const createArrangement = (arrangementData) => {
    debugger
    return $.ajax({
        url: `/api/arrangements`,
        method: 'POST',
        data: { arrangement: arrangementData }
    })
}

export const getArrangement = (arrangementId) => {
    return $.ajax({
        url: `/api/arrangements/${arrangementId}`,
        method: 'GET',
        data: { arrangementId },
        success: function (data) {
            if (data.errors) {
                res.send(data.errors)
            }
        }
    })
}

export const editArrangement = (arrangementId) => {
    return $.ajax({
        url: `/api/arrangements/${arrangementId}`,
        method: 'PATCH',
        data: { arrangementId }
    })
}

export const deleteArrangement = (arrangementId) => {
    return $.ajax({
        url: `/api/arrangements/${arrangementId}`,
        method: 'DELETE'
    })
}