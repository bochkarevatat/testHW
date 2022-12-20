// TODO: write your code here
import { ContactList } from '../components/contact-list/contact-list.js';
import { FilterWidget } from '../components/filter-widget/filter-widget.js';

console.log('ok');
const contactList = new ContactList('.contact-list');
const filterWidget = new FilterWidget('.filter-widget', contactList.filter);
contactList.renderUsers();
