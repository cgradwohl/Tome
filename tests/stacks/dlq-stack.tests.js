"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@aws-cdk/core");
require("@aws-cdk/assert/jest");
const dlq = require("../../lib/dlq-stack");
test('dlq creates an alarm', () => {
    const stack = new core_1.Stack();
    new dlq.DeadLetterQueue(stack, 'DLQ');
    expect(stack).toHaveResource('AWS::CloudWatch::Alarm', {
        MetricName: "ApproximateNumberOfMessagesVisible",
        Namespace: "AWS/SQS",
        Dimensions: [
            {
                Name: "QueueName",
                Value: { "Fn::GetAtt": ["DLQ581697C4", "QueueName"] }
            }
        ],
    });
});
test('dlq has maximum retention period', () => {
    const stack = new core_1.Stack();
    new dlq.DeadLetterQueue(stack, 'DLQ');
    expect(stack).toHaveResource('AWS::SQS::Queue', {
        MessageRetentionPeriod: 1209600
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxxLXN0YWNrLnRlc3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGxxLXN0YWNrLnRlc3RzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXNDO0FBQ3RDLGdDQUE4QjtBQUU5QiwyQ0FBMkM7QUFFM0MsSUFBSSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLFlBQUssRUFBRSxDQUFDO0lBRTFCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyx3QkFBd0IsRUFBRTtRQUNyRCxVQUFVLEVBQUUsb0NBQW9DO1FBQ2hELFNBQVMsRUFBRSxTQUFTO1FBQ3BCLFVBQVUsRUFBRTtZQUNWO2dCQUNFLElBQUksRUFBRSxXQUFXO2dCQUNqQixLQUFLLEVBQUUsRUFBRSxZQUFZLEVBQUUsQ0FBRSxhQUFhLEVBQUUsV0FBVyxDQUFFLEVBQUU7YUFDeEQ7U0FDRjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLEdBQUcsRUFBRTtJQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLFlBQUssRUFBRSxDQUFDO0lBRTFCLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFFdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsRUFBRTtRQUM5QyxzQkFBc0IsRUFBRSxPQUFPO0tBQ2hDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2sgfSBmcm9tICdAYXdzLWNkay9jb3JlJztcbmltcG9ydCAnQGF3cy1jZGsvYXNzZXJ0L2plc3QnO1xuXG5pbXBvcnQgKiBhcyBkbHEgZnJvbSAnLi4vLi4vbGliL2RscS1zdGFjayc7XG5cbnRlc3QoJ2RscSBjcmVhdGVzIGFuIGFsYXJtJywgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBTdGFjaygpO1xuXG4gIG5ldyBkbHEuRGVhZExldHRlclF1ZXVlKHN0YWNrLCAnRExRJyk7XG5cbiAgZXhwZWN0KHN0YWNrKS50b0hhdmVSZXNvdXJjZSgnQVdTOjpDbG91ZFdhdGNoOjpBbGFybScsIHtcbiAgICBNZXRyaWNOYW1lOiBcIkFwcHJveGltYXRlTnVtYmVyT2ZNZXNzYWdlc1Zpc2libGVcIixcbiAgICBOYW1lc3BhY2U6IFwiQVdTL1NRU1wiLFxuICAgIERpbWVuc2lvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogXCJRdWV1ZU5hbWVcIixcbiAgICAgICAgVmFsdWU6IHsgXCJGbjo6R2V0QXR0XCI6IFsgXCJETFE1ODE2OTdDNFwiLCBcIlF1ZXVlTmFtZVwiIF0gfVxuICAgICAgfVxuICAgIF0sXG4gIH0pO1xufSk7XG5cbnRlc3QoJ2RscSBoYXMgbWF4aW11bSByZXRlbnRpb24gcGVyaW9kJywgKCkgPT4ge1xuICBjb25zdCBzdGFjayA9IG5ldyBTdGFjaygpO1xuXG4gIG5ldyBkbHEuRGVhZExldHRlclF1ZXVlKHN0YWNrLCAnRExRJyk7XG5cbiAgZXhwZWN0KHN0YWNrKS50b0hhdmVSZXNvdXJjZSgnQVdTOjpTUVM6OlF1ZXVlJywge1xuICAgIE1lc3NhZ2VSZXRlbnRpb25QZXJpb2Q6IDEyMDk2MDBcbiAgfSk7XG59KTsiXX0=