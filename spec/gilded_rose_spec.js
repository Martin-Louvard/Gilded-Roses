var { Shop, Item } = require('../src/gilded_rose.js');
describe("GildedRose shop manager", function () {
  var listItems;

  beforeEach(function () {
    listItems = [];
  });


  it("Baisse de 1 la qualité et sellIn d'item normaux", function () {
    listItems.push(new Item("+5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Mana Cake", 3, 6));
    listItems.push(new Item("Blablaba", 10, 16));


    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: 9, quality: 19 },
      { sellIn: 2, quality: 5 },
      { sellIn: 9, quality: 15 }

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente la qualité de 1 pour Aged Brie et Backstage passes (quand il reste 10 jours ou plus)", function () {
    listItems.push(new Item("Aged Brie", 20, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 20, 30));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: 19, quality: 31 },
      { sellIn: 19, quality: 31 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente la qualité de 2 pour Backstage passes quand il reste 10 jours ou moins", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 8, 42));


    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: 9, quality: 32 },
      { sellIn: 7, quality: 44 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Augmente la qualité de 3 pour Backstage passes quand il reste 5 jours ou moins", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 3, 41));


    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: 4, quality: 33 },
      { sellIn: 2, quality: 44 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Passe la qualité du backstage pass à 0 une fois la date passée", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30));


    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: -1, quality: 0 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Ne change jamais la qualité de Sulfuras qui n'a pas de date de péromption", function () {
    listItems.push(new Item('Sulfuras, Hand of Ragnaros', null, 80));

    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: null, quality: 80 },
    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("N'augmente jamais la qualité d'un produit au delà de 50", function () {
    listItems.push(new Item("Aged Brie", 2, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 2, 50));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49));
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48));




    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: 1, quality: 50 },
      { sellIn: 1, quality: 50 },
      { sellIn: 1, quality: 50 },
      { sellIn: 0, quality: 50 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Ne diminue jamais la qualité d'un produit en deça de 0", function () {
    listItems.push(new Item("Backstage passes to a TAFKAL80ETC concert", 0, 50));
    listItems.push(new Item("+5 Dexterity Vest", -1, 0));
    listItems.push(new Item("Mana Cake", -3, 0));
    listItems.push(new Item("Conjured Brownie Cake", 0, 2));



    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: -1, quality: 0 },
      { sellIn: -2, quality: 0 },
      { sellIn: -4, quality: 0 },
      { sellIn: -1, quality: 0 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });

  it("Dégrade les objets Conjured deux fois plus vite", function () {
    listItems.push(new Item("Conjured +5 Dexterity Vest", -1, 10));
    listItems.push(new Item("Conjured Mana Cake", -3, 10));
    listItems.push(new Item("Conjured +5 Dexterity Vest", 10, 20));
    listItems.push(new Item("Conjured Mana Cake", 30, 40));
    listItems.push(new Item("Conjured Brownie Cake", 0, 2));



    const gildedRose = new Shop(listItems);
    const items = gildedRose.updateQualityV2();

    var expected = [
      { sellIn: -2, quality: 6 },
      { sellIn: -4, quality: 6 },
      { sellIn: 9, quality: 18 },
      { sellIn: 29, quality: 38 },
      { sellIn: -1, quality: 0 },

    ];
    expected.forEach(function (testCase, idx) {
      expect(items[idx].quality).toBe(testCase.quality);
      expect(items[idx].sellIn).toBe(testCase.sellIn);
    });
  });
});