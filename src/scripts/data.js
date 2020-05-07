const API = {
    getJournalEntries () {
        return fetch("http://localhost:8088/entries")
            .then(response => response.json())
    },
    saveJournalEntry(object) {
        fetch('http://localhost:8088/entries', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    }
}

export default API