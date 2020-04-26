
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


  // **** Event Listeners ****

  // Event Listener for adding a person
  document.querySelector('form').addEventListener('submit', function(e){
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


     e.preventDefault();
   })
