export const handler = async (event: any = {}): Promise<any> => {
  // Return to Amazon Cognito
  return { statusCode: 201, body: ' [ PRE AUTH TRIGGER ] ' + event};
};
