import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

window.alert = (msg) => { console.log(msg); };
window.matchMedia = () => ({});
window.scrollTo = () => { };

global.mount = mount;
global.shallow = shallow;