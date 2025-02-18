//Load existing entries on page load
document.addEventListener("DOMContentLoaded", loadEntries);

function addEntry() {
    let text = document.getElementById("entryText").ariaValueMax;

    if (!text.trim()) {
        return;
    }
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(text);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    document.getElementById("entryText").value = ""; // Clear input
        loadEntries(); //Refresh list
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let list = document.getElementById("entiriesList");
    list.innerHTML = ""; //Clear list

    entries.forEach((entry, index) => {
        let li = document.createElement("li");
        li.innerHTML = `<span>${entry}</span>
        <div>
            <button class="edit" onclick="editEntry(${index})">Edit</button>
            <button class="delete" onclick="deleteEntry(${index})">Delete</button>
        </div>`;
        list.appendChild(li);
    });
}

function editEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries"));
    let newText = prompt("Edit your entry:", entries[index]);
    if (newText !== null) {
        entries[index] = newText;
        localStorage.setItem("journalEntries", JSON.stringify(entries));
        loadEntries();
    }
}

function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries"));
    entries.splice(index, 1)

    localStorage.setItem("journalEntries", JSON.stringify(entries));
    loadEntries();
}