"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudwatch = require("@aws-cdk/aws-cloudwatch");
const sqs = require("@aws-cdk/aws-sqs");
class DeadLetterQueue extends sqs.Queue {
    constructor(scope, id) {
        super(scope, id);
        // Add the alarm
        this.messagesInQueueAlarm = new cloudwatch.Alarm(this, 'Alarm', {
            alarmDescription: 'There are messages in the Dead Letter Queue',
            evaluationPeriods: 1,
            threshold: 1,
            metric: this.metricApproximateNumberOfMessagesVisible(),
        });
    }
}
exports.DeadLetterQueue = DeadLetterQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGxxLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGxxLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0RBQXNEO0FBQ3RELHdDQUF3QztBQUd4QyxNQUFhLGVBQWdCLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFHNUMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQzlELGdCQUFnQixFQUFFLDZDQUE2QztZQUMvRCxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyx3Q0FBd0MsRUFBRTtTQUN4RCxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFkRCwwQ0FjQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNsb3Vkd2F0Y2ggZnJvbSAnQGF3cy1jZGsvYXdzLWNsb3Vkd2F0Y2gnO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gJ0Bhd3MtY2RrL2F3cy1zcXMnO1xuaW1wb3J0IHsgQ29uc3RydWN0LCBEdXJhdGlvbiB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG5leHBvcnQgY2xhc3MgRGVhZExldHRlclF1ZXVlIGV4dGVuZHMgc3FzLlF1ZXVlIHtcbiAgcHVibGljIHJlYWRvbmx5IG1lc3NhZ2VzSW5RdWV1ZUFsYXJtOiBjbG91ZHdhdGNoLklBbGFybTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIC8vIEFkZCB0aGUgYWxhcm1cbiAgICB0aGlzLm1lc3NhZ2VzSW5RdWV1ZUFsYXJtID0gbmV3IGNsb3Vkd2F0Y2guQWxhcm0odGhpcywgJ0FsYXJtJywge1xuICAgICAgYWxhcm1EZXNjcmlwdGlvbjogJ1RoZXJlIGFyZSBtZXNzYWdlcyBpbiB0aGUgRGVhZCBMZXR0ZXIgUXVldWUnLFxuICAgICAgZXZhbHVhdGlvblBlcmlvZHM6IDEsXG4gICAgICB0aHJlc2hvbGQ6IDEsXG4gICAgICBtZXRyaWM6IHRoaXMubWV0cmljQXBwcm94aW1hdGVOdW1iZXJPZk1lc3NhZ2VzVmlzaWJsZSgpLFxuICAgIH0pO1xuICB9XG59Il19