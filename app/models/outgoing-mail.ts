export class OutgoingMail {
    to: string;
    cc: string;
    bcc: string;
    subject: string;
    body: string;

    constructor(to: string, cc: string, bcc: string, subject: string, body: string) {
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.body = body;
    }
}