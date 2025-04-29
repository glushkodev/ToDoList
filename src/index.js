let ToDoList = function() {
	let lastId = 0
	let data = []
	let todoListElem
	let todoLiElem

	this.add = (name) => {
		if (!name || name.length < 1) return false

		lastId++

		let task = {
			id: lastId,
			name: name,
			dataCreate: Date.now(),
			status: false
		}
		data.push(task)

		return true
	}

	this.edit = (id, name) => {
		if (!id || id <= 0 || !name || name.length < 1) return false

		let task = data.find(function(item) {
			return item.id == id
		})

		if (!task) return false

		task.name = name
		task.dateUpdate = Date.now()

		return true
	}

	this.done = (id) => {
		if (!id || id <= 0) return false
	
		let task = data.find(function(item) {
			return item.id == id
		})
	
		if (!task) return false
	
		task.status = !task.status
		task.dateUpdate = Date.now()
	
		return true
	}

	this.remove = (id) => {
		if (!id || id <= 0) return false

		let dataTmp = data.filter(function(item) {
			return item.id != id
		})

		data = dataTmp
		return true
	}
	
	this.get = (id) => {
		if (!id && id === undefined ) return data

		if (id <= 0) return false

		let task = data.find(function(item) {
			return item.id == id
		})

		if (!task) return false

		return task
	}

	let update = () => {
		todoListElem.innerHTML = ''
		data.forEach((item) => {

			todoLiElem = document.createElement('li')
			todoLiElem.classList.add('todo__item')

			let todoCheckboxElem = document.createElement('input')
			todoCheckboxElem.classList.add('todo__status')
			todoCheckboxElem.type = 'checkbox'

			let todoCheckboxLabel= document.createElement('label')
			todoCheckboxLabel.classList.add('todo__label')

			let todoNameElem = document.createElement('span')
			todoNameElem.classList.add('todo__name')

			let todoLiBtn = document.createElement('button')
			todoLiBtn.classList.add('todo__item_btn')

			todoNameElem.innerHTML = item.name
			todoCheckboxElem.checked = item.status
			
			todoLiElem.append(todoCheckboxElem, todoCheckboxLabel, todoNameElem, todoLiBtn);
			
			todoListElem.append(todoLiElem)

			todoCheckboxElem.addEventListener('change', (event) => {
				this.done(item.id)
				update()
			})

			todoLiBtn.addEventListener('click', (id) => {
				this.remove(item.id)
				update()
			})

			todoNameElem.addEventListener('click', (event) => {
				let name = event.target.innerText
				
				let todoPopap = document.createElement('div')
				todoPopap.classList.add('todo__popap')

				let todoPopapBg = document.createElement('div')
				todoPopapBg.classList.add('todo__popap_bg')

				let todoPopapContainer = document.createElement('div')
				todoPopapContainer.classList.add('todo__popap_container')

				let todoPopapBtnCLose = document.createElement('button')
				todoPopapBtnCLose.classList.add('todo__popap_btn-close')

				todoPopapBtnCLose.addEventListener('click', () => {
					todoPopap.remove()
				})

				let todoPopapTitle = document.createElement('h3')
				todoPopapTitle.classList.add('todo__popap_title')

				let todoPopapInput = document.createElement('input')
				todoPopapInput.type = 'text'
				todoPopapInput.value = name
				todoPopapInput.placeholder = 'Type your task...'
				todoPopapInput.classList.add('todo__popap_input')

				todoPopapInput.addEventListener('keypress', (event) => {
					if (event.code != 'Enter') return
					this.edit(item.id, event.target.value)
					update()
				})

				let todoPopapBtn = document.createElement('button')
				todoPopapBtn.classList.add('todo__popap_btn')

				todoPopapBtn.addEventListener('click', () => {
					this.edit(item.id, todoPopapInput.value)
					update()
				})

				todoPopapBtn.innerHTML = 'Save'
				todoPopapTitle.innerHTML = 'Edit'
				todoPopapContainer.append(todoPopapBtnCLose, todoPopapTitle, todoPopapInput, todoPopapBtn)
				todoPopap.append(todoPopapBg, todoPopapContainer)

				todoLiElem.append(todoPopap)
			})
		})
	}

	let init = () => {
		let todoElem = document.createElement('div')
		todoElem.classList.add('todo')

		let todoTitleElem = document.createElement('h3')
		todoTitleElem.classList.add('todo__title')

		let todoContainerField = document.createElement('div')
		todoContainerField.classList.add('todo__container-field')

		let todoInputName = document.createElement('input')
		todoInputName.type = 'text'
		todoInputName.placeholder = 'Type your task...'
		todoInputName.classList.add('todo__field_name')

		let todoBtnAdd = document.createElement('button')
		todoBtnAdd.classList.add('todo__btn_add')
		todoBtnAdd.innerHTML = 'Add'

		todoListElem = document.createElement('ul')
		todoListElem.classList.add('todo__list')

		let todoBtnClear = document.createElement('button')
		todoBtnClear.classList.add('todo__btn_clear')

		todoTitleElem.innerHTML = 'ToDo List'
		todoBtnClear.innerHTML = 'CLear'

		todoContainerField.append(todoInputName, todoBtnAdd)
		todoElem.append(todoTitleElem, todoContainerField, todoListElem, todoBtnClear)

		document.body.append(todoElem)

		todoInputName.addEventListener('keypress', (event) => {
			if (event.code != 'Enter') return

			this.add(event.target.value)
			update()

			event.target.value = ''
		})

		todoBtnAdd.addEventListener('click', () => {
			this.add(todoInputName.value)
			update()

			todoInputName.value = ''
		})

		todoBtnClear.addEventListener('click', () => {

			let todoPopapClear = document.createElement('div')
			todoPopapClear.classList.add('todo__popap')

			let todoPopapCLearBg = document.createElement('div')
			todoPopapCLearBg.classList.add('todo__popap_bg')

			let todoPopapClearContainer = document.createElement('div')
			todoPopapClearContainer.classList.add('todo__popap_container')

			let todoPopapCLearBtnCLose = document.createElement('button')
			todoPopapCLearBtnCLose.classList.add('todo__popap_btn-close')

			let todoPopapCLearTitle = document.createElement('h3')
			todoPopapCLearTitle.classList.add('todo__popap_title')

			let todoPopapClearBtns = document.createElement('div')
			todoPopapClearBtns.classList.add('todo__popap_btns')

			let todoPopapClearYes = document.createElement('button')
			todoPopapClearYes.classList.add('todo__popap_btn', 'todo__popap_btn-clear')

			let todoPopapClearNo = document.createElement('button')
			todoPopapClearNo.classList.add('todo__popap_btn', 'todo__popap_btn-clear')

			todoPopapCLearTitle.innerHTML = 'Are you sure you want to remove all tasks?'
			todoPopapClearYes.innerHTML = 'Yes'
			todoPopapClearNo.innerHTML = 'No'
	
			todoPopapClearBtns.append(todoPopapClearYes, todoPopapClearNo)
			todoPopapClearContainer.append(todoPopapCLearBtnCLose, todoPopapCLearTitle, todoPopapClearBtns)
			todoPopapClear.append(todoPopapCLearBg, todoPopapClearContainer)
			todoLiElem.append(todoPopapClear)

			todoPopapCLearBtnCLose.addEventListener('click', () => {
				todoPopapClear.remove()
			})

			todoPopapClearYes.addEventListener('click', () => {
				data.forEach((item) => {
					this.remove(item.id)
				})
				update()
			})

			todoPopapClearNo.addEventListener('click', () => {
				todoPopapClear.remove()
			})
		})
	}
	init();
}

window.addEventListener('load', () => {
	new ToDoList()
})