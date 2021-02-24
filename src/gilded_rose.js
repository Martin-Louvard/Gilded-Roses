class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  itemNotRagnaros(item) {
    return (item.name == 'Sulfuras, Hand of Ragnaros') ? false : true;
  }

  itemNotBrie(item) {
    return (item.name == 'Aged Brie') ? false : true;
  }

  itemNotBackstage(item) {
    return (item.name == 'Backstage passes to a TAFKAL80ETC concert') ? false : true
  }

  itemNotConjured(item) {
    return (item.name.split(' ')[0] == 'Conjured') ? false : true
  }


  itemSellinNegative(item) {
    return (item.sellIn < 0) ? true : false
  }

  itemSellinOverTen(item) {
    return (item.sellIn < 11) ? false : true
  }

  itemSellinOverFive(item) {
    return (item.sellIn < 6) ? false : true
  }

  itemSellinPositive(item) {
    return (item.sellIn >= 0) ? true : false
  }


  itemQualityUnderFifty(item) {
    return (item.quality < 50) ? true : false
  }

  itemQualityOverFifty(item) {
    return (item.quality > 50) ? true : false

  }

  itemQualityUnderFortyNine(item) {
    return (item.quality < 49) ? true : false
  }

  itemQualityUnderFortyEight(item) {
    return (item.quality < 48) ? true : false
  }

  itemQualityOverZero(item) {
    return (item.quality > 0) ? true : false
  }

  itemQualityUnderZero(item) {
    return (item.quality < 0) ? true : false
  }


  increaseQualityByOne(item) {
    return item.quality++
  }

  increaseQualityByTwo(item) {
    return item.quality += 2
  }

  increaseQualityByThree(item) {
    return item.quality += 3
  }


  decreaseQualityByOne(item) {
    return item.quality = item.quality - 1
  }

  decreaseQualityByTwo(item) {
    return item.quality -= 2
  }

  decreaseQualityByFour(item) {
    return item.quality -= 4
  }

  decreaseSellin(item) {
    return item.sellIn--
  }


  qualityBecomesZero(item) {
    return item.quality = 0
  }

  qualityBecomesFifty(item) {
    return item.quality = 50
  }

  
  findItemType(item) {
    if (this.itemNotRagnaros(item)) {
      if (this.itemNotBackstage(item)) {
        if (this.itemNotBrie(item)) {
          if (this.itemNotConjured(item)) {
            return 'standard';
          } else {
            return 'conjured';
          }
        } else {
          return 'brie';
        }
      } else {
        return 'backstage';
      }
    } else {
      return 'ragnaros';
    }
  }



  updateQualityV2() {
    this.items.forEach((item) => {

      let type = this.findItemType(item);

      switch (type) {
        case 'ragnaros':
          break;

        case 'brie':
          this.decreaseSellin(item);
          if (this.itemQualityUnderFifty(item)) { this.increaseQualityByOne(item) }
          break;


        case 'conjured':
          this.decreaseSellin(item);
          if (this.itemSellinPositive(item)) {
            this.decreaseQualityByTwo(item);
          }
          else if (this.itemSellinNegative(item)) {
            this.decreaseQualityByFour(item)
          }

          if (this.itemQualityUnderZero(item)) { this.qualityBecomesZero(item) }
          break;


        case 'standard':
          this.decreaseSellin(item);
          if (this.itemSellinPositive(item)) {
            this.decreaseQualityByOne(item)
          }
          else if (this.itemSellinNegative(item)) {
            this.decreaseQualityByTwo(item)
          }
          if (this.itemQualityUnderZero(item)) { this.qualityBecomesZero(item) }
          break;


        case 'backstage':
          this.decreaseSellin(item);
          if (this.itemSellinOverTen(item)) {
            this.increaseQualityByOne(item);
          }
          else if (this.itemSellinOverFive(item)) {
            this.increaseQualityByTwo(item);
          }
          else if (this.itemSellinPositive(item)) {
            this.increaseQualityByThree(item)
          }
          else if (this.itemSellinNegative(item)) {
            this.qualityBecomesZero(item)
          }
          if (this.itemQualityOverFifty(item)) { this.qualityBecomesFifty(item) }
          break;

        default:
          console.log('Problème de type');
          break;
      }
    })
    return this.items;
  }





  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
            if (this.items[i].name.split(' ')[0] == 'Conjured') {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6 && this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
                if (this.items[i].name.split(' ')[0] == 'Conjured') {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
