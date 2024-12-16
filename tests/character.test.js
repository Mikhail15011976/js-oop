import { Character, Bowman, Swordsman, Magician, Daemon, Undead, Zombie } from '../src/character';

test('create a Bowman', () => {
  const bowman = new Bowman('Robin');
  expect(bowman.name).toBe('Robin');
  expect(bowman.type).toBe('Bowman');
  expect(bowman.health).toBe(100);
  expect(bowman.level).toBe(1);
  expect(bowman.attack).toBe(25);
  expect(bowman.defence).toBe(25);
});

test('create a Swordsman', () => {
  const swordsman = new Swordsman('Arthur');
  expect(swordsman.name).toBe('Arthur');
  expect(swordsman.type).toBe('Swordsman');
  expect(swordsman.attack).toBe(40);
  expect(swordsman.defence).toBe(10);
});

test('create a Daemon', () => {
    const daemon = new Daemon('Azazel');
    expect(daemon.name).toBe('Azazel');
    expect(daemon.type).toBe('Daemon');
    expect(daemon.attack).toBe(10);
    expect(daemon.defence).toBe(40);
});

test('create a Magician', () => {
    const magician = new Magician('Gandalf');
    expect(magician.name).toBe('Gandalf');
    expect(magician.type).toBe('Magician');
    expect(magician.attack).toBe(10);
    expect(magician.defence).toBe(40);
});

test('create an Undead', () => {
    const undead = new Undead('Lich');
    expect(undead.name).toBe('Lich');
    expect(undead.type).toBe('Undead');
    expect(undead.attack).toBe(25);
    expect(undead.defence).toBe(25);
});

test('create a Zombie', () => {
    const zombie = new Zombie('Walker');
    expect(zombie.name).toBe('Walker');
    expect(zombie.type).toBe('Zombie');
    expect(zombie.attack).toBe(40);
    expect(zombie.defence).toBe(10);
});

test('invalid name length', () => {
    expect(() => new Character('A', 'Bowman')).toThrow('Name must be between 2 and 10 characters');
  });
  
test('invalid character type', () => {
    expect(() => new Character('Robin', 'InvalidType')).toThrow('Invalid character type');
  });  

  describe('Character class', () => {
    let character;

    beforeEach(() => {
        character = new Character('Hero', 'Bowman');
    });

    test('levelUp increases level by 1', () => {
        character.levelUp();
        expect(character.level).toBe(2);
    });

    test('levelUp increases attack and defence by 20%', () => {
        const initialAttack = character.attack;
        const initialDefence = character.defence;

        character.levelUp();

        expect(character.attack).toBe(initialAttack * 1.2);
        expect(character.defence).toBe(initialDefence * 1.2);
    });

    test('levelUp sets health to 100', () => {
        character.health = 50; // уменьшаем здоровье
        character.levelUp();
        expect(character.health).toBe(100);
    });

    test('levelUp throws error if health is 0', () => {
        character.health = 0;
        expect(() => character.levelUp()).toThrow("Нельзя повысить левел умершего");
    });

    test('damage reduces health correctly', () => {
        character.damage(20);
        expect(character.health).toBe(100 - 20 * (1 - character.defence / 100));
    });

    test('damage does not reduce health below 0', () => {
        character.health = 10; // задаем текущее здоровье
        character.damage(20);
        expect(character.health).toBe(0);
    });
});