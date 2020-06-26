"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const auth_stack_1 = require("../lib/auth-stack");
const app = new core_1.App();
const authStack = new auth_stack_1.AuthStack(app, 'TestAuthStack');
describe('auth-stack', () => {
    it('should work', () => {
        expect(assert_1.SynthUtils.toCloudFormation(authStack)).toMatchSnapshot();
    });
    it('should deploy user pool', () => {
        expect(authStack).toHaveResource('AWS::Cognito::UserPool', {
            AutoVerifiedAttributes: [
                "email"
            ],
            AdminCreateUserConfig: {
                AllowAdminCreateUserOnly: true,
            },
            AccountRecoverySetting: {
                RecoveryMechanisms: [
                    {
                        Name: "verified_phone_number",
                        Priority: 1,
                    },
                    {
                        Name: "verified_email",
                        Priority: 2,
                    },
                ],
            },
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aC1zdGFjay50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQTZDO0FBQzdDLGdDQUE4QjtBQUM5Qix3Q0FBb0M7QUFFcEMsa0RBQThDO0FBRTlDLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxTQUFTLEdBQUcsSUFBSSxzQkFBUyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUV0RCxRQUFRLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUMxQixFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUNyQixNQUFNLENBQUMsbUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ25FLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRTtRQUNqQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxDQUFDLHdCQUF3QixFQUFFO1lBQ3pELHNCQUFzQixFQUFFO2dCQUN0QixPQUFPO2FBQ1I7WUFDRCxxQkFBcUIsRUFBRTtnQkFDckIsd0JBQXdCLEVBQUUsSUFBSTthQUMvQjtZQUNELHNCQUFzQixFQUFFO2dCQUN0QixrQkFBa0IsRUFBRTtvQkFDbEI7d0JBQ0UsSUFBSSxFQUFFLHVCQUF1Qjt3QkFDN0IsUUFBUSxFQUFFLENBQUM7cUJBQ1o7b0JBQ0Q7d0JBQ0UsSUFBSSxFQUFFLGdCQUFnQjt3QkFDdEIsUUFBUSxFQUFFLENBQUM7cUJBQ1o7aUJBQ0Y7YUFDRjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTeW50aFV0aWxzIH0gZnJvbSAnQGF3cy1jZGsvYXNzZXJ0JztcbmltcG9ydCAnQGF3cy1jZGsvYXNzZXJ0L2plc3QnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5cbmltcG9ydCB7IEF1dGhTdGFjayB9IGZyb20gJy4uL2xpYi9hdXRoLXN0YWNrJztcblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xuY29uc3QgYXV0aFN0YWNrID0gbmV3IEF1dGhTdGFjayhhcHAsICdUZXN0QXV0aFN0YWNrJyk7XG5cbmRlc2NyaWJlKCdhdXRoLXN0YWNrJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHdvcmsnLCAoKSA9PiB7XG4gICAgZXhwZWN0KFN5bnRoVXRpbHMudG9DbG91ZEZvcm1hdGlvbihhdXRoU3RhY2spKS50b01hdGNoU25hcHNob3QoKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCBkZXBsb3kgdXNlciBwb29sJywgKCkgPT4geyBcbiAgICBleHBlY3QoYXV0aFN0YWNrKS50b0hhdmVSZXNvdXJjZSgnQVdTOjpDb2duaXRvOjpVc2VyUG9vbCcsIHtcbiAgICAgIEF1dG9WZXJpZmllZEF0dHJpYnV0ZXM6IFtcbiAgICAgICAgXCJlbWFpbFwiXG4gICAgICBdLFxuICAgICAgQWRtaW5DcmVhdGVVc2VyQ29uZmlnOiB7XG4gICAgICAgIEFsbG93QWRtaW5DcmVhdGVVc2VyT25seTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBBY2NvdW50UmVjb3ZlcnlTZXR0aW5nOiB7XG4gICAgICAgIFJlY292ZXJ5TWVjaGFuaXNtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIE5hbWU6IFwidmVyaWZpZWRfcGhvbmVfbnVtYmVyXCIsXG4gICAgICAgICAgICBQcmlvcml0eTogMSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIE5hbWU6IFwidmVyaWZpZWRfZW1haWxcIixcbiAgICAgICAgICAgIFByaW9yaXR5OiAyLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9KVxufSk7Il19