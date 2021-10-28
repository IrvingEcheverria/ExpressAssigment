const { body, validationResult } = require('express-validator');
const { Book } = require('../models');

const checkInputs = async (req, res, next) => {
    

    // Check TITLE
    await body("title").customSanitizer(custom)
    .notEmpty().withMessage("Title field is empty").bail()
    .isAlphanumeric("en-US", { ignore: /[:,.&'-\s]/g })
    .run(req);


    // Check AUTHOR
    await body("author").customSanitizer(custom)
    .notEmpty().withMessage("Author field is empty").bail()
    .isAlpha("en-US", { ignore: /[:,.&'-\s]/g })
    .withMessage("Author field should be letters").run(req);


    // Check YEAR
    await body("year").customSanitizer(custom)
    .notEmpty().withMessage("Year field is empty").bail()
    .isNumeric().isInt({ min: 1455, max: new Date().getFullYear() })
    .withMessage("Year must be a number larger than 1454, and less or equal than the current year")
    .run(req);
    

    const Results = validationResult(req);
    if (!Results.isEmpty()){
        return res.status(400).send(Results)
        } else {
            next()
        };
};


const checkDB = (req, res, next) =>{
    const { guid } = req.params;
    const { title, author, year } = req.body;

    Book.getAll((books) => {
        const inDB = books.find((ent) => ent.title === title && ent.author === author && ent.year === year);
        
        if(inDB){
        return res.status(409).send({message: "This book already exist in DB!!!"});
        }else{
        next()
        };        
    }); 

};

function custom (inputValue) {
    let test = inputValue.toString().trim().replace(/\s+/g, " ")
    if (test === " "){
        return ""
    } else {
        return test
    }
    };

module.exports = {checkInputs, checkDB};