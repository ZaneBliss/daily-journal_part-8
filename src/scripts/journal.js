import API from "./data.js";
import entries from "./entriesDOM.js";
import fieldset from "./fieldset.js";

fieldset.writeDom();

API.getJournalEntries().then(entries.renderJournalEntries);

document.querySelector("#submitBtn").addEventListener("click", function () {
    debugger
    let date = document.querySelector("#journalDate").value;
    let concepts = document.querySelector("#conceptsCovered").value;
    let content = document.querySelector("#journalEntry").value;
    let mood = document.querySelector("#mood").value;
    let newJournalEntry = createEntry(date, concepts, content, mood);
    let regex = /^[(){};:,\w\s]+$/;
    if (date == "" || concepts == "" || content == "" || mood == "") {
        alert("Please fill out all fields.");
    } else if (!regex.test(concepts) || !regex.test(content)) {
        alert("Please only use allowed characters. A-Z, 0-9, (), {}, :, and ;.");
    } else {
        alert("Success!");
        API.saveJournalEntry(newJournalEntry);
        entriesArr = [];
        entriesArr.push(newJournalEntry);
        entries.renderJournalEntries(entriesArr);
    }
});

let conceptsInput = document.querySelector("#conceptsCovered");
conceptsInput.addEventListener("keyup", function () {
    let words = conceptsInput.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
        if (words.length >= 10) {
            alert('Please reduce word count.')
        } else {
            document.querySelector("#wordCount").innerHTML = words.length;
        }
    } else {
        document.querySelector("#wordCount").innerHTML = 0;
    }
});

let radioButton = document.querySelectorAll('input[type="radio"')
radioButton.forEach(button => {
    button.addEventListener("click", () => {
        let mood = event.target.value
        let moodEntries = []
        API.getJournalEntries().then(parsedEntries => 
            moodEntries.push(parsedEntries.filter(entry => {
                let currMood = false;
                if (entry.mood == mood) {
                    currMood = true;
                }
                return currMood
        })))
        console.log(moodEntries);
    })
});

const createEntry = (date, concepts, content, mood) => ({
    date: date,
    concepts: concepts,
    content: content,
    mood: mood,
});
