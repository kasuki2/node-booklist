

function freelist(azid){
    

    document.getElementById("azidinput").value = azid;
    var f = document.getElementById("myform");
    f.submit();

}

function starIncr(star, elem) {
    alert(elem.parentElement.id);

    var send = JSON.stringify({bookid:elem.parentElement.id, stars:star});
    var filename = "/starring";
    getFileAjax(send, filename).then(function (res) {

        alert(JSON.stringify(res));

    });

}

function getFileAjax(send, filename)
{

    return new Promise(function (resolve, reject){


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                resolve(this.responseText);
            }
        };

        xhttp.onerror = function () {
            //reject(this.status + " " + this.statusText);
            //reject("Er");
            console.log("ERROR: - You don't seem to have internet connection.");
        };

        xhttp.open("POST", filename, true);
        //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(send);
    })

}

function callit(bookid) {
    var send = JSON.stringify({bookid:bookid});
    var filename = "/starring";
    getFileAjax(send, filename).then(function (res) {

       alert(JSON.stringify(res));

    });
}

