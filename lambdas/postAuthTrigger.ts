export const handler = async (event: any = {}) : Promise <any> => {
  return { statusCode: 201, body: ' [ POST AUTH TRIGGER ] ' + event };
};