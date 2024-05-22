"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.use(express_1.default.json());
router.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});
router.get("/getid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch("https://jombaca-api.jazro.com.my/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
    });
    res.json((yield data.json()).id);
}));
router.get("/getBook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const word = yield fetch("https://random-word-api.herokuapp.com/word?length=6");
    const data = yield fetch(`https://www.googleapis.com/books/v1/volumes/?q=${yield word.text()}`);
    const user = yield fetch("https://jombaca-api.jazro.com.my/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
    });
    let book = yield data.json();
    let userData = yield user.json();
    function formatDate(date) {
        var d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();
        if (month.length < 2)
            month = "0" + month;
        if (day.length < 2)
            day = "0" + day;
        return [year, month, day].join("-");
    }
    function formatPublishedDate(date) {
        return date.slice(0, 4);
    }
    res.json({
        data: {
            user: userData.id,
            type: "book",
            date: formatDate(Date.now()),
            title: book.items[0].volumeInfo.title,
            bookType: "physical",
            category: "fiction",
            noOfPage: book.items[0].volumeInfo.pageCount,
            isbn: book.items[0].volumeInfo.industryIdentifiers[0].identifier
                ? book.items[0].volumeInfo.industryIdentifiers[0].identifier
                : "-",
            author: book.items[0].volumeInfo.authors[0]
                ? book.items[0].volumeInfo.authors[0]
                : "-",
            publisher: book.items[0].volumeInfo.publisher,
            publishedYear: formatPublishedDate(book.items[0].volumeInfo.publishedDate),
            language: "en",
            summary: book.items[0].volumeInfo.description,
            review: "It's Really Good",
            rating: 5,
            reviewIsVideo: false,
        },
    });
}));
router.get("/createBook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield fetch("http://localhost:3000/api/getBook");
    const data = yield book.json();
    console.log(data.data);
    const result = yield fetch("https://jombaca-api.jazro.com.my/api/nilam-records", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
        body: JSON.stringify({
            data: Object.assign({}, data.data),
        }),
    });
    res.json(result.json);
}));
exports.default = router;
