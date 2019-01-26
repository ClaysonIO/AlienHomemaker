export class Person {
  constructor(){
    this.name = 'Person Name';
    this.attributes = [];
    this.happiness = .5;
    this.age = Math.random() * 80;
    this.gender = 0;

    for(let i = 0; i < 5; i++){
      this.attributes.push(Math.random() * 100);
    }
  }


}