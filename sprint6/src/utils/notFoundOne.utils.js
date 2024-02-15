const notFoundOne = (data) => {
    if (data.length === 0) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;
        throw error;
    }

    if (!data) {
        const error = new Error("Document not found");
        error.statusCode = 404;
        throw error;
    }
    //return data;
};

export default notFoundOne;
