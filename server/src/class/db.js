/* eslint-disable consistent-return */
/* eslint-disable no-useless-catch */
/* eslint-disable no-await-in-loop */
const fs = require("fs");
const fsAsync = require("fs/promises");
const util = require("util");

const readFile = (filename) => util.promisify(fs.readFile)(filename, "utf-8");
const moment = require("moment");

class DataBase {
  static createShortCut() {
    let shortUrl = "";
    for (let i = 0; i < 7; i += 1) {
      if (Math.random() < 0.5) {
        shortUrl += String.fromCharCode(65 + Math.floor(Math.random() * 26));
      } else {
        shortUrl += String.fromCharCode(48 + Math.floor(Math.random() * 10));
      }
    }

    return shortUrl;
  }

  static async readDataBase() {
    try {
      const fileData = await readFile("./server/db.json");
      return fileData;
    } catch (error) {
      throw "cannot read DataBase";
    }
  }

  static async createUrlObj(_originUrl) {
    let newShortCut = await this.createShortCut();
    while (await this.checkIfUrlExist(newShortCut)) {
      newShortCut = await this.createShortCut();
    }
    const urlObj = {
      originUrl: _originUrl,
      shortUrl: newShortCut,
      views: 0,
      creatorDate: moment().format("dddd,MMMM Do YYYY, h:mm:ss a"),
    };
    return urlObj;
  }

  static async addObjToDb(originUrl) {
    try {
      if (await this.isShortenExist(originUrl)) {
        return await this.getShortUrl(originUrl);
      }
      return await this.writeUrl(await this.createUrlObj(originUrl));
    } catch (err) {
      throw err;
    }
  }

  static async writeUrl(newObj) {
    try {
      const dataBase = JSON.parse(await this.readDataBase());
      const objectsArr = dataBase.objects;
      objectsArr.push(newObj);
      dataBase.objects = objectsArr;
      await fsAsync.writeFile("./server/db.json", JSON.stringify(dataBase));
      return newObj.shortUrl;
    } catch (err) {
      throw "current unable to to short url";
    }
  }

  static async checkIfUrlExist(randomSequence) {
    try {
      let dataBase = await this.readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i += 1) {
        if (dataBase.objects[i].shortUrl === randomSequence) {
          return true;
        }
      }
      return false;
    } catch (err) {
      throw "cannot read DataBase";
    }
  }

  static async isShortenExist(_originUrl) {
    try {
      let dataBase = await this.readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i += 1) {
        if (dataBase.objects[i].originUrl === _originUrl) {
          return true;
        }
      }
      return false;
    } catch (err) {
      throw "cannot read DataBase";
    }
  }

  static async getShortUrl(_originUrl) {
    let dataBase = await this.readDataBase();
    dataBase = JSON.parse(dataBase);
    for (let i = 0; i < dataBase.objects.length; i += 1) {
      if (dataBase.objects[i].originUrl === _originUrl) {
        return dataBase.objects[i].shortUrl;
      }
    }
  }

  static async getOriginUrl(_shortUrl) {
    try {
      let dataBase = await this.readDataBase();
      dataBase = JSON.parse(dataBase);
      for (let i = 0; i < dataBase.objects.length; i += 1) {
        if (dataBase.objects[i].shortUrl === _shortUrl) {
          dataBase.objects[i].views += 1;
          await fsAsync.writeFile("./server/db.json", JSON.stringify(dataBase));
          return dataBase.objects[i].originUrl;
        }
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  static async getObjectByShortUrl(_shortUrl) {
    let dataBase = await this.readDataBase();
    dataBase = JSON.parse(dataBase);
    for (let i = 0; i < dataBase.objects.length; i += 1) {
      if (dataBase.objects[i].shortUrl === _shortUrl) {
        return dataBase.objects[i];
      }
    }
  }
}
module.exports = DataBase;
