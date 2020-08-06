const {Device} = require('twilio-client')
const AccessToken = require('twilio').jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

// Used when generating any kind of tokens
const twilioAccountSid = 'ACxxxxxxxxxx';
const twilioApiKey = 'SKxxxxxxxxxx';
const twilioApiSecret = 'xxxxxxxxxxxx';

// Used specifically for creating Voice tokens
const outgoingApplicationSid = 'APxxxxxxxxxxxxx';
const identity = 'user';

// Create a "grant" which enables a client to use Voice as a given user
const voiceGrant = new VoiceGrant({
  outgoingApplicationSid: outgoingApplicationSid,
  incomingAllow: true, // Optional: add to allow incoming calls
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);
token.addGrant(voiceGrant);

// Serialize the token to a JWT string
console.log(token.toJwt());


const device = new Twilio.Device();
device.setup(token, options);

// or (deprecated singleton behavior)...

Twilio.Device.setup(token, options);