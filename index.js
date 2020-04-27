
  // **** Person Constructor ****
  function Person(age, relationship, smoker){
    this.age = age;
    this.relationship = relationship;
    this.smoker = smoker;
  }

  // **** UI Constructor and prototypes ****
  function UI() {}

  // Add Person To List
  UI.prototype.addPersonToList = function(person){
    const list = document.querySelector('.household');

    // Create li element
    const li = document.createElement('li'),
          info = document.createTextNode(`age: ${person.age},  relationship: ${person.relationship},  smoker: ${person.smoker}`)
    li.appendChild(info);

    // Add a remove button
    const btn = document.createElement('button');
    btn.className = 'remove';
    btn.innerHTML = "X";
    li.appendChild(btn)

    // Append li to ol
    list.appendChild(li);
  }

  // Remove person from list
  UI.prototype.removePersonFromList = function(target){
    if(target.className === 'remove') {
      alert('Person will be removed from Household')
      target.parentElement.remove();
    }
  }

  // Clear Fields
  UI.prototype.clearFields = function() {
    document.getElementsByName('age')[0].value = '';
    document.getElementsByName('rel')[0].value = '';
    document.getElementsByName('smoker')[0].checked = '';
  }


  // **** Local Storage (static) methods ****
  function Store() {}

  // Get people in household from local storage
  Store.getPeople = function(){
    let people;
    if(localStorage.getItem('people') === null){
      people =[];
    } else {
      people = JSON.parse(localStorage.getItem('people'))
    }
    return people;
  }

  // Display all household people from LS
  Store.displayPeople = function() {
    const people = Store.getPeople();
    people.forEach(function(person){
      const ui = new UI;
      ui.addPersonToList(person)
    });
  }

  // Add a person to the household in LS
  Store.addPerson = function(person) {
    const people = Store.getPeople();
    people.push(person)
    localStorage.setItem('people', JSON.stringify(people));
  }

  // Remove a person from the household in LS
  Store.removePerson = function(person) {
    const people = Store.getPeople();
    //create an object (from li) of person to be removed
    const personArr = person.slice(0,-1).split(',').map((str) => str.trim().substring(0, str.length).replace(': ', ':'));
    var personObj = {};
    for (var i = 0; i < personArr.length; i++) {
      var split = personArr[i].split(':');                                                   //split key and value
      split[1] = split[1] === "true" ? true : split[1] === "false" ? false : split[1];       // "boolean" to boolean
      split[1] = typeof split[1] === 'string' ? split[1].replace(/['"]+/g, '') : split[1];   // ""string"" to "string"
      personObj[split[0]] = split[1];
    }

    people.forEach(function(p, index){
      //keys will be in the same order, thus can compare this way
      if (JSON.stringify(personObj) === JSON.stringify(p)) {
        people.splice(index,1)
      }
    })

    localStorage.setItem('people', JSON.stringify(people))
  }

  // **** Event Listeners ****
  // DOM load Event - this gets fired when the HTML document has been compoeteoy
  // loaded and parsed.
  document.addEventListener('DOMContentLoaded', Store.displayPeople);

  // Event Listener for adding a person
  document.getElementsByClassName('add')[0].addEventListener('click', function(e){

     // Get form values
     const age = document.getElementsByName("age")[0].value,
          relationship = document.getElementsByName("rel")[0].value,
          smoker = document.getElementsByName("smoker")[0].checked;

    // Instantiate a person
    const person = new Person(age, relationship, smoker);

    // Instantiate UI
    const ui = new UI();

    // Validate
    if(age === '' ||  age <= 0 || relationship === ''){
      alert('Please fill in all fields. Please note: age should be > 0')
    } else {
      // Add person to list
      ui.addPersonToList(person);
      // Add person to Local Storage
      Store.addPerson(person)
    }

    // Clear Fields
    ui.clearFields();

    e.preventDefault();
   });

   // Event Listener for remove
   document.getElementsByClassName('household')[0].addEventListener('click', function(e){

     // Instantiate UI
     const ui = new UI()

     // remove
     ui.removePersonFromList(e.target)

     // Remove from Local storage
     Store.removePerson(e.target.parentElement.innerText)

     e.preventDefault();
   })

   // Event Listener for submit
   document.querySelector('form').addEventListener('submit', function(e){
     const debug = document.querySelector("pre.debug");
     debug.style.display = "block"
     debug.textContent = JSON.stringify(Store.getPeople())

     e.preventDefault();   
   })
