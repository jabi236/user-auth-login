const Conf = require('conf');
//const Conf2 = require('conf');
const { v4: uuidv4 } = require('uuid');
//uuidv4();
/*
const schema = {
    userID:{
        type: String,
        required:true
    },
    username: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    phone:{
        type: String,
        required:true
    }


}
const store = new Conf({schema});
*/
const store = new Conf();

//let userIDs = store.get('userIDs') || [];
//store.clear('userIDs')
let accounts = store.get('accounts') || [];
//store.clear('accounts')


function signInUser(string, body) {
    // grab the old value (with default)

    // option 2 (set)
    // update stuff
    console.log(accounts);
	for (let i in accounts) {
		const account = accounts[i];
		if (account.username === body.username && account.password === body.password) {
            //userid = userID[i];
            result = "found";
            console.log(result, ': user id:',account.userID)
            return(account.userID)
		}
	}
    result = "no";
    return(result)

}

function updateUser(string, body) {
	//if (isLoggedIn(userID) == "found") {
		// update user
        result = '';
        for (let i in accounts) {
            const account = accounts[i];
            if (account.username === body.username) {
		    account.username = body.username;
		    account.email = body.email;
		    account.phone = body.phone;
            result = "updated"
            console.log(result);
		    return result;
            }
	    }
        console.log(accounts);
    //}
    //write changes
    result = "not found";
	return result;
}

function signUpUser(string, body) {
    
    msg = '';
    if (body.password !== body.vPassword){
        msg = "error1";
        return msg;
    }
    
    for (let i in accounts) {
		const account = accounts[i];
        if(account.username == body.username){
            msg = "error2";
            return msg;
        }
        if(account.email == body.email){
            msg = "error3";
            return msg;
        }
	}
    
    
    // update stuff
    const user_idnum = uuidv4();
    const obj ={
        userID: user_idnum,
        username: body.username,
        email: body.email, 
        password: body.password, 
        phone: body.phone
    }
    accounts.push(obj);
    console.log(`you have ${accounts.length} users`);
    console.log(accounts);
    store.set('accounts', accounts)
 
    msg = "success";
    return msg;
    
}
function isLoggedIn(uid){
    //console.log(uid);
    for (let i in accounts) {
		const account = accounts[i];
		if (account.userID === uid) {
            result = "found";
            //console.log(result+" 1")
            return(result)
		}
	}
    //console.log(result+" 2")
    result = "not found";
    return(result)
}
function currUser(uid){
    //console.log(uid)
    for (let i in accounts) {
		const account = accounts[i];
		if (account.userID === uid) {
            return(account)
		}
	}
}


module.exports.signInUser = signInUser;
module.exports.signUpUser = signUpUser;
module.exports.updateUser = updateUser;
module.exports.isLoggedIn = isLoggedIn;
module.exports.currUser = currUser;