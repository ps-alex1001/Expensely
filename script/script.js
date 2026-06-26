var objExpenses = [];
var baseURL = "http://localhost/Expensely/api/";

$(function () {
    console.log("Jquery Loaded");
    getAllExpenses();

    // $(".form").on("submit", function (e) {
    //     e.preventDefault();
    //     addRecord();
    // });
});

function getAllExpenses() {
    $.get(baseURL + "getAllExpenses", function (data) {
        console.log(data.data);
        objExpenses = data.data;
        updateRecord();
    });
}
// 
function insertRecord() {
    var load = {
        payload: {
            category_id: document.getElementById("category").value,
            amount: document.getElementById("amount").value,
            date: document.getElementById("date").value,
            note: document.getElementById("notes").value
        }
    };

    $.post(baseURL + "insertRecord", JSON.stringify(load), function (data) {
        objExpenses = data.data;
        updateRecord();
    });
}

// Done
function updateRecord() {
    var tblString = "";
    

    var totalExpenses = 0;
    var uniqueCategories = [];

    objExpenses.forEach(function (e) {

        totalExpenses += parseFloat(e.fld_amount) || 0;


        if (!uniqueCategories.includes(e.fld_category)) {
            uniqueCategories.push(e.fld_category);
        }

        tblString += `
            <tr id="row-${e.fld_id}">
                <td>${e.fld_id}</td>
                <td>${e.category}</td>
                <td>₱${e.fld_amount}</td>
                <td>${e.fld_date}</td>
                <td>${e.fld_note || ''}</td>
                <td>
                    <button type="button" class="btn-edit" onclick="editRecord('${e.fld_id}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button type="button" class="btn-delete" onclick="deleteRecord('${e.fld_id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>   
        `;
    });


    var totalCount = objExpenses.length;

    var dailyAverage = totalCount > 0 ? (totalExpenses / totalCount) : 0; 
    var categoryCount = uniqueCategories.length;


    $('#stat-total').text('$' + totalExpenses.toFixed(2));
    $('#stat-average').text('$' + dailyAverage.toFixed(2));
    $('#stat-categories').text(categoryCount);


    $('#expense-table-body').html(tblString);
}

function deleteRecord(id) {
    var load = {
        payload: { id: id }
    };
    $.post(baseURL + "deleteRecord", JSON.stringify(load), function (data) {
        objExpenses = data.data;
        updateRecord();
    });
}

function editRecord(id) {
    var item = objExpenses.find(function(e) {
        return e.fld_id == id;
    });

    if (!item) return;

    document.getElementById("edit-id").value = item.fld_id;
    document.getElementById("edit-id-label").innerText = item.fld_id;
    document.getElementById("edit-category").value = item.fld_category;
    document.getElementById("edit-amount").value = item.fld_amount;
    document.getElementById("edit-date").value = item.fld_date;
    document.getElementById("edit-note").value = item.fld_notes || '';

    $("#edit-panel").show();
}

function saveRecord() {
    var id = document.getElementById("edit-id").value;

    var load = {
        payload: {
            id: id,
            category_id: document.getElementById("edit-category").value,
            amount: document.getElementById("edit-amount").value,
            date: document.getElementById("edit-date").value,
            note: document.getElementById("edit-note").value
        }
    };

    $.post(baseURL + "updateRecord", JSON.stringify(load), function (data) {
        objExpenses = data.data;
        updateRecord();      
        cancelEdit();        
    });
}

function cancelEdit() {
    $("#edit-panel").hide();
}