var objStudents = [];
var baseURL = "http://localhost/Expensely/api/";

$(function(){
    console.log("Jquery Loaded");
    getStudents();
})

function getStudents(){
    $.get(baseURL+"getstudents", function(data){
        console.log(data.data);
        objStudents = data.data;
        setData();
    })
}

function addStudent(){
    var load = {
        payload: { 
            studno: document.getElementById("studno").value,
            fname: document.getElementById("fname").value,
            lname: document.getElementById("lname").value,
            sex: document.getElementById("sex").value,
            college: document.getElementById("college").value,
            program: document.getElementById("program").value
            
        }
    }
    // console.log(load);

    $.post(baseURL+"addstudent", JSON.stringify(load), function(data){
        objStudents = data.data;
        setData();
    })
}


function setData(){
    var tblString = "";
    objStudents.forEach(e => {
            tblString += `
                <tr>
                    <td>${e.fd_studno.toString()}</td>
                    <td>${e.fd_fname} ${e.fd_lname}</td>
                    <td>${e.fd_college}</td>
                    <td>${e.fd_program}</td>

                    <td><button class="btn btn-primary btn-sm" onclick='viewDetails()'>View/Edit</button>
                    <button class="btn btn-danger btn-sm" onclick='deleteRecord("${e.fd_studno}")'>Delete</button></td>
                </tr>
            
            `;
        });
     // document.getElementById("studentData").innerHTML = tblString;
    $('#studentData').html(tblString);
}


function deleteRecord(studno) {
    console.log(studno);
    var load = {
        payload: { studno: studno }
    }
    $.post(baseURL+"deletestudent", JSON.stringify(load), function(data){
        objStudents = data.data;
        setData();

    })
}

