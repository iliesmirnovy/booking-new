








/*
console.log('Модуль request подключен');

const createRequest = (onSuccess, onError) => () => {
    const serverUrl = 'https://25.javascript.pages.academy/keksobooking/data';
    fetch(serverUrl, {
        method: 'GET',
        credentials: 'same-origin',
        },
    )
    .then((response) => {
        if (response.ok) {
            return response.json()
        }

        throw new Error(`${response.status}, ${response.statusText}`)
    })
    .then((data) => {
        onSuccess(data);
    })
    .catch((err) => {
        onError(err);
    })
}


export {createRequest}

*/