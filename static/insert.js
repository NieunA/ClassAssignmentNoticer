function insert() {
    var fileInput = document.getElementById("dataFile");
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("dataFile", file);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", false);
    xhr.send(formData);
}