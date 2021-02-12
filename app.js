const listDate = document.querySelector('.lista-datos')

let fila = ''

const form = document.querySelector('.form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let formData = new FormData(form)
    let objeto = transformFormDataObj(formData)

    //saveLocalStorage(objeto)
    // if (fila === '') {
    //     insertNewRow(objeto)
    // } else {
    //     updataRow(objeto)
    // }

    let titulo = document.querySelector('.titulo').value
    let descripcion = document.querySelector('.descripcion').value

    if (titulo === '' || descripcion === '') {
        insertMsj()
    } else {
        saveLocalStorage(objeto)
    }

    form.reset()
})

const mensaje = document.querySelector('.mensaje-error')

function insertMsj() {
    let valor = 'Complete los campos!'
    const div = document.createElement('div')
    mensaje.innerText = ''
    div.innerText = valor
   
    setTimeout(() => {
        div.remove()
    }, 3000)
    mensaje.appendChild(div)
}

function transformFormDataObj() {
    let titulo = document.querySelector('.titulo').value
    let descripcion = document.querySelector('.descripcion').value

    return {
        'titulo': titulo,
        'descripcion': descripcion
    }
}

function insertNewRow(objeto) {
    let table = document.querySelector('.informacion-dom tbody')
    let newRow = table.insertRow(table.length)

    let cell1 = newRow.insertCell(0)
    cell1.innerHTML = objeto.titulo
    cell1.classList.add('datos')

    let cell2 = newRow.insertCell(1)
    cell2.innerHTML = objeto.descripcion
    cell2.classList.add('datos')

    let cell3 = newRow.insertCell(2)
    let eliminarBtn = document.createElement('button')
    eliminarBtn.innerHTML = `<i class="fas fa-trash"></i>`
    eliminarBtn.classList.add('delete-btn')
    cell3.appendChild(eliminarBtn)

    let cell4 = newRow.insertCell(3)
    let editarBtn = document.createElement('button')
    editarBtn.innerHTML = `<i class="far fa-edit"></i>`
    editarBtn.classList.add('edit-btn')
    cell4.appendChild(editarBtn)

    let cell5 = newRow.insertCell(4)
    let checkBtn = document.createElement('button')
    checkBtn.innerHTML = `<i class="fas fa-check"></i>`
    checkBtn.classList.add('check-btn')
    cell5.appendChild(checkBtn)

    newRow.innerHTML = ''
}

document.addEventListener('click', buttonsLogic)

function buttonsLogic(td) {
    const item = td.target

    if (item.classList[0] === 'delete-btn') {
        let deleteBtn = item.parentElement.parentElement
        deleteBtn.remove()
    }

    if (item.classList[0] === 'edit-btn') {
        fila = item.parentElement.parentElement
        document.querySelector('.titulo').value = fila.cells[0].innerHTML
        document.querySelector('.descripcion').value = fila.cells[1].innerHTML
    }

    if (item.classList[0] === 'check-btn') {
        let checkBtn = item.parentElement.parentElement
        checkBtn.classList.toggle('check')
    }
}

// function updataRow(objeto) {
//     fila.cells[0].innerHTML = objeto.titulo
//     fila.cells[1].innerHTML = objeto.descripcion
//     fila = ''
// }

document.addEventListener('click', filterInfo)

function filterInfo(e) {
    const filterData = listDate.childNodes

    filterData.forEach((data) => {
        if (e.target.value === 'todo') {
            data.style.display = 'flex'
        }
        else if (e.target.value === 'completas') {
            if (data.classList.contains('check')) {
                data.style.display = 'flex'
            } else {
                data.style.display = 'none'
            }
        }
        else if (e.target.value === 'incompletas') {
            if (!data.classList.contains('check')) {
                data.style.display = 'flex'
            } else {
                data.style.display = 'none'
            }
        }
    })
}

/************* local storage ****************/

document.addEventListener('DOMContentLoaded', getLocalStorage)

function saveLocalStorage(objeto) {
    let datos = []

    if (localStorage.getItem('informacion') === null) {
        datos = []
    } else {
        datos = JSON.parse(localStorage.getItem('informacion'))
    }

    datos.push(objeto)
    localStorage.setItem('informacion', JSON.stringify(datos))

    getLocalStorage()
}

function getLocalStorage() {
    let datos = []
    let dom = document.querySelector('.informacion-dom tbody')

    if (localStorage.getItem('informacion') === null) {
        datos = []
    } else {
        datos = JSON.parse(localStorage.getItem('informacion'))
    }
    dom.innerHTML = ''

    datos.forEach((item, i) => {
        let table = document.querySelector('.informacion-dom tbody')
        let newRow = table.insertRow(table.length)

        let cell1 = newRow.insertCell(0)
        cell1.innerHTML = item.titulo
        cell1.classList.add('datos')

        let cell2 = newRow.insertCell(1)
        cell2.innerHTML = item.descripcion
        cell2.classList.add('datos')

        let cell3 = newRow.insertCell(2)
        let eliminarBtn = document.createElement('button')
        eliminarBtn.innerHTML = `<i class="fas fa-trash"></i>`
        eliminarBtn.classList.add('delete-btn')

        eliminarBtn.addEventListener('click', () => {
            deleteLocalStorage(i)
        })

        cell3.appendChild(eliminarBtn)

        let cell4 = newRow.insertCell(3)
        let editarBtn = document.createElement('button')
        editarBtn.innerHTML = `<i class="far fa-edit"></i>`
        editarBtn.classList.add('edit-btn')

        editarBtn.addEventListener('click', () => {
            updataLocalStorage(i)
        })

        cell4.appendChild(editarBtn)

        let cell5 = newRow.insertCell(4)
        let checkBtn = document.createElement('button')
        checkBtn.innerHTML = `<i class="fas fa-check"></i>`
        checkBtn.classList.add('check-btn')
        cell5.appendChild(checkBtn)
    })
}

function deleteLocalStorage(objeto) {
    let datos = []
    let datosLocalStorage = localStorage.getItem('informacion')
    datos = JSON.parse(datosLocalStorage)
    datos.splice(objeto, 1)
    localStorage.setItem('informacion', JSON.stringify(datos))

    getLocalStorage()
}

function updataLocalStorage(objeto) {
    let datos = []
    let datosLocalStorage = localStorage.getItem('informacion')
    datos = JSON.parse(datosLocalStorage)
    datos.splice(objeto, 1)
    localStorage.setItem('informacion', JSON.stringify(datos))
}








