////////////////////////
// Modules Definition //
////////////////////////

// ASK SDK
const Alexa = require('ask-sdk-core');
const languageStrings = require('./languageStrings');


/////////////////////////
// Handlers Definition //
/////////////////////////

/**
 * Handles LaunchRequest requests sent by Alexa when a birthdate has been registered
 * Note : this type of request is send when the user invokes your skill without providing a specific intent.
 */
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = "Welcome Message!";
        const repromptOutput = 'WELCOME REPROMPT MSG';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(repromptOutput)
            .getResponse();
    }
};

/**
 * Handles CaptureSumOperationIntent requests sent by Alexa when a sum operation is requested by user.
 */
const CaptureSumOperationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureSumOperationIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;

        const x = Alexa.getSlotValue(requestEnvelope, 'x');
        const y = Alexa.getSlotValue(requestEnvelope, 'y');

        const result = parseFloat(x) + parseFloat(y)

        const speechText = `The sum of ${x} and ${y} is ${result}.` ;

        return handlerInput.responseBuilder
            .speak(speechText)      
            .withShouldEndSession(true)
            .getResponse();
    }
};

/**
 * Handles CaptureDifferenceOperationIntent requests sent by Alexa when a difference operation is requested by user.
 */
const CaptureDifferenceOperationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureDifferenceOperationIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;

        const x = Alexa.getSlotValue(requestEnvelope, 'x');
        const y = Alexa.getSlotValue(requestEnvelope, 'y');

        const result = parseFloat(x) - parseFloat(y)

        const speechText = `The difference of ${y} from ${x} is ${result}.` ;

        return handlerInput.responseBuilder
            .speak(speechText)      
            .withShouldEndSession(true) 
            .getResponse();
    }
};

/**
 * Handles CaptureProductOperationIntentHandler requests sent by Alexa when a multiplication operation is requested by user.
 */
const CaptureProductOperationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureProductOperationIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;

        const x = Alexa.getSlotValue(requestEnvelope, 'x');
        const y = Alexa.getSlotValue(requestEnvelope, 'y');

        const result = parseFloat(x) * parseFloat(y)

        const speechText = `The product of ${x} and ${y} is ${result}.` ;

        return handlerInput.responseBuilder
            .speak(speechText)      
            .withShouldEndSession(true) 
            .getResponse();
    }
};

/**
 * Handles CaptureDivisionOperationIntentHandler requests sent by Alexa when a division operation is requested by user.
 */
const CaptureDivisionOperationIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaptureDivisionOperationIntent';
    },
    handle(handlerInput) {
        const { attributesManager, requestEnvelope } = handlerInput;

        const x = Alexa.getSlotValue(requestEnvelope, 'x');
        const y = Alexa.getSlotValue(requestEnvelope, 'y');

        const speechText = null

        if(y != 0) {
            const result = x / y;
            const speechText = `The division of ${x} by ${y} is ${result}.` ;
        }
        else
            speechText = 'Dividing by zero not allowed.'

        return handlerInput.responseBuilder
            .speak(speechText)      
            .withShouldEndSession(true) 
            .getResponse();
    }
};

/**
 * Handles AMAZON.HelpIntent requests sent by Alexa 
 */
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Help Message.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * Handles AMAZON.CancelIntent & AMAZON.StopIntent requests sent by Alexa 
 * Note : this request is sent when the user makes a request that corresponds to AMAZON.CancelIntent & AMAZON.StopIntent intents defined in your intent schema.
 */
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = `Okay. Bye.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speakOutput = `Sorry, I couldn't understand what you said. Can you reformulate?`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/////////////////////////////
// Interceptors Definition //
/////////////////////////////

/**
 * This request interceptor will log all incoming requests in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log("\n" + "********** REQUEST *********\n" +
            JSON.stringify(handlerInput, null, 4));
    }
};

/**
 * This response interceptor will log outgoing responses if any in the associated Logs (CloudWatch) of the AWS Lambda functions
 */
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
        if (response) console.log("\n" + "************* RESPONSE **************\n"
            + JSON.stringify(response, null, 4));
    }
};

/////////////////////////////
// SkillBuilder Definition //
/////////////////////////////

/**
 * The SkillBuilder acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom.
 */
exports.handler = Alexa.SkillBuilders.custom()    
    .addRequestHandlers(        
        LaunchRequestHandler,
        CaptureSumOperationIntentHandler,
        CaptureDifferenceOperationIntentHandler,
        CaptureProductOperationIntentHandler,
        CaptureDivisionOperationIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor)    
    .addResponseInterceptors(LoggingResponseInterceptor)    
    .lambda();
