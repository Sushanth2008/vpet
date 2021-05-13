class Food {
    constructor() {
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage('images/Milk.png');
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    display() {
        var x = 80, y = 100;

        if (this.foodStock != 0) {
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 80;
                    y = y + 50;
                }

                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }

}

