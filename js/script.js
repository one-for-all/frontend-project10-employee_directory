lightbox.option({
  wrapAround: true,
  showImageNumberLabel: false
});

// capitalize a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// capitalize words separated by space
function capitalizeWords(words) {
  let result = [];
  words.split(' ').forEach((word) => result.push(capitalize(word)));
  return result.join(' ');
}

// return properly capitalized name
function getName(name) {
  const firstName = capitalize(name.first);
  const lastName = capitalize(name.last);
  return `${firstName} ${lastName}`;
}

// return birthday in the format mm/dd/yy
function getBirthday(dob) {
  const birthday = new Date(dob);
  const date = String(birthday.getDate()).padStart(2, '0');
  const month = String(birthday.getMonth()).padStart(2, '0');
  const year = String(birthday.getFullYear()).slice(2);
  return `${month}/${date}/${year}`;
}


const randomUserURL = 'https://randomuser.me/api/?results=12&nat=us';
$.getJSON(randomUserURL, (response) => {
  response.results.forEach((employee) => {
    const name = getName(employee.name);
    const username = employee.login.username;
    const email = employee.email;
    console.log(employee);
    const city = capitalizeWords(employee.location.city);
    const country = 'United States';
    const imageURL = employee.picture.large;
    const birthday = getBirthday(employee.dob);
    const caption = `
      <p class='employee__name'>${name}</p>
      <p class='employee__detail'>${username}</p>
      <p class='employee__detail'>${email}</p>
      <hr class='employee__hr'>
      <p class='employee__detail'>${employee.phone}</p>
      <p class='employee__detail'>
        ${capitalizeWords(employee.location.street)}, ${employee.location.postcode}, ${city}, ${country}
      </p>
      <p class='employee__detail'>Birthday: ${birthday}</p>
    `;

    const employeeHTML = `
    <div class='employee'>
      <a class='employee__href' href="${imageURL}" data-lightbox="employee" data-title="${caption}">
        <img class='employee__image' src="${imageURL}" alt="${name} image">
        <div class="employee__info">
          <p class='employee__name'>${name}</p>
          <p class='employee__detail'>${email}</p>
          <p class='employee__detail'>${city}, ${country}</p>
        </div>
      </a>
    </div>
    `;
    $('.directory').append(employeeHTML);
  })
});
