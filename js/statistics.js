window.onload = () => {

    let statistics = document.getElementById('statistics');
    statistics.innerHTML = '';

    document.getElementById('show-statistics').addEventListener('click', (event) => {

        event.preventDefault();

        getStatistics();

    });

}

function getStatistics() {

    let difficulty = document.getElementById('difficulty').value;

    let limit = 3;

    let userName = 'petr';

    let data = `difficulty=${difficulty}&limit=${limit}&user_name=${userName}`;

    postAjax(

        'ajax/statistics.php',

        data,

        (reply) => {

            statistics.innerHTML = reply;

        }

    )        

}

function postAjax(url, data, success) {

    let params = typeof data == 'string' ? data : Object.keys(data).map(
    
        function (k) {
    
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
    
        }
    
    ).join('&');

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    xhr.open('POST', url);

    xhr.onreadystatechange = function () {

        if (xhr.readyState > 3 && xhr.status == 200) {

            success(xhr.responseText);

        }

    };

    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(params);

    return xhr;

}