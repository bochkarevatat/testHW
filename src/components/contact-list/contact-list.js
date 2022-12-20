import './contact-list.css';

import data from './contact-list.json';

import {
  filterBy,
  containsPhone,
  containsText,
} from '../../js/filter';

// const data = [{
//     "email": "سارینا.کوتی@example.com",
//     "gender": "female",
//     "phone_number": "0997-267-1133",
//     "birthdate": 1077518239,
//     "location": {
//       "street": "5273 سمیه",
//       "city": "بیرجند",
//       "state": "تهران",
//       "postcode": 99854
//     },
//     "username": "yellowpeacock139",
//     "password": "chopper",
//     "first_name": "سارینا",
//     "last_name": "کوتی",
//     "title": "mrs",
//     "picture": "women/38.jpg"
//   },
//   {
//     "email": "melissa.fleming@example.com",
//     "gender": "female",
//     "phone_number": "0740-304-475",
//     "birthdate": 469521368,
//     "location": {
//       "street": "3655 manchester road",
//       "city": "winchester",
//       "state": "berkshire",
//       "postcode": "YB2 8EJ"
//     },
//     "username": "goldenkoala410",
//     "password": "sick",
//     "first_name": "melissa",
//     "last_name": "fleming",
//     "title": "miss",
//     "picture": "algolia/women/pragati.png"
//   },
//   {
//     "email": "christoffer.christiansen@example.com",
//     "gender": "male",
//     "phone_number": "05761325",
//     "birthdate": 244475798,
//     "location": {
//       "street": "3391 pilevangen",
//       "city": "overby lyng",
//       "state": "danmark",
//       "postcode": 88520
//     },
//     "username": "smallbird985",
//     "password": "samuel",
//     "first_name": "christoffer",
//     "last_name": "christiansen",
//     "title": "mr",
//     "picture": "algolia/men/lucas.png"
//   },
//   {
//     "email": "valtteri.pulkkinen@example.com",
//     "gender": "male",
//     "phone_number": "041-829-79-61",
//     "birthdate": 9608479,
//     "location": {
//       "street": "6489 hermiankatu",
//       "city": "parikkala",
//       "state": "northern savonia",
//       "postcode": 77761
//     },
//     "username": "brownfish540",
//     "password": "peepee",
//     "first_name": "valtteri",
//     "last_name": "pulkkinen",
//     "title": "mr",
//     "picture": "men/49.jpg"
//   },
//   {
//     "email": "todd.beck@example.com",
//     "gender": "male",
//     "phone_number": "0768-374-878",
//     "birthdate": 216450355,
//     "location": {
//       "street": "7846 chester road",
//       "city": "wakefield",
//       "state": "shropshire",
//       "postcode": "U43 3QT"
//     },
//     "username": "bigelephant503",
//     "password": "rrrrr",
//     "first_name": "todd",
//     "last_name": "beck",
//     "title": "mr",
//     "picture": "men/65.jpg"
//   },
//   {
//     "email": "kayla.hall@example.com",
//     "gender": "female",
//     "phone_number": "(932)-142-5202",
//     "birthdate": 450297969,
//     "location": {
//       "street": "1935 aldwins road",
//       "city": "whangarei",
//       "state": "gisborne",
//       "postcode": 22546
//     },
//     "username": "beautifulkoala361",
//     "password": "lickit",
//     "first_name": "kayla",
//     "last_name": "hall",
//     "title": "ms",
//     "picture": "women/32.jpg"
//   },
//   {
//     "email": "jimmie.simmons@example.com",
//     "gender": "male",
//     "phone_number": "0702-239-646",
//     "birthdate": 691663054,
//     "location": {
//       "street": "1790 the grove",
//       "city": "bangor",
//       "state": "isle of wight",
//       "postcode": "D0 5PJ"
//     },
//     "username": "silverelephant404",
//     "password": "stang",
//     "first_name": "jimmie",
//     "last_name": "simmons",
//     "title": "mr",
//     "picture": "men/25.jpg"
//   }
// ]
const filterCb = (search, contact) => containsPhone(contact.phone_number, search) || containsText(`${contact.first_name} ${contact.last_name}`, search);

export class ContactList {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this.filter = this.filter.bind(this);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onHtmlClick = this.onHtmlClick.bind(this);

    this._element = element;

    this._users = data;

    this._element.addEventListener('click', this.onListItemClick);
    document.documentElement.addEventListener('click', this.onHtmlClick, true);
  }

  renderItem(contact) {
    return `
        <li class="contact-list-item">
        <div class="contact-main">
          <img src="https://raw.githubusercontent.com/pixelastic/fakeusers/master/pictures/${contact.picture}" alt="" class="contact-list-item-img">
          <span class="contact-list-item-name">${`${contact.first_name} ${contact.last_name}`}</span>
          <span class="contact-list-item-phone">${contact.phone_number}</span>
          <a href="tel:${contact.phone_number}" class="contact-list-item-action">Звонить</a>
        </div>
        <div class="contact-list-item-details hidden">Подробная информация о клиенте ${contact.username}</div>
      </li>`;
  }

  _clear() {
    const items = this._element.querySelectorAll('.contact-list-item');

    for (const child of items) {
      child.remove();
    }
  }

  _renderItems(items) {
    this._clear();

    items.forEach((user) => {
      const itemHtml = this.renderItem(user);

      this._element.insertAdjacentHTML('beforeend', itemHtml);
    });
  }

  renderUsers() {
    this._renderItems(this._users);
  }

  filter(text) {
    const filterCallback = filterCb.bind(null, text);

    this._renderItems(filterBy(this._users, filterCallback));
  }

  onListItemClick(e) {
    console.log(e);
    console.log(e.target);

    const { target } = e;

    if (target.classList.contains('contact-list-item-action')) {
      return;
    }

    e.stopImmediatePropagation();

    const listItem = e.target.closest('.contact-list-item');
    const details = listItem.querySelector('.contact-list-item-details');

    details.classList.toggle('hidden');
  }

  onHtmlClick() {
    console.log('html click');
  }
}
