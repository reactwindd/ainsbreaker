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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBook = exports.getID = void 0;
function getID() {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch("https://jombaca-api.jazro.com.my/api/users/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.TOKEN}`,
                Origin: "https://ains.moe.gov.my",
            },
        });
        return (yield data.json()).id;
    });
}
exports.getID = getID;
function getBook() {
    return __awaiter(this, void 0, void 0, function* () {
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
        return {
            data: {
                user: userData.id,
                type: "book",
                date: formatDate(Date.now()),
                title: book.items[0].volumeInfo.title,
                bookType: "physical",
                category: "fiction",
                noOfPage: book.items[0].volumeInfo.pageCount,
                isbn: book.items[0].volumeInfo.industryIdentifiers
                    ? book.items[0].volumeInfo.industryIdentifiers[0].identifier
                    : "-",
                author: book.items[0].volumeInfo.authors
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
        };
    });
}
exports.getBook = getBook;
//# sourceMappingURL=util.js.map