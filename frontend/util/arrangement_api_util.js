
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
        data: { arrangementId }
        // ,
        // success: function(data){
        //     let parsedData = []
        //     for (let i=0; i<data.board.length; i++){
        //         let row = [];
        //         for (let j = 0; j < 5; j++) {
        //             row.push(parseInt(data.board[i][j]))
        //         }
        //         parsedData.push(row)
        //     }
        //     return parsedData;
        // }
    })
}

export const editArrangement = (arrangementId, arrangementData) => {
    return $.ajax({
        url: `/api/arrangements/${arrangementId}`,
        method: 'PATCH',
        data: { arrangement: arrangementData}
    })
}

export const deleteArrangement = (arrangementId) => {
    return $.ajax({
        url: `/api/arrangements/${arrangementId}`,
        method: 'DELETE'
    })
}