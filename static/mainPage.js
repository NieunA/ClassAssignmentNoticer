function getResult() {
    var oldGrade = document.getElementById("oldGrade").value
    var oldMonth = document.getElementById("oldMonth").value
    oldMonth = parseInt(oldMonth).toString()
    var oldDate = document.getElementById("oldDate").value
    oldDate = parseInt(oldDate).toString()
    var maxLength = 2
    if (oldMonth.length < maxLength) {
        // 앞에 0을 붙이기
        // for Internet Explorer
        oldMonth = Array(maxLength - oldMonth.length + 1).join("0") + oldMonth
    }
    if (oldDate.length < maxLength) {
        // 앞에 0을 붙이기
        // for Internet Explorer
        oldDate = Array(maxLength - oldDate.length + 1).join("0") + oldDate
    }
    var oldName = document.getElementById("oldName").value
    var id = "" + oldGrade + oldMonth + oldDate
    var httpReq = new XMLHttpRequest()
    httpReq.onload = function (event) {
        if (this.status === 200) {
            response = JSON.parse(this.response)
            if (response["success"] === false) {
                alert("입력하신 정보를 다시 한 번 확인해주세요!\n- 2022학년도 기준 정보를 입력해주세요!")
            }
            else {
                document.location.href = document.location.origin + "/result?oldID=" + id + "&name=" + oldName
            }
        }
        else {
            alert("알 수 없는 오류가 발생했어요! 코드: "+this.statusText)
        }
    }
    httpReq.open("POST", "/check", false)
    httpReq.setRequestHeader('Content-Type', 'application/json')
    httpReq.send(JSON.stringify({
        studentID: id,
        name: oldName
    }))
}

function checkEnter(event) {
    if (event.keyCode === 13 || event.key === "Enter") {
        getResult()
    }
}