
export class CategoryService {
    
    constructor() {
        this.products = [];
        this.generate();
    };

    generate() {
        //Algo
    };

    getProducts() {
        return this.products;
        
    }

    getProduct(id) {
        return this.products.find(p => p.id == id);
        
    }
}