export class OutgoingMail {
    to: Array<string>;
    cc: Array<string>;
    bcc: Array<string>;
    subject: string;
    body: string;

    constructor(to: Array<string>, cc: Array<string>, bcc: Array<string>, subject: string, body: string) {
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.subject = subject;
        this.body = body;
    }
}