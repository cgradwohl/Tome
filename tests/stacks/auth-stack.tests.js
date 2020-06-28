"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = require("@aws-cdk/assert");
require("@aws-cdk/assert/jest");
const core_1 = require("@aws-cdk/core");
const auth_stack_1 = require("../../lib/auth-stack");
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
    it('it should deploy a user pool client', () => { expect('todo').toEqual('todo'); });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1zdGFjay50ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF1dGgtc3RhY2sudGVzdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNkM7QUFDN0MsZ0NBQThCO0FBQzlCLHdDQUF3QztBQUV4QyxxREFBaUQ7QUFFakQsTUFBTSxHQUFHLEdBQUcsSUFBSSxVQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFNBQVMsR0FBRyxJQUFJLHNCQUFTLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBRXRELFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzFCLEVBQUUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQ3JCLE1BQU0sQ0FBQyxtQkFBVSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO1FBQ2pDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxjQUFjLENBQUMsd0JBQXdCLEVBQUU7WUFDekQsc0JBQXNCLEVBQUU7Z0JBQ3RCLE9BQU87YUFDUjtZQUNELHFCQUFxQixFQUFFO2dCQUNyQix3QkFBd0IsRUFBRSxJQUFJO2FBQy9CO1lBQ0Qsc0JBQXNCLEVBQUU7Z0JBQ3RCLGtCQUFrQixFQUFFO29CQUNsQjt3QkFDRSxJQUFJLEVBQUUsdUJBQXVCO3dCQUM3QixRQUFRLEVBQUUsQ0FBQztxQkFDWjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsZ0JBQWdCO3dCQUN0QixRQUFRLEVBQUUsQ0FBQztxQkFDWjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMscUNBQXFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JGLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3ludGhVdGlscyB9IGZyb20gJ0Bhd3MtY2RrL2Fzc2VydCc7XG5pbXBvcnQgJ0Bhd3MtY2RrL2Fzc2VydC9qZXN0JztcbmltcG9ydCB7IEFwcCwgRm4gfSBmcm9tICdAYXdzLWNkay9jb3JlJztcblxuaW1wb3J0IHsgQXV0aFN0YWNrIH0gZnJvbSAnLi4vLi4vbGliL2F1dGgtc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5jb25zdCBhdXRoU3RhY2sgPSBuZXcgQXV0aFN0YWNrKGFwcCwgJ1Rlc3RBdXRoU3RhY2snKTtcblxuZGVzY3JpYmUoJ2F1dGgtc3RhY2snLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgd29yaycsICgpID0+IHtcbiAgICBleHBlY3QoU3ludGhVdGlscy50b0Nsb3VkRm9ybWF0aW9uKGF1dGhTdGFjaykpLnRvTWF0Y2hTbmFwc2hvdCgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIGRlcGxveSB1c2VyIHBvb2wnLCAoKSA9PiB7IFxuICAgIGV4cGVjdChhdXRoU3RhY2spLnRvSGF2ZVJlc291cmNlKCdBV1M6OkNvZ25pdG86OlVzZXJQb29sJywge1xuICAgICAgQXV0b1ZlcmlmaWVkQXR0cmlidXRlczogW1xuICAgICAgICBcImVtYWlsXCJcbiAgICAgIF0sXG4gICAgICBBZG1pbkNyZWF0ZVVzZXJDb25maWc6IHtcbiAgICAgICAgQWxsb3dBZG1pbkNyZWF0ZVVzZXJPbmx5OiB0cnVlLFxuICAgICAgfSxcbiAgICAgIEFjY291bnRSZWNvdmVyeVNldHRpbmc6IHtcbiAgICAgICAgUmVjb3ZlcnlNZWNoYW5pc21zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgTmFtZTogXCJ2ZXJpZmllZF9waG9uZV9udW1iZXJcIixcbiAgICAgICAgICAgIFByaW9yaXR5OiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgTmFtZTogXCJ2ZXJpZmllZF9lbWFpbFwiLFxuICAgICAgICAgICAgUHJpb3JpdHk6IDIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pXG5cbiAgaXQoJ2l0IHNob3VsZCBkZXBsb3kgYSB1c2VyIHBvb2wgY2xpZW50JywgKCkgPT4geyBleHBlY3QoJ3RvZG8nKS50b0VxdWFsKCd0b2RvJykgfSlcbn0pOyJdfQ==