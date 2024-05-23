export async function getID() {
    const data = await fetch("https://jombaca-api.jazro.com.my/api/users/me", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.TOKEN}`,
            Origin: "https://ains.moe.gov.my",
        },
    });

    return (await data.json()).id;
}

export async function getBook() {
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

    function formatDate(date: number) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    function formatPublishedDate(date: string) {
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
            publishedYear: formatPublishedDate(
                book.items[0].volumeInfo.publishedDate
            ),
            language: "en",
            summary: book.items[0].volumeInfo.description,
            review: "It's Really Good",
            rating: 5,
            reviewIsVideo: false,
        },
    };
}
