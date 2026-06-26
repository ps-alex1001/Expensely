var objExpenses = [];
var baseURL = "http://localhost/Expensely/api/";

$(function () {
    console.log("Jquery Loaded");
    getAllExpenses();

    $(".form").on("submit", function (e) {
        e.preventDefault();
        addRecord();
    });
});

function getAllExpenses() {
    $.get(baseURL + "getexpenses", function (data) {
        console.log(data.data);
        objExpenses = data.data;
        updateRecord();
    });
}

function addRecord() {
    var load = {
        payload: {
            category: document.getElementById("category").value,
            amount: document.getElementById("amount").value,
            date: document.getElementById("date").value,
            notes: document.getElementById("notes").value
        }
    };

    $.post(baseURL + "addexpense", JSON.stringify(load), function (data) {
        objExpenses = data.data;
        updateRecord();
    });
}

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
                <td>${e.fld_category}</td>
                <td>$${parseFloat(e.fld_amount).toFixed(2)}</td>
                <td>${e.fld_date}</td>
                <td>${e.fld_notes || ''}</td>
                <td>
                    <button class="btn-edit" onclick="editRecord('${e.fld_id}')">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="btn-delete" onclick="deleteRecord('${e.fld_id}')">
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
    $.post(baseURL + "deleteexpense", JSON.stringify(load), function (data) {
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
    document.getElementById("edit-notes").value = item.fld_notes || '';

    $("#edit-panel").show();
}

function saveRecord() {
    var id = document.getElementById("edit-id").value;

    var load = {
        payload: {
            id: id,
            category: document.getElementById("edit-category").value,
            amount: document.getElementById("edit-amount").value,
            date: document.getElementById("edit-date").value,
            notes: document.getElementById("edit-notes").value
        }
    };

    $.post(baseURL + "updateexpense", JSON.stringify(load), function (data) {
        objExpenses = data.data;
        updateRecord();      
        cancelEdit();        
    });
}

function cancelEdit() {
    $("#edit-panel").hide();
}