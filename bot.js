/** This is a sample code for your bot**/
var contextobj = "";
var dobPoll = {
        "type": "survey",
        "question": "Do you know the date of birth of the user associated with your account?",
        "msgid": "dobq",
        "options": [
            "Yes",
            "No"
        ]
    };
    
function MessageHandler(context, event) {
    
    contextobj = event.contextobj;
    
    var emailPoll = {
        "type": "survey",
        "question": "Do you know the email address associated with your account?",
        "msgid": "emailq",
        "options": [
            "Yes",
            "No"
        ]
    };
    
    var positiveLink = {
        "type": "survey",
        "question": "Great, click following link to re-activate your account.",
        "options": [
        {
          "type": "url",
          "title": "Link",
          "url": "https://account.sonyentertainmentnetwork.com/external/forgot-password!input.action?request_locale=en_US"
        }
        ]
    };
    
    var negativeLink = {
        "type": "survey",
        "question": "Ok, click following link to chat with an agent who can help you.",
        "options": [
        {
          "type": "url",
          "title": "Link",
          "url": "https://scea.secure.force.com/LiveChatRequest"
        }
        ]
    };
    
    var refmsgid = event.messageobj.refmsgid;
    
    if(event.message.toLowerCase() == "yes"){
        if(refmsgid =="dobq"){
            context.sendResponse(JSON.stringify(emailPoll));
            //postMessage(context, event.contextobj,JSON.stringify(emailPoll));
        }else if(refmsgid =="emailq"){
            context.sendResponse(JSON.stringify(positiveLink));
            //postMessage(context, event.contextobj,JSON.stringify(positiveLink));
        }else{
            postStartMessage(context,event);
        }
    }else if(event.message.toLowerCase() == "no"){
        if(refmsgid == "dobq" || refmsgid == "emailq"){
            context.sendResponse(JSON.stringify(negativeLink));
        }else{
            postStartMessage(context,event);
        }
    }else{
        postStartMessage(context,event);
    }
}

function postStartMessage(context, event){
    var intro = "Hi, this is Fred. I can help you recover your Playstation account.";
    
    var url = "https://api.gupshup.io/sm/api/bot/playrec/msg";
    var header = {"apikey":"45559405050540c5c03b978227cd144b","Content-Type": "application/x-www-form-urlencoded"};
    var param = "context="+JSON.stringify(contextobj)+"&message="+intro;
    context.simplehttp.makePost(url,param,header,sendDOBPoll);
    
}

function sendDOBPoll(context,event){
    context.sendResponse(JSON.stringify(dobPoll));
}

function postMessage(context, contexobj, message){
    var url = "https://api.gupshup.io/sm/api/bot/playrec/msg";
    var header = {"apikey":"45559405050540c5c03b978227cd144b","Content-Type": "application/x-www-form-urlencoded"};
    var param = "context="+JSON.stringify(contextobj)+"&message="+message;
    context.simplehttp.makePost(url,param,header);
}

/** Functions declared below are required **/
function EventHandler(context, event) {
    context.sendResponse("Hi, my name is Fred and I see you need some help resetting the password for your PlayStation Network Account today. Before I can do that, we need to confirm some information from you.");
}

function HttpResponseHandler(context, event) {
    // if(event.geturl === "http://ip-api.com/json")
    context.sendResponse(event.getresp);
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}
