const mypromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        //resolve(1);
        reject(new Error('message'));
    }, 2000);
});

//consume promise 
mypromise
    .then(result => console.log('successfull promise'))
    .catch(err => console.log('error ', err.message));
