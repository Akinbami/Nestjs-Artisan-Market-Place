import { User } from './user.entity';
import { Business } from './business.entity';
import { Message } from './message.entity';
import { Review } from './reviews.entity';

// import { Session } from './Sessions';
const entities = [User, Business, Message, Review];

export { User, Business, Message, Review };

export default entities;
