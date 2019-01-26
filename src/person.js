import faker from 'faker'

export class Person {
  constructor(){
    this.gender = faker.random.number(1); // 0 is male, 1 is female
    this.name = faker.name.findName(null, null, this.gender);
    this.r = Math.floor(Math.random() * 256);
    this.g = Math.floor(Math.random() * 256);
    this.b = Math.floor(Math.random() * 256);
    this.a = .5;

    this.priority = Math.random.arrayElements(['r', 'g', 'b']);

    this.x = null; //Current position in the farm
    this.y = null;

    this.velocity = null; //The current movement velocity of this individual
  }

  updateHappiness(){

  }

  calculateHappiness(otherPerson){

  }

  calculateVelocity(allOtherPeople){

  }

  movePerson
}