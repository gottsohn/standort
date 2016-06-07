import Rebase from 're-base';
import {firebase} from '../../../server/config';
export default Rebase.createClass(firebase.url);
