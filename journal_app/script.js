document.addEventListener("DOMContentLoaded", loadEntries);

function addEntry() {
    let text = document.getElementById("entryText").value;
    if (!text.trim()) return;

    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    entries.push(text);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    document.getElementById("entryText").value = ""; // Clear input
    loadEntries(); // Refresh list
}

function loadEntries() {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let list = document.getElementById("entriesList");
    list.innerHTML = ""; // Clear list

    entries.forEach((entry, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${entry}</span>
            <div>
                <button class="edit" onclick="editEntry(${index})">Edit</button>
                <button class="delete" onclick="deleteEntry(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });

    loadTrash(); // Also update trash list
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
    let trash = JSON.parse(localStorage.getItem("deletedEntries")) || [];

    // Move the deleted entry to Trash
    trash.push(entries[index]);
    localStorage.setItem("deletedEntries", JSON.stringify(trash));

    // Remove from main entries list
    entries.splice(index, 1);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    loadEntries();
}

function loadTrash() {
    let trash = JSON.parse(localStorage.getItem("deletedEntries")) || [];
    let trashList = document.getElementById("trashList");
    trashList.innerHTML = ""; // Clear list

    trash.forEach((entry, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${entry}</span>
            <button class="restore" onclick="restoreEntry(${index})">Restore</button>
        `;
        trashList.appendChild(li);
    });
}

function restoreEntry(index) {
    let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
    let trash = JSON.parse(localStorage.getItem("deletedEntries")) || [];

    // Move entry back to main list
    entries.push(trash[index]);
    localStorage.setItem("journalEntries", JSON.stringify(entries));

    // Remove from Trash
    trash.splice(index, 1);
    localStorage.setItem("deletedEntries", JSON.stringify(trash));

    loadEntries();
}

function toggleTrash() {
    let trashSection = document.getElementById("trashSection");
    trashSection.style.display = trashSection.style.display === "none" ? "block" : "none";
}