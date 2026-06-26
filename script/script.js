var objExpenses = [];
var baseURL = "http://localhost/Expensely/api/";

$(function(){
    console.log("Jquery Loaded");
    getAllExpenses();
})

function getAllExpenses(){
    $.get(baseURL+"getexpenses", function(data){
        console.log(data.data);
        objExpenses = data.data;
        updateRecord();
    })
}

function addRecord(){
    var load = {
        payload: { 
            category: document.getElementById("category").value,
            amount: document.getElementById("amount").value,
            date: document.getElementById("date").value,
            notes: document.getElementById("notes").value,
        }
    }

    $.post(baseURL+"addRecord", JSON.stringify(load), function(data){
        objExpenses = data.data;
        updateRecord();
    })
}


function updateRecord(){
    var tblString = "";
    objExpenses.forEach(e => {
            tblString += `
            <tr>
            <td colspan="1">${e.fld_id.toString()}</td>
            <td colspan="1">${e.fld_category}</td>
            <td colspan="1">${e.fld_amount}</td>
            <td colspan="1">${e.fld_date}</td>
            <td colspan="1">${e.fld_notes}</td>
            <td colspan="1">
            <button class="btn-edit" onclick='updateRecord("${e.fld_id}")'>
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn-delete" onclick='deleteRecord("${e.fld_id}")'>
            <i class="fa-solid fa-trash"></i>
            </button>
            </td>
            </tr>
            
            `;
        });
     // document.getElementById("expense-table-body").innerHTML = tblString;
    $('#expense-table-body').html(tblString);
}


function deleteRecord(id) {
    console.log(id);
    var load = {
        payload: { id: id }
    }
    $.post(baseURL+"deleteExpense", JSON.stringify(load), function(data){
        objExpenses = data.data;
        updateRecord();
    })
}

