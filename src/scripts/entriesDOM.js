import component from "./entryComponent.js"

const entries = {
    renderJournalEntries: (entries) => {
        for (let index = 0; index < entries.length; index++) {
            let journalElement = document.querySelector(".entryLog");
            journalElement.innerHTML += component.makeJournalEntryComponent(entries[index]);
        }
    }
}

export default entries