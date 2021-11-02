const fs = require("fs")
const path = require("path")
const util = require("util")
const readFile = (filename) => util.promisify(fs.readFile)(filename , "utf-8")

class DataBase{
    static #createShortCut() {
        const created = true;
        let shortUrl = ""
        for (let i=0; i<7; i++) {
            if (Math.random()<0.5) {
                shortUrl+= String.fromCharCode(65 + Math.floor(Math.random()*26))
            }
            else {
                shortUrl+= String.fromCharCode(48 + Math.floor(Math.random()*10))
            }
        }
        
        return shortUrl;
    }

    static async #readDataBase() {
        try {
            const fileData = await readFile("../db.json")
            return await fileData
        }
        catch(error) {
            console.error(error)
        }
        
    }

    static async createUrlObj(_originUrl) {
        let newShortCut = await this.#createShortCut();
        while(await this.checkIfUrlExist(newShortCut)){
            console.log("zain")
            newShortCut = await this.#createShortCut();
        }
        const urlObj = {
            originUrl: _originUrl,
            shortUrl: newShortCut,
            views: 0,
        }
        return urlObj;
    }

    static async writeUrl() {
        try {
            const dataBase = await this.readDataBase();
            const objectsArr=  await JSON.parse(dataBase).objects;
            objectsArr.push({"tim" : "tam"});
            dataBase.objects=objectsArr;
            fs.writeFile("../db.json", dataBase);
            return objectsArr;
            } catch (error) {
                console.log(error);
            }
    }

    static async checkIfUrlExist(randomSequence){
    try {
            const dataBase = await this.#readDataBase();
            console.log(dataBase)
        for (let obj in dataBase.objects) {
            if (obj.shortUrl === randomSequence) {
                return true;
            }
        }
        return false;
    }
    catch(err) {
        console.error(err)
    }
            
        
    }

}

DataBase.createUrlObj("SSSSSSSSSSSSSSS")
.then((data) => console.log(data))