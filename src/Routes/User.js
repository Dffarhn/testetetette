const { Router } = require("express");

const {body,validationResult,checkSchema} = require("express-validator");


const {validationAddUserResult} = require("../utils/ValidationUser.js")

const router = Router();


const Userdata = require("../Data/UserData.js");
// console.log(Userdata);



const mockUsers = Userdata

router.get('/list',(req,res) =>{

    

    console.log("masuk user list");
    res.send(mockUsers)


})

//pencarian filter (query params)
router.get(
    '/',
    
    (req,res)=>{
    const {filter , username} = req.query;
    console.log(filter);
    const filtername = (mockUsers.filter(user => user.username.includes(username)));
    if (filter === 'asc') {
        filtername.sort((a, b) => a.id - b.id); // Urutkan secara ascending berdasarkan id
    } else if (filter === 'desc') {
        filtername.sort((a, b) => b.id - a.id); // Urutkan secara descending berdasarkan id
    }

    res.send(filtername);
})


//Routes params
router.get(
  "/:id",
  (req,res,next)=>{
      const id = req.params.id;
      console.log("masuk pencarian user")

      req.user = mockUsers.find((user) => user.id === parseInt(id))
      next();

  },
  (req, res) => {
    const user = req.user;


    if (user) {
        res.send(user);

    }else{
        res.status(400).send("User not found");
    }
  }
);

const fs = require('fs');
const path = require('path');

router.post(
    "/",
    checkSchema(validationAddUserResult),
    (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        const { username } = req.body;
        const newUserId = mockUsers.length > 0 ? mockUsers[mockUsers.length - 1].id + 1 : 1;
        const newUser = { id: newUserId, username: username };

        // Tambahkan pengguna baru ke dalam mockUsers
        mockUsers.push(newUser);

        // Tulis kembali data pengguna yang telah diperbarui ke dalam file Userdata.js
        const userDataPath = path.join(__dirname, '..', 'Data', 'Userdata.js');
        const userDataString = `module.exports = ${JSON.stringify(mockUsers, null, 2)};\n`;

        fs.writeFile(userDataPath, userDataString, (err) => {
            if (err) {
                console.error('Error writing userdata file:', err);
                return res.status(500).send('Internal server error');
            }
            res.status(201).json(newUser);
        });
});



router.patch('/',(req,res)=>{
    const {id, username} = req.body
    const ubahname = mockUsers.find((user)=> user.id === parseInt(id))

    if (!ubahname) {
        res.status(404).send("user not found")
        
    }

    ubahname.username = username

    res.status(200).send("User updated successfully");

})


router.delete('/',(req,res)=>{
    const {id} = req.body;
    mockUsers.pop(parseInt(id));
    res.status(200).send("data deleted")
})  

module.exports = router;
