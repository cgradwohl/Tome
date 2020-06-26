"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const init = require('../test/utils/init.js');
const given = require('../test/utils/given.js');
const tearDown = require('../test/utils/tearDown.js');
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const tome_stack_1 = require("../lib/tome-stack");
// console.log = jest.fn()
describe('Cognito User Pool', () => {
    let user;
    beforeAll(async () => {
        await init();
    });
    it('should return a new authed user', async () => {
        // TODO: pull in these values dynamically
        // I like this generate config idea :) ... see below:
        // THIS APPROACH should replace the need to have aws-cred 
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts#L384
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/generateConfig.ts#L17
        const app = new cdk.App();
        const tome = new tome_stack_1.TomeStack(app, 'TomeStack');
        const userPoolId = tome.userPool.userPoolId;
        const userPoolClientId = tome.userPoolClient.userPoolClientId;
        console.log('POOL', tome.userPool.userPoolId);
        user = await given.an_authenticated_user(userPoolId, userPoolClientId);
        expect(user.username).toBeDefined();
        expect(user.firstName).toBeDefined();
        expect(user.lastName).toBeDefined();
    });
    afterAll(async () => {
        await tearDown.an_authenticated_user(user);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9tZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9tZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDOUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDaEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFFdEQsdUNBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxrREFBOEM7QUFFOUMsMEJBQTBCO0FBRTFCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxJQUF1RCxDQUFDO0lBRTVELFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDL0MseUNBQXlDO1FBQ3pDLHFEQUFxRDtRQUNyRCwwREFBMEQ7UUFDMUQseUdBQXlHO1FBQ3pHLG1IQUFtSDtRQUNuSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLHNCQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRzdDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQzVDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQztRQUU5RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTlDLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUV2RSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNsQixNQUFNLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUM1QyxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5pdCA9IHJlcXVpcmUoJy4uL3Rlc3QvdXRpbHMvaW5pdC5qcycpO1xuY29uc3QgZ2l2ZW4gPSByZXF1aXJlKCcuLi90ZXN0L3V0aWxzL2dpdmVuLmpzJyk7XG5jb25zdCB0ZWFyRG93biA9IHJlcXVpcmUoJy4uL3Rlc3QvdXRpbHMvdGVhckRvd24uanMnKTtcblxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuaW1wb3J0IHsgVG9tZVN0YWNrIH0gZnJvbSAnLi4vbGliL3RvbWUtc3RhY2snO1xuXG4vLyBjb25zb2xlLmxvZyA9IGplc3QuZm4oKVxuXG5kZXNjcmliZSgnQ29nbml0byBVc2VyIFBvb2wnLCAoKSA9PiB7XG4gIGxldCB1c2VyOiB7IHVzZXJuYW1lOiBhbnk7IGZpcnN0TmFtZTogYW55OyBsYXN0TmFtZTogYW55OyB9O1xuXG4gIGJlZm9yZUFsbChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgaW5pdCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBhIG5ldyBhdXRoZWQgdXNlcicsIGFzeW5jICgpID0+IHtcbiAgICAvLyBUT0RPOiBwdWxsIGluIHRoZXNlIHZhbHVlcyBkeW5hbWljYWxseVxuICAgIC8vIEkgbGlrZSB0aGlzIGdlbmVyYXRlIGNvbmZpZyBpZGVhIDopIC4uLiBzZWUgYmVsb3c6XG4gICAgLy8gVEhJUyBBUFBST0FDSCBzaG91bGQgcmVwbGFjZSB0aGUgbmVlZCB0byBoYXZlIGF3cy1jcmVkIFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hd3Mtc2FtcGxlcy9hbWF6b24tY29nbml0by1leGFtcGxlLWZvci1leHRlcm5hbC1pZHAvYmxvYi9tYXN0ZXIvY2RrL3NyYy9jZGsudHMjTDM4NFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hd3Mtc2FtcGxlcy9hbWF6b24tY29nbml0by1leGFtcGxlLWZvci1leHRlcm5hbC1pZHAvYmxvYi9tYXN0ZXIvY2RrL3NyYy9nZW5lcmF0ZUNvbmZpZy50cyNMMTdcbiAgICBjb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuICAgIGNvbnN0IHRvbWUgPSBuZXcgVG9tZVN0YWNrKGFwcCwgJ1RvbWVTdGFjaycpO1xuXG4gICAgXG4gICAgY29uc3QgdXNlclBvb2xJZCA9IHRvbWUudXNlclBvb2wudXNlclBvb2xJZDtcbiAgICBjb25zdCB1c2VyUG9vbENsaWVudElkID0gdG9tZS51c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkO1xuXG4gICAgY29uc29sZS5sb2coJ1BPT0wnLCB0b21lLnVzZXJQb29sLnVzZXJQb29sSWQpO1xuICAgICAgXG4gICAgdXNlciA9IGF3YWl0IGdpdmVuLmFuX2F1dGhlbnRpY2F0ZWRfdXNlcih1c2VyUG9vbElkLCB1c2VyUG9vbENsaWVudElkKTtcbiAgXG4gICAgZXhwZWN0KHVzZXIudXNlcm5hbWUpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHVzZXIuZmlyc3ROYW1lKS50b0JlRGVmaW5lZCgpO1xuICAgIGV4cGVjdCh1c2VyLmxhc3ROYW1lKS50b0JlRGVmaW5lZCgpO1xuICB9KVxuXG4gIGFmdGVyQWxsKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0ZWFyRG93bi5hbl9hdXRoZW50aWNhdGVkX3VzZXIodXNlcilcbiAgfSlcbn0pO1xuIl19