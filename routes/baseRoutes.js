const urlModel = require('../models/URL');
const config = require('../configs/constants');
const mongoose = require('mongoose');
const validUrl = require('valid-url');
const url = require('url');
//const shortCode = require('../middlewares/uniqueUrlCode');
// const nanoid = require('nanoid');
const {nanoid} = require('nanoid');
var Url = require('url-parse');
// const cache = require('./cache/redis');

module.exports = (router) =>{

    // router.get('/api/:code', async (req, res) => {
    //     const item = await urlModel.findOneAndUpdate({ urlCode: req.params.code },{$inc : {redirects : 1}},{returnOriginal: false});
    //     if (item) {
    //       return res.redirect(item.originalUrl);
    //     } else {
    //       return res.redirect(config.errorURL);
    //     }
    //   });

    // router.get('/visit', async (req, res) => {
    //     const shortURL = req.body.shortURL;
    //     return res.redirect(shortURL);
    // });

    router.post('/save', async (req, res) => {   
        console.log( req.body.originalUrl);
        let  originalUrl = req.body.originalUrl;
        const urlObject =  new Url(originalUrl);
        console.log( urlObject);
        
        if( urlObject.protocol != '' && !["https:","http:"].includes(urlObject.protocol.toLocaleLowerCase())){
            res.json({ success: false, message: "Invalid Protocol in URL", data: {} });
        }else{
            if(!urlObject.href.includes(".")){
                res.json({ success: false, message: "Invalid TLD", data: {} });
            }
            else{
                if (!urlObject.href.includes("://")){
                    res.json({ success: false, message: "Invalid URL", data: {} });
                }
                else{
                    if(urlObject.protocol == ''){
                        originalUrl = "https://" + originalUrl;
                    }
                    console.log(originalUrl);
                    if (validUrl.isUri(originalUrl)) {
                        const urlCode = nanoid(5);
                        const shortUrl = "https://ub.ga" + '/' + urlCode;
                        let url = new urlModel({
                            _id: new mongoose.Types.ObjectId(),
                            originalUrl:originalUrl, 
                            shortUrl:shortUrl, 
                            urlCode:urlCode,
                            redirects:0,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        });
                        url.save((err) => {
                            if(err){
                                res.json({ success: false, message: "Something went wrong!", data: {} });
                            }else{
                                res.json({ success: true, message: "Saved Successfully", data: url });
                            }
                        });
                    } 
                    else {
                        res.json({ success: false, message: "Invalid URL", data: {} });
                    }
                }
            }
        }
    });

    return router;
}