import express from "express";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
    res.json({
        message: "Hello World!",
    });
});

router.get("/getid", async (req, res) => {
    const data = await fetch("https://jombaca-api.jazro.com.my/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
    });

    res.json((await data.json()).id);
});

router.get("/getBook", async (req, res) => {
    const word = await fetch(
        "https://random-word-api.herokuapp.com/word?length=6"
    );
    const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes/?q=${await word.text()}`
    );
    const user = await fetch("https://jombaca-api.jazro.com.my/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
    });

    let book = await data.json();
    let userData = await user.json();

    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

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
            publishedYear: formatPublishedDate(
                book.items[0].volumeInfo.publishedDate
            ),
            language: "en",
            summary: book.items[0].volumeInfo.description,
            review: "It's Really Good",
            rating: 5,
            reviewIsVideo: false,
        },
    });
});

// router.get("/createBook", async (req: Request, res: Response) => {
//     const book = await fetch("http://localhost:3000/api/getBook");
//     const data = await book.json();
//     console.log(data.data);

//     const result = await fetch(
//         "https://jombaca-api.jazro.com.my/api/nilam-records",
//         {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${process.env.TOKEN}`,
//                 Origin: "https://ains.moe.gov.my",
//             },
//             body: JSON.stringify({
//                 data: {
//                     ...data.data,
//                 },
//             }),
//         }
//     );

//     res.json(result.json);
// });

export default router;
