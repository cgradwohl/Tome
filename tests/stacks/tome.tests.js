"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/core");
const tome_stack_1 = require("../../lib/tome-stack");
const utils_1 = require("../utils");
// console.log = jest.fn()
describe('Cognito User Pool', () => {
    let user;
    beforeAll(async () => {
        await utils_1.init();
    });
    it('should return a new authed user', async () => {
        // TODO: pull in these values dynamically
        // I like this generate config idea :) ... see below:
        // THIS APPROACH should replace the need to have aws-cred
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/cdk.ts#L384
        // https://github.com/aws-samples/amazon-cognito-example-for-external-idp/blob/master/cdk/src/generateConfig.ts#L17
        const app = new cdk.App();
        const tome = new tome_stack_1.default(app, 'TomeStack');
        const { userPoolId } = tome.userPool;
        const { userPoolClientId } = tome.userPoolClient;
        console.log('POOL', tome.userPool.userPoolId);
        user = await utils_1.given.anAuthenticatedUser();
        expect(user.username).toBeDefined();
        expect(user.firstName).toBeDefined();
        expect(user.lastName).toBeDefined();
    });
    afterAll(async () => {
        await utils_1.tearDown.an_authenticated_user(user);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9tZS50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvbWUudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLHFEQUE2QztBQUU3QyxvQ0FBaUQ7QUFFakQsMEJBQTBCO0FBRTFCLFFBQVEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7SUFDakMsSUFBSSxJQUF1RCxDQUFDO0lBRTVELFNBQVMsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNuQixNQUFNLFlBQUksRUFBRSxDQUFDO0lBQ2YsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDL0MseUNBQXlDO1FBQ3pDLHFEQUFxRDtRQUNyRCx5REFBeUQ7UUFDekQseUdBQXlHO1FBQ3pHLG1IQUFtSDtRQUNuSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksR0FBRyxJQUFJLG9CQUFTLENBQUMsR0FBRyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTdDLE1BQU0sRUFBRSxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3JDLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7UUFFakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUU5QyxJQUFJLEdBQUcsTUFBTSxhQUFLLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0QyxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNsQixNQUFNLGdCQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCBUb21lU3RhY2sgZnJvbSAnLi4vLi4vbGliL3RvbWUtc3RhY2snO1xuXG5pbXBvcnQgeyBpbml0LCBnaXZlbiwgdGVhckRvd24gfSBmcm9tICcuLi91dGlscyc7XG5cbi8vIGNvbnNvbGUubG9nID0gamVzdC5mbigpXG5cbmRlc2NyaWJlKCdDb2duaXRvIFVzZXIgUG9vbCcsICgpID0+IHtcbiAgbGV0IHVzZXI6IHsgdXNlcm5hbWU6IGFueTsgZmlyc3ROYW1lOiBhbnk7IGxhc3ROYW1lOiBhbnk7IH07XG5cbiAgYmVmb3JlQWxsKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBpbml0KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGEgbmV3IGF1dGhlZCB1c2VyJywgYXN5bmMgKCkgPT4ge1xuICAgIC8vIFRPRE86IHB1bGwgaW4gdGhlc2UgdmFsdWVzIGR5bmFtaWNhbGx5XG4gICAgLy8gSSBsaWtlIHRoaXMgZ2VuZXJhdGUgY29uZmlnIGlkZWEgOikgLi4uIHNlZSBiZWxvdzpcbiAgICAvLyBUSElTIEFQUFJPQUNIIHNob3VsZCByZXBsYWNlIHRoZSBuZWVkIHRvIGhhdmUgYXdzLWNyZWRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXdzLXNhbXBsZXMvYW1hem9uLWNvZ25pdG8tZXhhbXBsZS1mb3ItZXh0ZXJuYWwtaWRwL2Jsb2IvbWFzdGVyL2Nkay9zcmMvY2RrLnRzI0wzODRcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYXdzLXNhbXBsZXMvYW1hem9uLWNvZ25pdG8tZXhhbXBsZS1mb3ItZXh0ZXJuYWwtaWRwL2Jsb2IvbWFzdGVyL2Nkay9zcmMvZ2VuZXJhdGVDb25maWcudHMjTDE3XG4gICAgY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbiAgICBjb25zdCB0b21lID0gbmV3IFRvbWVTdGFjayhhcHAsICdUb21lU3RhY2snKTtcblxuICAgIGNvbnN0IHsgdXNlclBvb2xJZCB9ID0gdG9tZS51c2VyUG9vbDtcbiAgICBjb25zdCB7IHVzZXJQb29sQ2xpZW50SWQgfSA9IHRvbWUudXNlclBvb2xDbGllbnQ7XG5cbiAgICBjb25zb2xlLmxvZygnUE9PTCcsIHRvbWUudXNlclBvb2wudXNlclBvb2xJZCk7XG5cbiAgICB1c2VyID0gYXdhaXQgZ2l2ZW4uYW5BdXRoZW50aWNhdGVkVXNlcigpO1xuXG4gICAgZXhwZWN0KHVzZXIudXNlcm5hbWUpLnRvQmVEZWZpbmVkKCk7XG4gICAgZXhwZWN0KHVzZXIuZmlyc3ROYW1lKS50b0JlRGVmaW5lZCgpO1xuICAgIGV4cGVjdCh1c2VyLmxhc3ROYW1lKS50b0JlRGVmaW5lZCgpO1xuICB9KTtcblxuICBhZnRlckFsbChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgdGVhckRvd24uYW5fYXV0aGVudGljYXRlZF91c2VyKHVzZXIpO1xuICB9KTtcbn0pO1xuIl19