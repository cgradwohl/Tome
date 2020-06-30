export const handler = async (event: any = {}): Promise<any> => {
  console.log ("Authentication successful");
  console.log ("Trigger function =", event.triggerSource);
  console.log ("User pool = ", event.userPoolId);
  console.log ("App client ID = ", event.callerContext.clientId);
  console.log ("User ID = ", event.userName);
  return { statusCode: 201, body: ' [ POST AUTH TRIGGER ] ' + event };
};