

function freelist(azid){
    

    document.getElementById("azidinput").value = azid;
    var f = document.getElementById("myform");
    f.submit();

}

function starIncr(star, elem) {
    //alert(elem.parentElement.id);

    var send = JSON.stringify({bookid:elem.parentElement.id, stars:star});
    var filename = "/starring";
    getFileAjax(send, filename).then(function (res) {
        var valasz = JSON.parse(res);

       // alert(valasz.stars);
        elem.parentElement.innerHTML = starSets(valasz.stars);

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

function delBook(elem) {
   // alert(elem.parentElement.id);

    if(confirm("Do you really want to delete this book?")){

        var send = JSON.stringify({bookid:elem.parentElement.id});
        var filename = "/delete";
        getFileAjax(send, filename).then(function (res) {
            var valasz = JSON.parse(res);

            alert(valasz.result);
            if(valasz.result == "ok"){
                //elem.parentElement.remove();
                alert("The book has been deleted successfully.");
                location.reload();
            } else {
                alert("Error deleting the book.");
            }

            // elem.parentElement.innerHTML = starSets(valasz.stars);

        });

    }

}


function starSets(ss) {

    var ret = "";
    if(ss == 0){
        ret += `<span class='emptystar' onclick='starIncr(1, this)'>★</span>`;
        ret += `<span class='emptystar' onclick='starIncr(2, this)'>★</span>`;
        ret += `<span class='emptystar' onclick='starIncr(3, this)'>★</span>`;
    } else if(ss == 1){
        ret += `<span class='fullstar' onclick='starIncr(1, this)' >★</span>`;
        ret += `<span class='emptystar' onclick='starIncr(2, this)'>★</span>`;
        ret += `<span class='emptystar' onclick='starIncr(3, this)'>★</span>`;
    } else if(ss == 2){
        ret += `<span class='fullstar' onclick='starIncr(1, this)' >★</span>`;
        ret += `<span class='fullstar' onclick='starIncr(2, this)'>★</span>`;
        ret += `<span class='emptystar' onclick='starIncr(3, this)'>★</span>`;
    } else {
        ret += `<span class='fullstar' onclick='starIncr(1, this)' >★</span>`;
        ret += `<span class='fullstar' onclick='starIncr(2, this)'>★</span>`;
        ret += `<span class='fullstar' onclick='starIncr(3, this)'>★</span>`;
    }

    return ret;

}