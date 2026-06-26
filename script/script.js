function getotalexpenses() {
    let expenses = getExpenses();
    let total = 0;

function getExpenses() {
    let expenses = localStorage.getItem("expenses");
    if (expenses) {
        return JSON.parse(expenses);
    } else {
        return [];
    }
}