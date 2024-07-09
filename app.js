const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    const clearButton = document.getElementById('clear-all');
    const inputField = addItems.querySelector('[name=item]');

    const items = JSON.parse(localStorage.getItem('items')) || [];

    function addItem(e) {
      e.preventDefault();
      const text = this.querySelector('[name=item]').value;
      const item = {
        text,
        done: false
      };
      items.push(item);
      populateList(items, itemsList);
      localStorage.setItem('items', JSON.stringify(items));
      this.reset();
    }

    function populateList(plates = [], platesList) {
      platesList.innerHTML = plates.map((plate, i) => {
        return `
          <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
            <button class="delete-button" data-index=${i}>❌</button>
          </li>
        `;
      }).join('');
    }

    function toggleDone(e) {
      if (!e.target.matches('input')) return;
      const el = e.target;
      const index = el.dataset.index;
      items[index].done = !items[index].done;
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function deleteItem(e) {
      if (!e.target.matches('.delete-button')) return;
      const index = e.target.dataset.index;
      items.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(items));
      populateList(items, itemsList);
    }

    function clearAllItems() {
      items.length = 0;
      localStorage.removeItem('items');
      populateList(items, itemsList);
    }

    function changeBackgroundImage() {
      const images = [
        'https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010125.jpg',
        'https://t3.ftcdn.net/jpg/03/48/39/74/360_F_348397404_wXuf22GUPNAh67htBZZnaDSx3Bj92yep.jpg',
        'https://media.istockphoto.com/id/537331500/photo/programming-code-abstract-technology-background-of-software-deve.jpg?s=612x612&w=0&k=20&c=jlYes8ZfnCmD0lLn-vKvzQoKXrWaEcVypHnB5MuO-g8='
      ];
      document.documentElement.style.backgroundImage = `url('${images[Math.floor(Math.random() * images.length)]}')`;
    }

    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);
    itemsList.addEventListener('click', deleteItem);
    clearButton.addEventListener('click', clearAllItems);
    inputField.addEventListener('input', changeBackgroundImage);

    populateList(items, itemsList);