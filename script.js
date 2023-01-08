const notesDiv = document.querySelector('.notes')
const headerDiv = document.getElementById('header')
const addNoteBtn = document.getElementById('add-note')

const updateLocalStorage = () => {
    const allText = document.querySelectorAll('textarea')

    let notes = []

    allText.forEach((text) => {
        notes.push(text.value)
    })

    localStorage.setItem('notes', JSON.stringify(notes))
}

const createNote = (text = '') => {
    const note = document.createElement('div')

    note.classList.add('note')

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    `
    const editBtn = note.querySelector('.edit')
    const deleteBtn = note.querySelector('.delete')

    const mainDiv = note.querySelector('.main')
    const textArea = note.querySelector('textArea')

    mainDiv.textContent = text
    textArea.textContent = text

    editBtn.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden')
        textArea.classList.toggle('hidden')
    })

    textArea.addEventListener('input', (e) => {
        mainDiv.innerHTML = marked.parse(e.target.value)
        updateLocalStorage()
    })

    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLocalStorage()
        if (!document.querySelector('.note'))
            headerDiv.style.display = 'flex'
    })

    notesDiv.appendChild(note)
    // notesDiv.insertBefore(note, notesDiv.children[0])
}

// main
const notes = JSON.parse(localStorage.getItem('notes'))

if (notes && notes.length) {
    headerDiv.style.display = 'none'

    notes.forEach((note) => {
        if (note)
            createNote(note)
    })
}
else
    headerDiv.style.display = 'flex'

addNoteBtn.addEventListener('click', () => {
    if (headerDiv)
        headerDiv.style.display = 'none'

    createNote()

})