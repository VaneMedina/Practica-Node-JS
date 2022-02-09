const fs = require('fs').promises;

class Contenedor{
    constructor(nameFile){
        this.nameFile = nameFile;
    }
    async getAll(){
        const dataFile = await fs.readFile(this.nameFile);
        const products = JSON.parse(dataFile);
        return products;
    }
    async getById(id){
        try {
            const dataFile = await fs.readFile(this.nameFile);
            const products = JSON.parse(dataFile);
            const product = products.find(product => product.id == id);
            if(product){
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async save(product) {
        //Leo y almaceno los datos del archivo en una constante.
        try{
            const dataFile = await fs.readFile(this.nameFile);
            const data = JSON.parse(dataFile);
            data.push(product);
            await fs.writeFile(this.nameFile, JSON.stringify(data, null, 2), 'utf-8');
            return product;
        }catch(error){
            console.log(error);
        }
    }
    async update(product) {
        try{
            const dataFile = await fs.readFile(this.nameFile);
            const data = JSON.parse(dataFile);
            const index = data.indexOf(product);
            data.splice(index, 1, product);
            await fs.writeFile(this.nameFile, JSON.stringify(data, null, 2), 'utf-8');
        }catch(error){
            console.log(error);
        }
    }
    async deleteById(id){
        try {
            const dataFile = await fs.readFile(this.nameFile);
            const products = JSON.parse(dataFile);
            //Devuelve un array con todos los elementos que tenga, menos el que coincida con el id que le envío.
            const filteredProducts = products.filter(product => product.id != id);
            await fs.writeFile(this.nameFile, JSON.stringify(filteredProducts, null, 2), 'utf-8');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Contenedor